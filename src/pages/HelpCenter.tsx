import { useNav } from "../context/NavContext";

const sections = [
  { title: "Getting Started", items: ["What is Sovereign AI Workbench?", "Your first project", "Uploading documents", "Starting a task"], page: "workbench" as const },
  { title: "Workbench", items: ["Using Auto Select vs Manual mode", "Understanding execution paths", "Reading evidence sources", "Execution context panel"], page: "workbench" as const },
  { title: "Projects", items: ["Creating a project", "Adding contributors", "Project permissions", "Classification levels"], page: "projects" as const },
  { title: "Knowledge Base & RAG", items: ["How hybrid retrieval works", "BM25 vs Vector Search", "Knowledge collections", "Adding documents to knowledge"], page: "knowledge-base" as const },
  { title: "Documents", items: ["Supported formats", "Ingestion pipeline", "Conflict resolution", "Document versioning"], page: "documents" as const },
  { title: "Agents", items: ["Available agents and capabilities", "Auto vs Manual agent selection", "Agent permissions", "Approval requirements"], page: "agents" as const },
  { title: "Coding & Sandbox", items: ["Opening Coding Workspace", "Running code in sandbox", "Checkpoints and rollback", "Test execution"], page: "coding-workspace" as const },
  { title: "Engineering", items: ["Engineering analysis workflow", "Drawing generation", "Multimodal inputs", "Review requirements"], page: "engineering-analysis" as const },
  { title: "Security & RBAC", items: ["Role permissions", "Data classification", "Audit trail", "Approvals workflow"], page: "security-center" as const },
  { title: "System Health", items: ["Monitoring services", "GPU utilization", "Model status", "Network security"], page: "system-health" as const },
];

export default function HelpCenter() {
  const { navigate } = useNav();

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: "var(--color-bg-secondary)" }}>
      <div className="max-w-5xl mx-auto px-8 py-8">
        <div className="mb-6">
          <h1 className="text-xl font-semibold" style={{ color: "var(--color-text-primary)" }}>Help Center</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--color-text-muted)" }}>Documentation for Sovereign AI Workbench — MRPL Internal</p>
        </div>

        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Search help articles..."
            className="w-full pl-10 pr-4 py-3 text-sm rounded border bg-white outline-none"
            style={{ borderColor: "var(--color-border)", fontSize: 13 }}
          />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5.5" stroke="#0F172A" strokeWidth="1.5" />
            <path d="M11.5 11.5L14.5 14.5" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {sections.map((section) => (
            <div key={section.title} className="bg-white rounded border p-5 hover:shadow-sm transition-all" style={{ borderColor: "var(--color-border)" }}>
              <div className="flex items-center justify-between mb-3">
                <div className="font-semibold text-sm" style={{ color: "var(--color-text-primary)" }}>{section.title}</div>
                <button
                  onClick={() => navigate(section.page)}
                  className="text-xs font-medium"
                  style={{ color: "var(--color-teal)" }}
                >
                  Open →
                </button>
              </div>
              <div className="space-y-1.5">
                {section.items.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs cursor-pointer hover:underline" style={{ color: "var(--color-text-secondary)" }}>
                    <span style={{ color: "var(--color-text-muted)" }}>·</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-white rounded border p-6" style={{ borderColor: "var(--color-border)" }}>
          <div className="font-semibold text-sm mb-1" style={{ color: "var(--color-text-primary)" }}>Need Support?</div>
          <p className="text-sm" style={{ color: "var(--color-text-secondary)", fontSize: 13 }}>
            Contact the MRPL AI Platform team via internal ticketing system. All support is handled within the MRPL intranet — no external channels.
          </p>
          <div className="flex gap-3 mt-3">
            <button className="text-xs px-4 py-2 rounded border font-medium" style={{ borderColor: "var(--color-border)", color: "var(--color-text-secondary)" }}>Raise a Ticket</button>
            <button className="text-xs px-4 py-2 rounded border font-medium" style={{ borderColor: "var(--color-border)", color: "var(--color-text-secondary)" }}>System Status</button>
          </div>
        </div>
      </div>
    </div>
  );
}
