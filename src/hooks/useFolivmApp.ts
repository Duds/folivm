import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { invoke } from "@tauri-apps/api/core";
import { openUrl } from "@tauri-apps/plugin-opener";
import type { ProjectInfo, ProjectConfig, SearchMatch } from "@/types";
import { parseDocument, serializeDocument, validateFrontmatter } from "@/frontmatter";

const DOCUMENTATION_URL = "https://github.com/dalerogers/folivm";
const SUPPORT_URL = "https://github.com/dalerogers/folivm/issues";

const FOLDERS = ["inputs", "working", "context", "deliverables"] as const;

function groupDocumentsByFolder(documents: string[]): Map<string, string[]> {
  const map = new Map<string, string[]>();
  for (const folder of FOLDERS) {
    map.set(folder, []);
  }
  map.set("other", []);
  for (const doc of documents) {
    const parts = doc.split("/");
    const folder = parts.length > 1 ? parts[0] : "deliverables";
    if (map.has(folder)) {
      map.get(folder)!.push(doc);
    } else {
      map.get("other")!.push(doc);
    }
  }
  return map;
}

function wordCount(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

export function useFolivmApp() {
  const [project, setProject] = useState<ProjectInfo | null>(null);
  const [currentDoc, setCurrentDoc] = useState<string | null>(null);
  const [docContent, setDocContent] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [showNewDocModal, setShowNewDocModal] = useState(false);
  const [newDocName, setNewDocName] = useState("");
  const [llmPrompt, setLlmPrompt] = useState("");
  const [llmLoading, setLlmLoading] = useState(false);
  const [llmSuggestion, setLlmSuggestion] = useState<string | null>(null);
  const [showLlmConfig, setShowLlmConfig] = useState(false);
  const [llmConfigForm, setLlmConfigForm] = useState({
    provider: "openai",
    api_key: "",
    model: "gpt-4o-mini",
  });
  const [showReferenceDocxModal, setShowReferenceDocxModal] = useState(false);
  const [showKeyboardShortcutsModal, setShowKeyboardShortcutsModal] =
    useState(false);
  const [referenceDocxPath, setReferenceDocxPath] = useState<string | null>(
    null
  );
  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(false);
  const [leftSidebarWidth, setLeftSidebarWidth] = useState(240);
  const [rightSidebarCollapsed, setRightSidebarCollapsed] = useState(false);
  const [autosaveEnabled, setAutosaveEnabled] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set()
  );
  const [contextFiles, setContextFiles] = useState<string[]>([]);
  const [selectedContextPaths, setSelectedContextPaths] = useState<Set<string>>(
    new Set()
  );
  const [viewMode, setViewMode] = useState<
    "document" | "preview" | "outline"
  >("document");
  const [zoomLevel, setZoomLevel] = useState(100);
  const [exportStatus, setExportStatus] = useState<string | null>(null);
  const [leftSidebarView, setLeftSidebarView] = useState<"project" | "search">(
    "project"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [replaceQuery, setReplaceQuery] = useState("");
  const [searchScope, setSearchScope] = useState<"document" | "project">(
    "document"
  );
  const [searchCaseSensitive, setSearchCaseSensitive] = useState(false);
  const [projectSearchResults, setProjectSearchResults] = useState<
    SearchMatch[]
  >([]);
  const [projectSearchLoading, setProjectSearchLoading] = useState(false);
  const [currentDocumentMatchIndex, setCurrentDocumentMatchIndex] = useState(0);
  const assistantPromptRef = useRef<HTMLTextAreaElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const lastSavedContentRef = useRef<string | null>(null);

  const groupedDocs = useMemo(
    () => (project ? groupDocumentsByFolder(project.documents) : null),
    [project]
  );

  const { frontmatter, body } = useMemo(() => {
    const parsed = parseDocument(docContent);
    return { frontmatter: parsed.frontmatter, body: parsed.body };
  }, [docContent]);

  const documentMatches = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const needle = searchCaseSensitive
      ? searchQuery
      : searchQuery.toLowerCase();
    const haystack = searchCaseSensitive ? body : body.toLowerCase();
    const out: { start: number; end: number }[] = [];
    let i = 0;
    while (i < haystack.length) {
      const idx = haystack.indexOf(needle, i);
      if (idx === -1) break;
      out.push({ start: idx, end: idx + searchQuery.length });
      i = idx + 1;
    }
    return out;
  }, [body, searchQuery, searchCaseSensitive]);

  const showError = useCallback((msg: string) => {
    setError(msg);
    setStatus("");
  }, []);

  const toggleContextFile = useCallback((path: string) => {
    setSelectedContextPaths((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  }, []);

  useEffect(() => {
    if (!project) {
      setContextFiles([]);
      setSelectedContextPaths(new Set());
      return;
    }
    (async () => {
      try {
        const [ctx, inputs] = await Promise.all([
          invoke<string[]>("list_folder_files", {
            projectPath: project.path,
            folder: "context",
          }),
          invoke<string[]>("list_folder_files", {
            projectPath: project.path,
            folder: "inputs",
          }),
        ]);
        const all = [...ctx, ...inputs];
        setContextFiles(all);
        const brief = "context/brief.md";
        setSelectedContextPaths(
          all.includes(brief) ? new Set([brief]) : new Set()
        );
      } catch {
        setContextFiles([]);
      }
    })();
  }, [project?.path]);

  useEffect(() => {
    if (!autosaveEnabled || !project || !currentDoc) return;
    if (docContent === lastSavedContentRef.current) return;

    const timeout = setTimeout(() => {
      const validation = validateFrontmatter(docContent);
      if (!validation.valid) return;
      invoke("write_document", {
        projectPath: project.path,
        relativePath: currentDoc,
        content: docContent,
      })
        .then(() => {
          lastSavedContentRef.current = docContent;
          setStatus("Saved");
          setTimeout(() => setStatus(""), 2000);
        })
        .catch((e) => showError(String(e)));
    }, 1500);

    return () => clearTimeout(timeout);
  }, [autosaveEnabled, project, currentDoc, docContent, showError]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === ".") {
        e.preventDefault();
        if (rightSidebarCollapsed) setRightSidebarCollapsed(false);
        setTimeout(() => assistantPromptRef.current?.focus(), 100);
      }
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "f") {
        e.preventDefault();
        setLeftSidebarView("search");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [rightSidebarCollapsed]);

  const createProject = useCallback(async () => {
    setError("");
    setStatus("Opening folder picker...");
    try {
      const path = await invoke<null | string>("open_folder_dialog");
      if (!path) {
        setStatus("");
        return;
      }
      await invoke("create_project", { path });
      const info = await invoke<ProjectInfo>("list_project_documents", {
        projectPath: path,
      });
      setProject(info);
      setCurrentDoc(null);
      setDocContent("");
      lastSavedContentRef.current = null;
      setStatus(`Project created at ${path}`);
      setTimeout(() => setStatus(""), 3000);
    } catch (e) {
      showError(String(e));
    }
  }, [showError]);

  const openProject = useCallback(async () => {
    setError("");
    setStatus("Opening folder picker...");
    try {
      const path = await invoke<null | string>("open_folder_dialog");
      if (!path) {
        setStatus("");
        return;
      }
      const info = await invoke<ProjectInfo>("list_project_documents", {
        projectPath: path,
      });
      setProject(info);
      setCurrentDoc(null);
      setDocContent("");
      lastSavedContentRef.current = null;
      setStatus(`Opened project: ${path}`);
      setTimeout(() => setStatus(""), 3000);
    } catch (e) {
      showError(String(e));
    }
  }, [showError]);

  const refreshExplorer = useCallback(async () => {
    if (!project) return;
    setError("");
    setStatus("Refreshing...");
    try {
      const info = await invoke<ProjectInfo>("list_project_documents", {
        projectPath: project.path,
      });
      setProject({ path: info.path, documents: [...info.documents] });
      setStatus("");
    } catch (e) {
      showError(String(e));
    }
  }, [project, showError]);

  const loadDocument = useCallback(
    async (relativePath: string) => {
      if (!project) return;
      setError("");
      setStatus("Loading...");
      try {
        const content = await invoke<string>("read_document", {
          projectPath: project.path,
          relativePath,
        });
        setDocContent(content);
        setCurrentDoc(relativePath);
        lastSavedContentRef.current = content;
        setStatus("");
      } catch (e) {
        showError(String(e));
      }
    },
    [project, showError]
  );

  const moveDocument = useCallback(
    async (fromRelativePath: string, toFolder: string) => {
      if (!project) return;
      setError("");
      setStatus("Moving...");
      try {
        const newPath = await invoke<string>("move_document", {
          projectPath: project.path,
          fromRelativePath,
          toFolder,
        });
        const info = await invoke<ProjectInfo>("list_project_documents", {
          projectPath: project.path,
        });
        setProject({ path: info.path, documents: [...info.documents] });
        setExpandedFolders((prev) => new Set([...prev, toFolder]));
        if (currentDoc === fromRelativePath) {
          await loadDocument(newPath);
        }
        setStatus("Moved");
        setTimeout(() => setStatus(""), 2000);
      } catch (e) {
        showError(String(e));
      }
    },
    [project, currentDoc, loadDocument, showError]
  );

  const runProjectSearch = useCallback(async () => {
    if (!project || !searchQuery.trim()) return;
    setProjectSearchLoading(true);
    setError("");
    try {
      const results = await invoke<SearchMatch[]>("search_project", {
        projectPath: project.path,
        query: searchQuery,
        includeGlob: "*.md",
        excludeGlob: ".git",
        caseSensitive: searchCaseSensitive,
      });
      setProjectSearchResults(results);
    } catch (e) {
      showError(String(e));
      setProjectSearchResults([]);
    } finally {
      setProjectSearchLoading(false);
    }
  }, [project, searchQuery, searchCaseSensitive, showError]);

  const replaceInDocument = useCallback(
    (replaceAll: boolean) => {
      if (!replaceQuery.trim() || documentMatches.length === 0) return;
      const repl = replaceQuery;
      if (replaceAll) {
        const needle = searchCaseSensitive
          ? searchQuery
          : searchQuery.toLowerCase();
        const haystack = searchCaseSensitive ? body : body.toLowerCase();
        let i = 0;
        const parts: string[] = [];
        let last = 0;
        while (i < haystack.length) {
          const idx = haystack.indexOf(needle, i);
          if (idx === -1) break;
          parts.push(body.slice(last, idx), repl);
          last = idx + searchQuery.length;
          i = idx + 1;
        }
        parts.push(body.slice(last));
        const newBody = parts.join("");
        setDocContent(serializeDocument(frontmatter, newBody));
        setCurrentDocumentMatchIndex(0);
      } else {
        const match = documentMatches[currentDocumentMatchIndex];
        if (!match) return;
        const newBody =
          body.slice(0, match.start) + repl + body.slice(match.end);
        setDocContent(serializeDocument(frontmatter, newBody));
        setCurrentDocumentMatchIndex((prev) =>
          Math.min(prev, documentMatches.length - 2)
        );
      }
    },
    [
      body,
      frontmatter,
      replaceQuery,
      searchQuery,
      searchCaseSensitive,
      documentMatches,
      currentDocumentMatchIndex,
    ]
  );

  const openSearchResult = useCallback(
    (path: string) => {
      if (!project) return;
      loadDocument(path);
      setLeftSidebarView("project");
    },
    [project, loadDocument]
  );

  useEffect(() => {
    if (
      documentMatches.length > 0 &&
      currentDocumentMatchIndex >= documentMatches.length
    ) {
      setCurrentDocumentMatchIndex(documentMatches.length - 1);
    }
  }, [documentMatches.length, currentDocumentMatchIndex]);

  useEffect(() => {
    if (leftSidebarView === "search") {
      const t = setTimeout(() => searchInputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [leftSidebarView]);

  const createDocument = useCallback(async () => {
    if (!project) return;
    setNewDocName("");
    setShowNewDocModal(true);
  }, [project]);

  const confirmCreateDocument = useCallback(async () => {
    if (!project || !newDocName.trim()) return;
    const name = newDocName.trim();
    setShowNewDocModal(false);
    const path = `deliverables/${name.endsWith(".md") ? name : name + ".md"}`;
    setError("");
    setStatus("Creating...");
    try {
      await invoke("write_document", {
        projectPath: project.path,
        relativePath: path,
        content: `---
title: ${name.replace(".md", "")}
created: ${new Date().toISOString().slice(0, 10)}
---

# Document

`,
      });
      const info = await invoke<ProjectInfo>("list_project_documents", {
        projectPath: project.path,
      });
      setProject(info);
      await loadDocument(path);
      setStatus("Document created");
      setTimeout(() => setStatus(""), 2000);
    } catch (e) {
      showError(String(e));
    }
  }, [project, loadDocument, newDocName, showError]);

  const cancelCreateDocument = useCallback(() => {
    setShowNewDocModal(false);
    setNewDocName("");
  }, []);

  const saveDocument = useCallback(
    async (content: string) => {
      if (!project || !currentDoc) return;
      const validation = validateFrontmatter(content);
      if (!validation.valid) {
        showError(validation.error ?? "Invalid frontmatter");
        return;
      }
      setError("");
      setStatus("Saving...");
      try {
        await invoke("write_document", {
          projectPath: project.path,
          relativePath: currentDoc,
          content,
        });
        lastSavedContentRef.current = content;
        setStatus("Saved");
        setTimeout(() => setStatus(""), 2000);
      } catch (e) {
        showError(String(e));
      }
    },
    [project, currentDoc, showError]
  );

  const exportPdf = useCallback(async () => {
    if (!project || !currentDoc) {
      showError("Open a document first");
      return;
    }
    setError("");
    setExportStatus("Exporting PDF...");
    setStatus("Exporting PDF...");
    const outputPath = `${project.path}/deliverables/${currentDoc.replace(/\.md$/, ".pdf")}`;
    const cssPath = `${project.path}/print.css`;
    try {
      await invoke("export_pdf", {
        projectPath: project.path,
        relativePath: currentDoc,
        outputPath,
        cssPath,
      });
      setStatus(`PDF exported to ${outputPath}`);
      setExportStatus(null);
      setTimeout(() => setStatus(""), 5000);
    } catch (e) {
      showError(String(e));
      setExportStatus(null);
    }
  }, [project, currentDoc, showError]);

  const exportDocx = useCallback(async () => {
    if (!project || !currentDoc) {
      showError("Open a document first");
      return;
    }
    setError("");
    setExportStatus("Exporting DOCX...");
    setStatus("Exporting DOCX...");
    const outputPath = `${project.path}/deliverables/${currentDoc.replace(/\.md$/, ".docx")}`;
    try {
      const config = await invoke<ProjectConfig>("read_project_config", {
        projectPath: project.path,
      });
      await invoke("export_docx", {
        projectPath: project.path,
        relativePath: currentDoc,
        outputPath,
        referenceDocx: config.reference_docx ?? null,
      });
      setStatus(`DOCX exported to ${outputPath}`);
      setExportStatus(null);
      setTimeout(() => setStatus(""), 5000);
    } catch (e) {
      showError(String(e));
      setExportStatus(null);
    }
  }, [project, currentDoc, showError]);

  const openLlmConfig = useCallback(async () => {
    if (!project) return;
    try {
      const config = await invoke<ProjectConfig>("read_project_config", {
        projectPath: project.path,
      });
      setShowLlmConfig(!config.llm?.api_key);
      setLlmConfigForm({
        provider: config.llm?.provider ?? "openai",
        api_key: config.llm?.api_key ?? "",
        model: config.llm?.model ?? "gpt-4o-mini",
      });
    } catch {
      setShowLlmConfig(true);
    }
  }, [project]);

  const saveLlmConfig = useCallback(async () => {
    if (!project) return;
    setError("");
    try {
      const config = await invoke<ProjectConfig>("read_project_config", {
        projectPath: project.path,
      });
      await invoke("write_project_config", {
        projectPath: project.path,
        config: {
          ...config,
          llm: {
            provider: llmConfigForm.provider,
            api_key: llmConfigForm.api_key,
            model: llmConfigForm.model,
          },
        },
      });
      setShowLlmConfig(false);
      setStatus("LLM configured");
      setTimeout(() => setStatus(""), 2000);
    } catch (e) {
      showError(String(e));
    }
  }, [project, llmConfigForm, showError]);

  const requestLlm = useCallback(async () => {
    if (!project) return;
    setError("");
    setLlmLoading(true);
    try {
      let contextContents: string[] | null = null;
      if (selectedContextPaths.size > 0) {
        contextContents = await Promise.all(
          Array.from(selectedContextPaths).map((relPath) =>
            invoke<string>("read_document", {
              projectPath: project.path,
              relativePath: relPath,
            })
          )
        );
      }
      const response = await invoke<string>("request_llm", {
        projectPath: project.path,
        prompt: llmPrompt,
        documentContent: docContent,
        context: contextContents,
      });
      setLlmSuggestion(response);
    } catch (e) {
      showError(String(e));
    } finally {
      setLlmLoading(false);
    }
  }, [project, llmPrompt, docContent, selectedContextPaths, showError]);

  const acceptLlmSuggestion = useCallback(() => {
    if (llmSuggestion) {
      const sep = docContent.trimEnd().endsWith("\n") ? "" : "\n\n";
      setDocContent(docContent + sep + llmSuggestion);
      setLlmSuggestion(null);
    }
  }, [llmSuggestion, docContent]);

  const updateLlmSuggestion = useCallback((text: string) => {
    setLlmSuggestion(text);
  }, []);

  const rejectLlmSuggestion = useCallback(() => {
    setLlmSuggestion(null);
  }, []);

  const openKeyboardShortcutsModal = useCallback(() => {
    setShowKeyboardShortcutsModal(true);
  }, []);

  const openDocumentation = useCallback(async () => {
    try {
      await openUrl(DOCUMENTATION_URL);
    } catch (e) {
      showError(`Failed to open documentation: ${e}`);
    }
  }, [showError]);

  const openSupport = useCallback(async () => {
    try {
      await openUrl(SUPPORT_URL);
    } catch (e) {
      showError(`Failed to open support: ${e}`);
    }
  }, [showError]);

  const openReferenceDocxModal = useCallback(async () => {
    if (!project) return;
    try {
      const config = await invoke<ProjectConfig>("read_project_config", {
        projectPath: project.path,
      });
      setReferenceDocxPath(config.reference_docx ?? null);
      setShowReferenceDocxModal(true);
    } catch (e) {
      showError(String(e));
    }
  }, [project, showError]);

  const chooseReferenceDocx = useCallback(async () => {
    if (!project) return;
    setError("");
    try {
      const path = await invoke<null | string>("open_file_dialog");
      if (!path) return;
      const config = await invoke<ProjectConfig>("read_project_config", {
        projectPath: project.path,
      });
      await invoke("write_project_config", {
        projectPath: project.path,
        config: { ...config, reference_docx: path },
      });
      setReferenceDocxPath(path);
      setStatus("Reference DOCX template set");
      setTimeout(() => setStatus(""), 3000);
    } catch (e) {
      showError(String(e));
    }
  }, [project, showError]);

  const clearReferenceDocx = useCallback(async () => {
    if (!project) return;
    setError("");
    try {
      const config = await invoke<ProjectConfig>("read_project_config", {
        projectPath: project.path,
      });
      await invoke("write_project_config", {
        projectPath: project.path,
        config: { ...config, reference_docx: null },
      });
      setReferenceDocxPath(null);
      setStatus("Reference DOCX template cleared");
      setTimeout(() => setStatus(""), 3000);
    } catch (e) {
      showError(String(e));
    }
  }, [project, showError]);

  return {
    project,
    currentDoc,
    docContent,
    setDocContent,
    groupedDocs,
    error,
    status,
    showNewDocModal,
    newDocName,
    setNewDocName,
    llmPrompt,
    setLlmPrompt,
    llmLoading,
    llmSuggestion,
    showLlmConfig,
    llmConfigForm,
    setLlmConfigForm,
    showReferenceDocxModal,
    referenceDocxPath,
    leftSidebarView,
    setLeftSidebarView,
    leftSidebarCollapsed,
    setLeftSidebarCollapsed,
    leftSidebarWidth,
    setLeftSidebarWidth,
    rightSidebarCollapsed,
    setRightSidebarCollapsed,
    searchQuery,
    setSearchQuery,
    replaceQuery,
    setReplaceQuery,
    searchScope,
    setSearchScope,
    searchCaseSensitive,
    setSearchCaseSensitive,
    projectSearchResults,
    projectSearchLoading,
    documentMatches,
    currentDocumentMatchIndex,
    setCurrentDocumentMatchIndex,
    runProjectSearch,
    replaceInDocument,
    openSearchResult,
    searchInputRef,
    autosaveEnabled,
    setAutosaveEnabled,
    expandedFolders,
    setExpandedFolders,
    contextFiles,
    selectedContextPaths,
    viewMode,
    setViewMode,
    zoomLevel,
    setZoomLevel,
    exportStatus,
    assistantPromptRef,
    toggleContextFile,
    createProject,
    openProject,
    refreshExplorer,
    moveDocument,
    loadDocument,
    createDocument,
    confirmCreateDocument,
    cancelCreateDocument,
    saveDocument,
    exportPdf,
    exportDocx,
    openLlmConfig,
    saveLlmConfig,
    requestLlm,
    acceptLlmSuggestion,
    updateLlmSuggestion,
    rejectLlmSuggestion,
    openReferenceDocxModal,
    chooseReferenceDocx,
    clearReferenceDocx,
    setShowReferenceDocxModal,
    showKeyboardShortcutsModal,
    setShowKeyboardShortcutsModal,
    openKeyboardShortcutsModal,
    openDocumentation,
    openSupport,
    setShowLlmConfig,
    wordCount,
  };
}
