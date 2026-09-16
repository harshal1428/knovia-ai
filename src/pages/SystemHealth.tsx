const services = [
  { name: "API Gateway", status: "Operational", latency: "12ms", requests: "4,241/hr", errors: "0", uptime: "99.99%", queue: 0 },
  { name: "PostgreSQL", status: "Operational", latency: "3ms", requests: "12,841/hr", errors: "0", uptime: "99.99%", queue: 0 },
  { name: "Vector Database (pgvector)", status: "Operational", latency: "18ms", requests: "2,104/hr", errors: "0", uptime: "99.97%", queue: 0 },
  { name: "Model Server (Ollama)", status: "Operational", latency: "2.4s avg", requests: "847/hr", errors: "0", uptime: "99.95%", queue: 2 },
  { name: "OCR Engine (Tesseract)", status: "Operational", latency: "1.2s avg", requests: "312/hr", errors: "1", uptime: "99.8%", queue: 0 },
  { name: "Vision Model (LLaVA)", status: "Operational", latency: "3.1s avg", requests: "94/hr", errors: "0", uptime: "99.9%", queue: 0 },
  { name: "Embedding Service (BGE-M3)", status: "Operational", latency: "45ms avg", requests: "3,241/hr", errors: "0", uptime: "99.99%", queue: 0 },
  { name: "Sandbox Runner", status: "Operational", latency: "800ms avg", requests: "67/hr", errors: "0", uptime: "99.9%", queue: 1 },
  { name: "GPU Scheduler", status: "Operational", latency: "2ms", requests: "1,024/hr", errors: "0", uptime: "99.99%", queue: 0 },
  { name: "Plugin Runtime", status: "Operational", latency: "120ms avg", requests: "441/hr", errors: "0", uptime: "99.8%", queue: 0 },
];

export default function SystemHealth() {
  const operational = services.filter((s) => s.status === "Operational").length;

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: "var(--color-bg-secondary)" }}>
      <div className="max-w-6xl mx-auto px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold" style={{ color: "var(--color-text-primary)" }}>System Health</h1>
            <p className="text-sm mt-0.5" style={{ color: "var(--color-text-muted)" }}>All services monitored on-premise · 16 Sep 2026 14:40</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded" style={{ background: "#F0FDF4", border: "1px solid #BBF7D0" }}>
              <span>🟢</span>
              <span className="text-sm font-semibold" style={{ color: "#15803D" }}>{operational}/{services.length} Operational</span>
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Requests (Today)", value: "24,215", color: "var(--color-teal)" },
            { label: "Error Rate", value: "0.004%", color: "var(--color-success)" },
            { label: "P95 Latency", value: "2.8s", color: "var(--color-blue)" },
            { label: "System Uptime", value: "99.97%", color: "var(--color-success)" },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-white rounded border px-5 py-4" style={{ borderColor: "var(--color-border)" }}>
              <div className="text-xs mb-1" style={{ color: "var(--color-text-muted)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>{kpi.label}</div>
              <div className="text-xl font-semibold" style={{ color: kpi.color }}>{kpi.value}</div>
            </div>
          ))}
        </div>

        {/* Services Table */}
        <div className="bg-white rounded border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
          <div className="px-5 py-3.5 border-b font-semibold text-sm" style={{ borderColor: "var(--color-border)", color: "var(--color-text-primary)" }}>Service Status</div>
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                {["Service", "Status", "Latency", "Requests/hr", "Errors", "Uptime", "Queue"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "var(--color-text-muted)", background: "var(--color-surface-subtle)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {services.map((svc, i) => (
                <tr key={svc.name} className="hover:bg-slate-50" style={{ borderBottom: i < services.length - 1 ? "1px solid var(--color-border)" : "none" }}>
                  <td className="px-5 py-3 font-medium text-sm" style={{ color: "var(--color-text-primary)", fontSize: 13 }}>{svc.name}</td>
                  <td className="px-5 py-3">
                    <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "#15803D" }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#15803D" }} />
                      {svc.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs font-mono" style={{ color: "var(--color-text-secondary)" }}>{svc.latency}</td>
                  <td className="px-5 py-3 text-xs" style={{ color: "var(--color-text-secondary)" }}>{svc.requests}</td>
                  <td className="px-5 py-3 text-xs" style={{ color: parseInt(svc.errors) > 0 ? "var(--color-danger)" : "var(--color-text-muted)" }}>
                    {svc.errors}
                  </td>
                  <td className="px-5 py-3 text-xs font-medium" style={{ color: "var(--color-success)" }}>{svc.uptime}</td>
                  <td className="px-5 py-3 text-xs" style={{ color: svc.queue > 0 ? "var(--color-warning)" : "var(--color-text-muted)" }}>
                    {svc.queue} waiting
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
