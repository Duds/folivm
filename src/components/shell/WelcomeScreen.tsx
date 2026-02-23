interface WelcomeScreenProps {
  onCreateProject: () => void;
  onOpenProject: () => void;
  error: string;
  status: string;
}

export function WelcomeScreen({
  onCreateProject,
  onOpenProject,
  error,
  status,
}: WelcomeScreenProps) {
  return (
    <main className="app app-welcome">
      <header className="app-header">
        <h1>Folivm</h1>
        <p className="tagline">Markdown-native document editor</p>
      </header>
      <div className="welcome">
        <div className="welcome-actions">
          <button className="btn" onClick={onCreateProject}>
            Create New Project
          </button>
          <button className="btn btn-ghost" onClick={onOpenProject}>
            Open Project
          </button>
        </div>
        {error && <p className="error">{error}</p>}
        {status && <p className="status">{status}</p>}
      </div>
    </main>
  );
}
