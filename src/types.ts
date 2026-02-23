export interface ProjectInfo {
  path: string;
  documents: string[];
}

export interface ProjectConfig {
  reference_docx?: string | null;
  llm?: { provider?: string; api_key?: string; model?: string } | null;
}

export interface SearchMatch {
  path: string;
  line: number;
  snippet: string;
}
