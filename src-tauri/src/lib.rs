// Folivm — Tauri backend commands for project, file, and export operations

use serde::{Deserialize, Serialize};
use std::fs;
use std::io::Write;
use std::path::{Path, PathBuf};
use std::process::Command;

const FOLDER_SCHEMA: [&str; 4] = ["inputs", "working", "context", "deliverables"];
const PROJECT_CONFIG_FILE: &str = "Folivm.yaml";

#[derive(Debug, Serialize, Deserialize, Default)]
pub struct LlmConfig {
    pub provider: String,
    pub api_key: String,
    #[serde(default = "default_model")]
    pub model: String,
}

fn default_model() -> String {
    "gpt-4o-mini".to_string()
}

#[derive(Debug, Serialize, Deserialize, Default)]
pub struct ProjectConfig {
    pub reference_docx: Option<String>,
    pub llm: Option<LlmConfig>,
}

/// Find pandoc executable. Tries PATH first, then common install locations.
fn find_pandoc() -> Result<PathBuf, String> {
    let candidates: [&str; 3] = [
        "pandoc",
        "/opt/homebrew/bin/pandoc",
        "/usr/local/bin/pandoc",
    ];
    for cmd in &candidates {
        match Command::new(cmd).arg("--version").output() {
            Ok(output) if output.status.success() => return Ok(PathBuf::from(*cmd)),
            Err(e) if e.raw_os_error() != Some(2) => {
                return Err(format!("Pandoc check failed: {}. Is Pandoc installed?", e))
            }
            _ => continue,
        }
    }
    Err("Pandoc not found. Is it installed? Try: brew install pandoc".to_string())
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ProjectInfo {
    pub path: String,
    pub documents: Vec<String>,
}

const DEFAULT_PRINT_CSS: &str = include_str!("../../public/print.css");

/// Create a new project with the standard folder schema (inputs/, working/, context/, deliverables/)
#[tauri::command]
fn create_project(path: String) -> Result<(), String> {
    let base = Path::new(&path);
    for folder in FOLDER_SCHEMA {
        let dir = base.join(folder);
        fs::create_dir_all(&dir)
            .map_err(|e| format!("Failed to create {}: {}", dir.display(), e))?;
    }
    let print_css = base.join("print.css");
    if !print_css.exists() {
        fs::write(&print_css, DEFAULT_PRINT_CSS)
            .map_err(|e| format!("Failed to write print.css: {}", e))?;
    }
    Ok(())
}

/// List markdown files in a project folder (e.g. "context", "inputs")
#[tauri::command]
fn list_folder_files(project_path: String, folder: String) -> Result<Vec<String>, String> {
    let dir = Path::new(&project_path).join(&folder);
    if !dir.exists() || !dir.is_dir() {
        return Ok(vec![]);
    }
    let mut paths = Vec::new();
    if let Ok(entries) = fs::read_dir(&dir) {
        for entry in entries.flatten() {
            let path = entry.path();
            if path.is_file() {
                if let Some(ext) = path.extension() {
                    if ext == "md" || ext == "markdown" {
                        if let Some(name) = path.file_name() {
                            paths.push(format!("{}/{}", folder, name.to_string_lossy()));
                        }
                    }
                }
            }
        }
    }
    paths.sort();
    Ok(paths)
}

/// List markdown documents in inputs/, working/, context/, deliverables/
#[tauri::command]
fn list_project_documents(project_path: String) -> Result<ProjectInfo, String> {
    let base = Path::new(&project_path);
    let mut documents = Vec::new();

    for folder in FOLDER_SCHEMA {
        let dir = base.join(folder);
        if dir.exists() {
            if let Ok(entries) = fs::read_dir(&dir) {
                for entry in entries.flatten() {
                    let path = entry.path();
                    if path.is_file() {
                        if let Some(ext) = path.extension() {
                            if ext == "md" || ext == "markdown" {
                                if let Some(name) = path.file_name() {
                                    documents.push(format!(
                                        "{}/{}",
                                        folder,
                                        name.to_string_lossy()
                                    ));
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    Ok(ProjectInfo {
        path: project_path,
        documents,
    })
}

/// Read a document from the project (path relative to project, e.g. "working/draft.md")
#[tauri::command]
fn read_document(project_path: String, relative_path: String) -> Result<String, String> {
    let full_path = Path::new(&project_path).join(&relative_path);
    fs::read_to_string(&full_path)
        .map_err(|e| format!("Failed to read {}: {}", full_path.display(), e))
}

/// Move a document to a different folder within the project
#[tauri::command]
fn move_document(
    project_path: String,
    from_relative_path: String,
    to_folder: String,
) -> Result<String, String> {
    let base = Path::new(&project_path);
    let from_path = base.join(&from_relative_path);

    if !from_path.exists() {
        return Err(format!("Document not found: {}", from_relative_path));
    }
    if !from_path.is_file() {
        return Err(format!("Not a file: {}", from_relative_path));
    }

    // Validate target folder is in schema
    if !FOLDER_SCHEMA.contains(&to_folder.as_str()) {
        return Err(format!(
            "Invalid folder: {}. Must be one of: {}",
            to_folder,
            FOLDER_SCHEMA.join(", ")
        ));
    }

    let file_name = from_path
        .file_name()
        .and_then(|n| n.to_str())
        .ok_or("Invalid filename")?;

    let to_relative_path = format!("{}/{}", to_folder, file_name);
    let to_path = base.join(&to_relative_path);

    if from_path == to_path {
        return Ok(to_relative_path);
    }

    if to_path.exists() {
        return Err(format!(
            "File already exists in {}: {}",
            to_folder, file_name
        ));
    }

    if let Some(parent) = to_path.parent() {
        fs::create_dir_all(parent).map_err(|e| format!("Failed to create folder: {}", e))?;
    }

    fs::rename(&from_path, &to_path)
        .map_err(|e| format!("Failed to move file: {}", e))?;

    Ok(to_relative_path)
}

/// A single search match (path relative to project, 1-based line number, line snippet).
#[derive(Debug, Serialize, Deserialize)]
pub struct SearchMatch {
    pub path: String,
    pub line: u32,
    pub snippet: String,
}

/// Search project markdown files for a query. Returns matches with path, line, and snippet.
/// include_glob: e.g. "*.md" (default); exclude_glob: e.g. "node_modules" or ".git".
#[tauri::command]
fn search_project(
    project_path: String,
    query: String,
    include_glob: Option<String>,
    exclude_glob: Option<String>,
    case_sensitive: bool,
) -> Result<Vec<SearchMatch>, String> {
    if query.is_empty() {
        return Ok(vec![]);
    }
    let base = Path::new(&project_path);
    let _include = include_glob.as_deref().unwrap_or("*.md");
    let exclude = exclude_glob.as_deref().unwrap_or("");

    let query_needle = if case_sensitive {
        query.clone()
    } else {
        query.to_lowercase()
    };

    let mut results = Vec::new();
    for folder in FOLDER_SCHEMA {
        let dir = base.join(folder);
        if !dir.exists() || !dir.is_dir() {
            continue;
        }
        let entries = fs::read_dir(&dir).map_err(|e| e.to_string())?;
        for entry in entries.flatten() {
            let path = entry.path();
            if !path.is_file() {
                continue;
            }
            let ext = path.extension().and_then(|e| e.to_str()).unwrap_or("");
            if ext != "md" && ext != "markdown" {
                continue;
            }
            let rel_path = path.strip_prefix(base).unwrap_or(&path);
            let rel_str = rel_path.to_string_lossy();
            if !exclude.is_empty() && rel_str.contains(exclude) {
                continue;
            }
            let content = match fs::read_to_string(&path) {
                Ok(c) => c,
                Err(_) => continue,
            };
            for (i, line) in content.lines().enumerate() {
                let line_no = (i + 1) as u32;
                let haystack = if case_sensitive {
                    line.to_string()
                } else {
                    line.to_lowercase()
                };
                if haystack.contains(&query_needle) {
                    results.push(SearchMatch {
                        path: rel_str.to_string(),
                        line: line_no,
                        snippet: line.trim().to_string(),
                    });
                }
            }
        }
    }
    Ok(results)
}

/// Write a document to the project
#[tauri::command]
fn write_document(
    project_path: String,
    relative_path: String,
    content: String,
) -> Result<(), String> {
    let full_path = Path::new(&project_path).join(&relative_path);
    if let Some(parent) = full_path.parent() {
        fs::create_dir_all(parent).map_err(|e| format!("Failed to create parent: {}", e))?;
    }
    let mut file = fs::File::create(&full_path)
        .map_err(|e| format!("Failed to create {}: {}", full_path.display(), e))?;
    file.write_all(content.as_bytes())
        .map_err(|e| format!("Failed to write: {}", e))?;
    Ok(())
}

/// Export document to PDF using Pandoc
#[tauri::command]
fn export_pdf(
    project_path: String,
    relative_path: String,
    output_path: String,
    css_path: Option<String>,
) -> Result<(), String> {
    let input = Path::new(&project_path).join(&relative_path);
    if !input.exists() {
        return Err(format!("Input file not found: {}", input.display()));
    }

    let pandoc = find_pandoc()?;
    let mut cmd = Command::new(&pandoc);
    cmd.arg(input.as_os_str()).args(["-o", &output_path]).args([
        "--standalone",
        "--metadata",
        "pagetitle=Document",
    ]);

    if let Some(css) = css_path {
        if Path::new(&css).exists() {
            cmd.args(["--css", &css]);
        }
    }

    let status = cmd
        .status()
        .map_err(|e| format!("Failed to run pandoc: {}", e))?;
    if !status.success() {
        return Err("Pandoc export failed".to_string());
    }
    Ok(())
}

/// Open a native folder picker; returns the selected path or None if cancelled
#[tauri::command]
fn open_folder_dialog() -> Result<Option<String>, String> {
    let result = rfd::FileDialog::new().pick_folder();
    Ok(result.map(|p| p.to_string_lossy().into_owned()))
}

/// Open a native file picker for DOCX files; returns the selected path or None if cancelled
#[tauri::command]
fn open_file_dialog() -> Result<Option<String>, String> {
    let result = rfd::FileDialog::new()
        .add_filter("Word document", &["docx"])
        .pick_file();
    Ok(result.map(|p| p.to_string_lossy().into_owned()))
}

/// Read project config from Folivm.yaml in project root
#[tauri::command]
fn read_project_config(project_path: String) -> Result<ProjectConfig, String> {
    let config_path = Path::new(&project_path).join(PROJECT_CONFIG_FILE);
    if !config_path.exists() {
        return Ok(ProjectConfig::default());
    }
    let content = fs::read_to_string(&config_path)
        .map_err(|e| format!("Failed to read {}: {}", config_path.display(), e))?;
    serde_yaml::from_str(&content).map_err(|e| format!("Invalid {}: {}", PROJECT_CONFIG_FILE, e))
}

/// Write project config to Folivm.yaml
#[tauri::command]
fn write_project_config(project_path: String, config: ProjectConfig) -> Result<(), String> {
    let config_path = Path::new(&project_path).join(PROJECT_CONFIG_FILE);
    let content =
        serde_yaml::to_string(&config).map_err(|e| format!("Failed to serialize config: {}", e))?;
    fs::write(&config_path, content)
        .map_err(|e| format!("Failed to write {}: {}", config_path.display(), e))?;
    Ok(())
}

async fn request_openai(
    llm: &LlmConfig,
    system_content: &str,
    user_content: &str,
) -> Result<String, String> {
    let body = serde_json::json!({
        "model": llm.model,
        "messages": [
            { "role": "system", "content": system_content },
            { "role": "user", "content": user_content }
        ]
    });
    let client = reqwest::Client::new();
    let res = client
        .post("https://api.openai.com/v1/chat/completions")
        .header("Authorization", format!("Bearer {}", llm.api_key))
        .header("Content-Type", "application/json")
        .json(&body)
        .send()
        .await
        .map_err(|e| format!("LLM request failed: {}", e))?;

    if !res.status().is_success() {
        let status = res.status();
        let text = res.text().await.unwrap_or_default();
        return Err(format!("LLM API error {}: {}", status, text));
    }

    let json: serde_json::Value = res
        .json()
        .await
        .map_err(|e| format!("Invalid LLM response: {}", e))?;
    let content = json["choices"][0]["message"]["content"]
        .as_str()
        .ok_or("Invalid LLM response format")?
        .to_string();
    Ok(content)
}

async fn request_anthropic(
    llm: &LlmConfig,
    system_content: &str,
    user_content: &str,
) -> Result<String, String> {
    let body = serde_json::json!({
        "model": llm.model,
        "max_tokens": 4096,
        "system": system_content,
        "messages": [
            { "role": "user", "content": user_content }
        ]
    });
    let client = reqwest::Client::new();
    let res = client
        .post("https://api.anthropic.com/v1/messages")
        .header("x-api-key", llm.api_key.as_str())
        .header("anthropic-version", "2023-06-01")
        .header("Content-Type", "application/json")
        .json(&body)
        .send()
        .await
        .map_err(|e| format!("LLM request failed: {}", e))?;

    if !res.status().is_success() {
        let status = res.status();
        let text = res.text().await.unwrap_or_default();
        return Err(format!("LLM API error {}: {}", status, text));
    }

    let json: serde_json::Value = res
        .json()
        .await
        .map_err(|e| format!("Invalid LLM response: {}", e))?;
    let content = json["content"][0]["text"]
        .as_str()
        .ok_or("Invalid LLM response format")?
        .to_string();
    Ok(content)
}

/// Request LLM assistance. Uses config from Folivm.yaml (llm.provider, llm.api_key, llm.model).
/// Supports OpenAI and Anthropic providers. Returns generated text.
#[tauri::command]
async fn request_llm(
    project_path: String,
    prompt: String,
    document_content: String,
    context: Option<Vec<String>>,
) -> Result<String, String> {
    let config = read_project_config(project_path)?;
    let llm = config
        .llm
        .as_ref()
        .ok_or("LLM not configured. Add llm.provider, llm.api_key, llm.model to Folivm.yaml.")?;
    if llm.api_key.is_empty() {
        return Err("LLM API key not set.".to_string());
    }

    let context_block = context
        .filter(|c| !c.is_empty())
        .map(|c| c.join("\n\n"))
        .unwrap_or_default();
    let system_content = if context_block.is_empty() {
        "You are a helpful assistant for drafting and refining professional documents. Respond with markdown only, no preamble."
            .to_string()
    } else {
        format!(
            "You are a helpful assistant for drafting and refining professional documents. Use the following context when relevant:\n\n--- Context ---\n{}\n--- End context ---\n\nRespond with markdown only, no preamble.",
            context_block
        )
    };
    let user_content = if document_content.is_empty() {
        prompt
    } else {
        format!(
            "--- Current document ---\n{}\n--- End document ---\n\nInstruction: {}",
            document_content, prompt
        )
    };

    let provider_lower = llm.provider.to_lowercase();
    let content = if provider_lower == "anthropic" {
        request_anthropic(llm, &system_content, &user_content).await?
    } else if provider_lower == "openai" {
        request_openai(llm, &system_content, &user_content).await?
    } else {
        return Err(format!(
            "Unsupported LLM provider: {}. Supported: openai, anthropic.",
            llm.provider
        ));
    };
    Ok(content)
}

/// Export document to DOCX using Pandoc
#[tauri::command]
fn export_docx(
    project_path: String,
    relative_path: String,
    output_path: String,
    reference_docx: Option<String>,
) -> Result<(), String> {
    let input = Path::new(&project_path).join(&relative_path);
    if !input.exists() {
        return Err(format!("Input file not found: {}", input.display()));
    }

    let pandoc = find_pandoc()?;
    let mut cmd = Command::new(&pandoc);
    cmd.arg(input.as_os_str()).args(["-o", &output_path]);

    if let Some(ref_doc) = reference_docx {
        let ref_path = Path::new(&ref_doc);
        let resolved = if ref_path.is_relative() {
            Path::new(&project_path).join(ref_path)
        } else {
            ref_path.to_path_buf()
        };
        if resolved.exists() {
            cmd.args(["--reference-doc", resolved.to_string_lossy().as_ref()]);
        }
    }

    let status = cmd
        .status()
        .map_err(|e| format!("Failed to run pandoc: {}", e))?;
    if !status.success() {
        return Err("Pandoc export failed".to_string());
    }
    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            create_project,
            move_document,
            search_project,
            open_folder_dialog,
            open_file_dialog,
            read_project_config,
            write_project_config,
            request_llm,
            list_folder_files,
            list_project_documents,
            read_document,
            write_document,
            export_pdf,
            export_docx,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
