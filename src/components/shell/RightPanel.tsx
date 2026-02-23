import { ChevronLeft, ChevronRight, Send } from "lucide-react";
import * as Select from "@radix-ui/react-select";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { Label } from "@/components/ui/Label";
import { cn } from "@/lib/utils";

interface RightPanelProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  contextChip: string;
  contextFiles: string[];
  selectedContextPaths: Set<string>;
  onToggleContextFile: (path: string) => void;
  showLlmConfig: boolean;
  llmConfigForm: {
    provider: string;
    api_key: string;
    model: string;
  };
  onLlmConfigFormChange: (
    updater: (
      prev: RightPanelProps["llmConfigForm"]
    ) => RightPanelProps["llmConfigForm"]
  ) => void;
  onSaveLlmConfig: () => void;
  onCloseLlmConfig: () => void;
  llmSuggestion: string | null;
  onUpdateLlmSuggestion: (text: string) => void;
  onAcceptLlmSuggestion: () => void;
  onRejectLlmSuggestion: () => void;
  llmPrompt: string;
  onLlmPromptChange: (value: string) => void;
  llmLoading: boolean;
  onRequestLlm: () => void;
  onOpenLlmConfig: () => void;
  currentDoc: string | null;
  assistantPromptRef: React.RefObject<HTMLTextAreaElement | null>;
}

export function RightPanel({
  collapsed,
  onToggleCollapse,
  contextChip,
  contextFiles,
  selectedContextPaths,
  onToggleContextFile,
  showLlmConfig,
  llmConfigForm,
  onLlmConfigFormChange,
  onSaveLlmConfig,
  onCloseLlmConfig,
  llmSuggestion,
  onUpdateLlmSuggestion,
  onAcceptLlmSuggestion,
  onRejectLlmSuggestion,
  llmPrompt,
  onLlmPromptChange,
  llmLoading,
  onRequestLlm,
  onOpenLlmConfig,
  currentDoc,
  assistantPromptRef,
}: RightPanelProps) {
  return (
    <aside
      className={cn("sidebar sidebar-right", collapsed && "collapsed")}
    >
      <div className="sidebar-panel">
        <div
          className="sidebar-toggle"
          onClick={onToggleCollapse}
          aria-label={
            collapsed ? "Expand assistant" : "Collapse assistant"
          }
        >
          {collapsed ? (
            <ChevronLeft size={16} />
          ) : (
            <ChevronRight size={16} />
          )}
        </div>
        <ScrollArea.Root className="sidebar-content assistant-content">
          <ScrollArea.Viewport>
            <div className="assistant-content-inner">
              <div className="assistant-header">
                <span className="assistant-title">Assistant</span>
                <span className="context-chip" title={contextChip}>
                  {contextChip}
                </span>
              </div>
              {contextFiles.length > 0 && (
                <div className="context-selector">
                  <span className="context-selector-label">Context files</span>
                  <div className="context-file-list">
                    {contextFiles.map((path) => (
                      <label key={path} className="context-file-item">
                        <input
                          type="checkbox"
                          checked={selectedContextPaths.has(path)}
                          onChange={() => onToggleContextFile(path)}
                        />
                        <span>{path}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              {showLlmConfig ? (
                <div className="assistant-config">
                  <p>
                    Configure your LLM provider (BYOK). Stored in Folivm.yaml.
                  </p>
                  <div className="form-group">
                    <Label htmlFor="llm-provider">Provider</Label>
                    <Select.Root
                      value={llmConfigForm.provider}
                      onValueChange={(value) =>
                        onLlmConfigFormChange((c) => ({
                          ...c,
                          provider: value,
                          model:
                            value === "anthropic"
                              ? "claude-sonnet-4-20250514"
                              : "gpt-4o-mini",
                        }))
                      }
                    >
                      <Select.Trigger
                        id="llm-provider"
                        className="radix-select-trigger"
                      >
                        <Select.Value />
                      </Select.Trigger>
                      <Select.Portal>
                        <Select.Content className="radix-select-content">
                          <Select.Viewport>
                            <Select.Item
                              value="openai"
                              className="radix-select-item"
                            >
                              <Select.ItemText>OpenAI</Select.ItemText>
                            </Select.Item>
                            <Select.Item
                              value="anthropic"
                              className="radix-select-item"
                            >
                              <Select.ItemText>Anthropic (Claude)</Select.ItemText>
                            </Select.Item>
                          </Select.Viewport>
                        </Select.Content>
                      </Select.Portal>
                    </Select.Root>
                  </div>
                  <div className="form-group">
                    <Label htmlFor="llm-api-key">API Key</Label>
                    <input
                      id="llm-api-key"
                      type="password"
                      value={llmConfigForm.api_key}
                      onChange={(e) =>
                        onLlmConfigFormChange((c) => ({
                          ...c,
                          api_key: e.target.value,
                        }))
                      }
                      placeholder="sk-..."
                    />
                  </div>
                  <div className="form-group">
                    <Label htmlFor="llm-model">Model</Label>
                    <input
                      id="llm-model"
                      type="text"
                      value={llmConfigForm.model}
                      onChange={(e) =>
                        onLlmConfigFormChange((c) => ({
                          ...c,
                          model: e.target.value,
                        }))
                      }
                      placeholder="gpt-4o-mini"
                    />
                  </div>
                  <div className="assistant-actions">
                    <button
                      className="btn btn-ghost"
                      onClick={onCloseLlmConfig}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn"
                      onClick={onSaveLlmConfig}
                      disabled={!llmConfigForm.api_key.trim()}
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : llmSuggestion ? (
                <div className="assistant-suggestion">
                  <div className="suggestion-card">
                    <textarea
                      className="llm-suggestion llm-suggestion-editable"
                      value={llmSuggestion}
                      onChange={(e) => onUpdateLlmSuggestion(e.target.value)}
                      placeholder="Edit suggestion before accepting..."
                      rows={12}
                    />
                    <div className="assistant-actions">
                      <button
                        className="btn btn-ghost"
                        onClick={onRejectLlmSuggestion}
                      >
                        Discard
                      </button>
                      <button className="btn" onClick={onAcceptLlmSuggestion}>
                        Accept
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="assistant-input-wrap">
                    <textarea
                      ref={assistantPromptRef}
                      className="assistant-input"
                      value={llmPrompt}
                      onChange={(e) => onLlmPromptChange(e.target.value)}
                      placeholder="e.g. Expand the executive summary with key findings"
                      rows={3}
                      disabled={llmLoading}
                    />
                    <button
                      className="btn btn-icon send-btn"
                      onClick={onRequestLlm}
                      disabled={
                        !llmPrompt.trim() || llmLoading || !currentDoc
                      }
                      title="Send"
                      aria-label="Send"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                  <button
                    className="btn btn-ghost configure-btn"
                    onClick={onOpenLlmConfig}
                  >
                    Configure LLM
                  </button>
                </>
              )}
            </div>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            orientation="vertical"
            className="radix-scrollbar"
          >
            <ScrollArea.Thumb className="radix-scrollbar-thumb" />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </div>
      {collapsed && (
        <div className="sidebar-rail">
          <button
            className="rail-toggle"
            onClick={onToggleCollapse}
            aria-label="Expand assistant"
          >
            <ChevronLeft size={16} />
          </button>
        </div>
      )}
    </aside>
  );
}
