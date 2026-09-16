import { useState } from "react";
import { useNav } from "../context/NavContext";

const features = [
  { id: 1, name: "RBAC & Access Control", status: "Active", checked: "16 Sep 2026 09:00", policy: "Role-based, least privilege", exceptions: 0, page: "rbac" },
  { id: 2, name: "Tool Permission Control", status: "Active", checked: "16 Sep 2026 09:00", policy: "Per-agent tool whitelisting", exceptions: 0 },
  { id: 3, name: "Human Approval Gate", status: "Active", checked: "16 Sep 2026 08:45", policy: "Required for critical actions", exceptions: 0 },
  { id: 4, name: "Sandbox / VM Isolation", status: "Active", checked: "16 Sep 2026 09:00", policy: "Network disabled, filesystem isolated", exceptions: 0, page: "sandbox" },
  { id: 5, name: "Zero Internet Egress", status: "Active", checked: "16 Sep 2026 09:00", policy: "All external traffic blocked", exceptions: 0 },
  { id: 6, name: "Cilium + Hubble", status: "Active", checked: "16 Sep 2026 08:30", policy: "eBPF network policy enforcement", exceptions: 0, page: "network-security" },
  { id: 7, name: "Encryption at Rest & Transit", status: "Active", checked: "16 Sep 2026 09:00", policy: "AES-256 / TLS 1.3", exceptions: 0 },
  { id: 8, name: "Data Loss Prevention (DLP)", status: "Active", checked: "16 Sep 2026 07:00", policy: "Classification-aware, watermarking", exceptions: 1 },
  { id: 9, name: "Prompt Injection Protection", status: "Active", checked: "16 Sep 2026 09:00", policy: "Input sanitization + LLM guardrails", exceptions: 0 },
  { id: 10, name: "Audit Logging", status: "Active", checked: "16 Sep 2026 09:00", policy: "All actions logged, tamper-proof", exceptions: 0, page: "audit-trail" },
  { id: 11, name: "OpenTelemetry Tracing", status: "Active", checked: "16 Sep 2026 08:00", policy: "Distributed tracing enabled", exceptions: 0 },
  { id: 12, name: "Prometheus + Grafana", status: "Active", checked: "16 Sep 2026 09:00", policy: "Metrics collection and visualization", exceptions: 0 },
  { id: 13, name: "Loki Log Aggregation", status: "Active", checked: "16 Sep 2026 09:00", policy: "Centralized log management", exceptions: 0 },
  { id: 14, name: "Data Classification Engine", status: "Active", checked: "16 Sep 2026 08:00", policy: "Auto-classifies all documents", exceptions: 0 },
  { id: 15, name: "Secure File Processing", status: "Active", checked: "16 Sep 2026 09:00", policy: "Isolated OCR/parsing pipeline", exceptions: 0 },
  { id: 16, name: "Permission-Aware RAG", status: "Active", checked: "16 Sep 2026 09:00", policy: "RBAC enforced at retrieval level", exceptions: 0 },
  { id: 17, name: "Dynamic Watermarking", status: "Active", checked: "16 Sep 2026 08:00", policy: "MRPL CONFIDENTIAL on artifacts", exceptions: 2 },
  { id: 18, name: "Checkpoints & Rollback", status: "Active", checked: "16 Sep 2026 09:00", policy: "Versioned state management", exceptions: 0, page: "sandbox" },
];

export default function SecurityCenter() {
  const { navigate } = useNav();
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: "var(--color-bg-secondary)" }}>
      <div className="max-w-6xl mx-auto px-8 py-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold" style={{ color: "var(--color-text-primary)" }}>Security Center</h1>
            <p className="text-sm mt-0.5" style={{ color: "var(--color-text-muted)" }}>Sovereign security posture — all controls enforced on-premise</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded" style={{ background: "#F0FDF4", border: "1px solid #BBF7D0" }}>
              <span>🟢</span>
              <span className="text-sm font-semibold" style={{ color: "#15803D" }}>All Systems Secure</span>
            </div>
          </div>
        </div>

        {/* Summary KPIs */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: "Controls Active", value: "18/18", color: "var(--color-success)" },
            { label: "Security Exceptions", value: "3", color: "var(--color-warning)" },
            { label: "Audit Events Today", value: "1,847", color: "var(--color-teal)" },
            { label: "Internet Egress", value: "BLOCKED", color: "var(--color-danger)" },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-white rounded border px-5 py-4" style={{ borderColor: "var(--color-border)" }}>
              <div className="text-xs mb-1" style={{ color: "var(--color-text-muted)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>{kpi.label}</div>
              <div className="text-xl font-semibold" style={{ color: kpi.color }}>{kpi.value}</div>
            </div>
          ))}
        </div>

        {/* Controls Table */}
        <div className="bg-white rounded border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
          <div className="px-5 py-3.5 border-b font-semibold text-sm" style={{ borderColor: "var(--color-border)", color: "var(--color-text-primary)" }}>
            Security Controls
          </div>
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                {["#", "Control", "Status", "Last Checked", "Policy", "Exceptions", ""].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "var(--color-text-muted)", background: "var(--color-surface-subtle)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((f, i) => (
                <>
                  <tr
                    key={f.id}
                    className="hover:bg-slate-50 cursor-pointer transition-colors"
                    style={{ borderBottom: "1px solid var(--color-border)" }}
                    onClick={() => setExpanded(expanded === f.id ? null : f.id)}
                  >
                    <td className="px-5 py-3 text-xs" style={{ color: "var(--color-text-muted)" }}>{f.id}</td>
                    <td className="px-5 py-3 font-medium text-sm" style={{ color: "var(--color-text-primary)", fontSize: 13 }}>{f.name}</td>
                    <td className="px-5 py-3">
                      <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "#15803D" }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#15803D" }} />
                        {f.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-xs" style={{ color: "var(--color-text-muted)" }}>{f.checked}</td>
                    <td className="px-5 py-3 text-xs" style={{ color: "var(--color-text-secondary)" }}>{f.policy}</td>
                    <td className="px-5 py-3">
                      {f.exceptions > 0 ? (
                        <span className="text-xs px-1.5 py-0.5 rounded font-medium" style={{ background: "#FEF3C7", color: "#92400E" }}>{f.exceptions} exception{f.exceptions > 1 ? "s" : ""}</span>
                      ) : (
                        <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>None</span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex gap-1">
                        <button
                          className="text-xs px-2 py-1 rounded border hover:bg-slate-100 font-medium"
                          style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)", fontSize: 11 }}
                          onClick={(e) => { e.stopPropagation(); setExpanded(expanded === f.id ? null : f.id); }}
                        >
                          {expanded === f.id ? "▲" : "▼"}
                        </button>
                        {f.page && (
                          <button
                            className="text-xs px-2 py-1 rounded border hover:bg-slate-100 font-medium"
                            style={{ borderColor: "var(--color-border)", color: "var(--color-teal)", fontSize: 11 }}
                            onClick={(e) => { e.stopPropagation(); navigate(f.page as any); }}
                          >
                            Open →
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                  {expanded === f.id && (
                    <tr key={`${f.id}-detail`} style={{ borderBottom: "1px solid var(--color-border)" }}>
                      <td colSpan={7} className="px-5 py-3" style={{ background: "var(--color-surface-subtle)" }}>
                        <div className="grid grid-cols-3 gap-4 text-xs">
                          <div>
                            <div className="font-semibold mb-1" style={{ color: "var(--color-text-secondary)" }}>Configuration</div>
                            <div style={{ color: "var(--color-text-muted)" }}>Policy: {f.policy}</div>
                            <div style={{ color: "var(--color-text-muted)" }}>Last verified: {f.checked}</div>
                          </div>
                          <div>
                            <div className="font-semibold mb-1" style={{ color: "var(--color-text-secondary)" }}>Exceptions</div>
                            {f.exceptions === 0 ? (
                              <div style={{ color: "var(--color-success)" }}>✓ No exceptions</div>
                            ) : (
                              <div style={{ color: "var(--color-warning)" }}>⚠ {f.exceptions} active exception(s) — review required</div>
                            )}
                          </div>
                          <div>
                            <div className="font-semibold mb-1" style={{ color: "var(--color-text-secondary)" }}>Actions</div>
                            <button className="text-xs px-2 py-1 rounded border mr-1" style={{ borderColor: "var(--color-border)", color: "var(--color-teal)" }}>Configure</button>
                            <button className="text-xs px-2 py-1 rounded border" style={{ borderColor: "var(--color-border)", color: "var(--color-text-secondary)" }}>View Logs</button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
