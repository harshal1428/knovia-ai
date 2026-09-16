import { useNav } from "../context/NavContext";

const kpis = [
  { label: "Active Projects", value: "12", delta: "+2", color: "var(--color-teal)", bg: "#F0FDFA" },
  { label: "Running Tasks", value: "4", delta: null, color: "var(--color-blue)", bg: "#EFF6FF" },
  { label: "Pending Approvals", value: "2", delta: null, color: "var(--color-warning)", bg: "#FFFBEB" },
  { label: "Knowledge Sources", value: "1,284", delta: "+47", color: "var(--color-info)", bg: "#F0F9FF" },
  { label: "GPU Utilization", value: "68%", delta: null, color: "#7C3AED", bg: "#F5F3FF" },
];

const recentWork = [
  { project: "P-102 Inspection Analysis", dept: "Inspection Engineering", status: "Running", agent: "HSE Agent", time: "12 min ago", cls: "CONFIDENTIAL" },
  { project: "Vendor Technical Evaluation", dept: "Procurement", status: "Completed", agent: "Research Agent", time: "1 hr ago", cls: "INTERNAL" },
  { project: "CDU-4 Maintenance Report", dept: "Process Engineering", status: "Pending Approval", agent: "Document Agent", time: "3 hrs ago", cls: "CONFIDENTIAL" },
  { project: "Pipeline Anomaly Investigation", dept: "HSE", status: "Verified", agent: "Engineering Agent", time: "Yesterday", cls: "RESTRICTED" },
  { project: "Reformer Unit Optimization", dept: "Process Engineering", status: "Running", agent: "Data Analysis Agent", time: "5 min ago", cls: "CONFIDENTIAL" },
];

const statusColors: Record<string, { bg: string; color: string }> = {
  Running: { bg: "#DBEAFE", color: "#1D4ED8" },
  Completed: { bg: "#DCFCE7", color: "#15803D" },
  "Pending Approval": { bg: "#FEF3C7", color: "#92400E" },
  Verified: { bg: "#F0FDFA", color: "#0F766E" },
};

const clsColors: Record<string, { bg: string; color: string }> = {
  CONFIDENTIAL: { bg: "#FEF3C7", color: "#92400E" },
  INTERNAL: { bg: "#DBEAFE", color: "#1E40AF" },
  RESTRICTED: { bg: "#FEE2E2", color: "#991B1B" },
  PUBLIC: { bg: "#F0FDF4", color: "#15803D" },
};

const quickActions = [
  { label: "New Chat", icon: "◯", page: "workbench" as const },
  { label: "New Project", icon: "◫", page: "projects" as const },
  { label: "Upload Document", icon: "↑", page: "documents" as const },
  { label: "New Notebook", icon: "◉", page: "research-notebooks" as const },
  { label: "Coding Workspace", icon: "⌨", page: "coding-workspace" as const },
  { label: "Start Analysis", icon: "△", page: "engineering-analysis" as const },
];

export default function Dashboard() {
  const { navigate } = useNav();

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: "var(--color-surface-subtle)" }}>
      <div className="max-w-6xl mx-auto px-10 py-12">

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-semibold tracking-tight" style={{ color: "var(--color-text-primary)" }}>
            Good morning, Anita
          </h1>
          <p className="text-base mt-2" style={{ color: "var(--color-text-secondary)" }}>
            Your secure industrial AI workspace — MRPL Refinery Operations
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-6 gap-6 mb-12">
          {quickActions.map((a) => (
            <button
              key={a.label}
              onClick={() => navigate(a.page)}
              className="flex flex-col items-center justify-center gap-3 px-4 py-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all text-center border border-transparent hover:border-slate-200"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full" style={{ background: "var(--color-bg-secondary)", color: "var(--color-teal)" }}>
                <span className="text-xl">{a.icon}</span>
              </div>
              <span className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>{a.label}</span>
            </button>
          ))}
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-5 gap-6 mb-12">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-2xl px-6 py-6 bg-white shadow-sm"
            >
              <div className="text-xs mb-3 font-semibold" style={{ color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {kpi.label}
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold" style={{ color: kpi.color }}>{kpi.value}</span>
                {kpi.delta && (
                  <span className="text-sm font-medium" style={{ color: "var(--color-success)" }}>{kpi.delta}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-10">
          {/* Recent Work */}
          <div className="col-span-2">
            <div className="bg-white rounded-2xl shadow-sm">
              <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: "var(--color-border)" }}>
                <h2 className="font-semibold text-base" style={{ color: "var(--color-text-primary)" }}>Recent Work</h2>
                <button className="text-sm font-medium transition-colors hover:text-teal-700" style={{ color: "var(--color-teal)" }} onClick={() => navigate("projects")}>
                  View all →
                </button>
              </div>
              <div className="py-2">
                {recentWork.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-5 px-6 py-4 hover:bg-slate-50 cursor-pointer transition-colors"
                    onClick={() => navigate("project-detail")}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-base truncate" style={{ color: "var(--color-text-primary)" }}>
                        {item.project}
                      </div>
                      <div className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
                        {item.dept} · {item.agent}
                      </div>
                    </div>
                    <span
                      className="text-xs px-2.5 py-1 rounded-md font-medium flex-shrink-0"
                      style={{
                        background: statusColors[item.status]?.bg || "#F1F5F9",
                        color: statusColors[item.status]?.color || "#475569",
                      }}
                    >
                      {item.status}
                    </span>
                    <span
                      className="text-xs px-2.5 py-1 rounded-md font-medium flex-shrink-0"
                      style={{
                        background: clsColors[item.cls]?.bg || "#F1F5F9",
                        color: clsColors[item.cls]?.color || "#475569",
                      }}
                    >
                      {item.cls}
                    </span>
                    <span className="text-sm flex-shrink-0" style={{ color: "var(--color-text-muted)" }}>
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Side Widgets */}
          <div className="flex flex-col gap-6">
            {/* Sovereignty Status */}
            <div className="bg-white rounded-2xl shadow-sm">
              <div className="px-6 py-5 border-b" style={{ borderColor: "var(--color-border)" }}>
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-base" style={{ color: "var(--color-text-primary)" }}>Environment</h2>
                  <span className="flex items-center gap-1.5 text-sm font-medium" style={{ color: "#15803D" }}>
                    <span className="w-2 h-2 rounded-full bg-green-600"></span> Operational
                  </span>
                </div>
              </div>
              <div className="px-6 py-4">
                {[
                  { label: "On-Premise AI", status: true },
                  { label: "Internet Egress: Blocked", status: true },
                  { label: "Local Models: Active", status: true },
                  { label: "Encrypted Storage: Active", status: true },
                  { label: "RBAC: Active", status: true },
                  { label: "Audit Logging: Active", status: true },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 py-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#15803D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span className="text-sm" style={{ color: "var(--color-text-secondary)" }}>{item.label}</span>
                  </div>
                ))}
              </div>
              <div className="px-6 pb-6 mt-2">
                <button
                  onClick={() => navigate("security-center")}
                  className="w-full text-sm font-medium py-2.5 rounded-lg border transition-colors hover:bg-teal-50"
                  style={{ borderColor: "var(--color-teal)", color: "var(--color-teal)" }}
                >
                  View Security Center
                </button>
              </div>
            </div>

            {/* Pending Approvals widget */}
            <div className="bg-white rounded-2xl shadow-sm">
              <div className="px-6 py-5 border-b" style={{ borderColor: "var(--color-border)" }}>
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-base" style={{ color: "var(--color-text-primary)" }}>Pending Approvals</h2>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md" style={{ background: "#FEF3C7", color: "#92400E" }}>2</span>
                </div>
              </div>
              <div className="px-6 py-4">
                {[
                  { task: "CDU-4 Management Note", agent: "Document Agent", risk: "Medium" },
                  { task: "Vendor Contract Analysis", agent: "Research Agent", risk: "Low" },
                ].map((item, i) => (
                  <div key={i} className="py-3 border-b last:border-0" style={{ borderColor: "var(--color-border)" }}>
                    <div className="font-medium text-sm" style={{ color: "var(--color-text-primary)" }}>{item.task}</div>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>{item.agent}</span>
                      <span className="text-xs px-2 py-0.5 rounded-md" style={{ background: "#FEF3C7", color: "#92400E" }}>
                        Risk: {item.risk}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-6 pb-6">
                <button
                  onClick={() => navigate("approvals")}
                  className="w-full text-sm font-medium py-2.5 rounded-lg border transition-colors hover:bg-amber-50"
                  style={{ borderColor: "#D97706", color: "#D97706" }}
                >
                  Review Approvals
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
