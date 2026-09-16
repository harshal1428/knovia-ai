const tasks = [
  { id: "TSK-041", name: "Review CDU-4 inspection report deviations", project: "CDU-4 Inspection Analysis", assignee: "Anita Rao", agent: "HSE Agent", status: "In Progress", priority: "High", due: "17 Sep 2026", cls: "CONFIDENTIAL" },
  { id: "TSK-042", name: "Generate management approval note", project: "CDU-4 Inspection Analysis", assignee: "Document Agent", agent: "Document Agent", status: "Pending Approval", priority: "High", due: "17 Sep 2026", cls: "CONFIDENTIAL" },
  { id: "TSK-043", name: "Query open maintenance records for CDU-4", project: "CDU-4 Inspection Analysis", assignee: "Rajesh Kumar", agent: "Data Analysis Agent", status: "Completed", priority: "Medium", due: "16 Sep 2026", cls: "INTERNAL" },
  { id: "TSK-044", name: "Vendor evaluation scoring — CX-4 compressor", project: "Vendor Technical Evaluation", assignee: "Priya Nair", agent: "Research Agent", status: "Completed", priority: "Medium", due: "15 Sep 2026", cls: "INTERNAL" },
  { id: "TSK-045", name: "Pipeline anomaly root cause analysis", project: "Pipeline Anomaly Investigation", assignee: "Meena Shetty", agent: "Engineering Agent", status: "In Progress", priority: "Critical", due: "18 Sep 2026", cls: "RESTRICTED" },
  { id: "TSK-046", name: "Reformer catalyst performance trend analysis", project: "Reformer Unit Optimization", assignee: "Suresh Bhat", agent: "Data Analysis Agent", status: "In Progress", priority: "Medium", due: "20 Sep 2026", cls: "CONFIDENTIAL" },
];

const statusColors: Record<string, { bg: string; color: string }> = {
  "In Progress": { bg: "#DBEAFE", color: "#1D4ED8" },
  "Completed": { bg: "#DCFCE7", color: "#15803D" },
  "Pending Approval": { bg: "#FEF3C7", color: "#92400E" },
  "Queued": { bg: "#F1F5F9", color: "#475569" },
};

const priorityColors: Record<string, { bg: string; color: string }> = {
  Critical: { bg: "#FEE2E2", color: "#991B1B" },
  High: { bg: "#FEF3C7", color: "#92400E" },
  Medium: { bg: "#DBEAFE", color: "#1D4ED8" },
  Low: { bg: "#F0FDF4", color: "#15803D" },
};

const clsColors: Record<string, { bg: string; color: string }> = {
  CONFIDENTIAL: { bg: "#FEF3C7", color: "#92400E" },
  INTERNAL: { bg: "#DBEAFE", color: "#1E40AF" },
  RESTRICTED: { bg: "#FEE2E2", color: "#991B1B" },
};

export default function Tasks() {
  return (
    <div className="flex-1 overflow-y-auto" style={{ background: "var(--color-bg-secondary)" }}>
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold" style={{ color: "var(--color-text-primary)" }}>Tasks</h1>
            <p className="text-sm mt-0.5" style={{ color: "var(--color-text-muted)" }}>All tasks across projects — {tasks.length} tasks · 2 pending approval</p>
          </div>
          <button className="text-xs px-4 py-2 rounded font-medium text-white" style={{ background: "var(--color-teal)" }}>+ New Task</button>
        </div>

        <div className="bg-white rounded border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
          <div className="flex items-center gap-3 px-5 py-3 border-b" style={{ borderColor: "var(--color-border)" }}>
            <input type="text" placeholder="Search tasks..." className="flex-1 max-w-xs px-3 py-1.5 text-sm rounded border outline-none" style={{ borderColor: "var(--color-border)", fontSize: 13 }} />
            {["All", "In Progress", "Pending Approval", "Completed"].map((f) => (
              <button key={f} className="text-xs px-3 py-1.5 rounded border font-medium" style={{ borderColor: "var(--color-border)", color: "var(--color-text-secondary)", fontSize: 11 }}>{f}</button>
            ))}
          </div>
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                {["ID", "Task", "Project", "Assignee / Agent", "Priority", "Status", "Due", "Classification"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "var(--color-text-muted)", background: "var(--color-surface-subtle)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, i) => (
                <tr key={task.id} className="hover:bg-slate-50 cursor-pointer transition-colors" style={{ borderBottom: i < tasks.length - 1 ? "1px solid var(--color-border)" : "none" }}>
                  <td className="px-5 py-3 font-mono text-xs" style={{ color: "var(--color-text-muted)" }}>{task.id}</td>
                  <td className="px-5 py-3 max-w-xs">
                    <div className="font-medium text-sm" style={{ color: "var(--color-text-primary)", fontSize: 13 }}>{task.name}</div>
                  </td>
                  <td className="px-5 py-3 text-xs" style={{ color: "var(--color-text-secondary)" }}>{task.project}</td>
                  <td className="px-5 py-3">
                    <div className="text-xs" style={{ color: "var(--color-text-secondary)" }}>{task.assignee}</div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>via {task.agent}</div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-xs px-2 py-0.5 rounded font-medium" style={{ background: priorityColors[task.priority]?.bg, color: priorityColors[task.priority]?.color, fontSize: 10 }}>{task.priority}</span>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-xs px-2 py-0.5 rounded font-medium" style={{ background: statusColors[task.status]?.bg, color: statusColors[task.status]?.color, fontSize: 11 }}>{task.status}</span>
                  </td>
                  <td className="px-5 py-3 text-xs" style={{ color: "var(--color-text-muted)" }}>{task.due}</td>
                  <td className="px-5 py-3">
                    <span className="text-xs px-1.5 py-0.5 rounded font-medium" style={{ background: clsColors[task.cls]?.bg, color: clsColors[task.cls]?.color, fontSize: 10 }}>{task.cls}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
