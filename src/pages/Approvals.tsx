import { useState } from "react";

const approvals = [
  {
    id: "APR-2024-001",
    task: "Generate CDU-4 management approval note",
    requestedBy: "Document Agent",
    project: "CDU-4 Inspection Analysis",
    risk: "Medium",
    evidence: 4,
    status: "Pending",
    requestedAt: "16 Sep 2026 14:22",
    description: "AI has prepared a management approval note based on the inspection findings. The note highlights 2 critical deviations from SOP and recommends immediate maintenance action.",
    cls: "CONFIDENTIAL",
  },
  {
    id: "APR-2024-002",
    task: "Execute SQL update on maintenance schedule table",
    requestedBy: "Data Analysis Agent",
    project: "CDU-4 Inspection Analysis",
    risk: "High",
    evidence: 2,
    status: "Pending",
    requestedAt: "16 Sep 2026 13:45",
    description: "Agent requests permission to update maintenance schedule database entries based on inspection findings.",
    cls: "INTERNAL",
  },
  {
    id: "APR-2024-003",
    task: "Share analysis report with external contractor",
    requestedBy: "Anita Rao",
    project: "Vendor Technical Evaluation",
    risk: "High",
    evidence: 1,
    status: "Rejected",
    requestedAt: "15 Sep 2026 10:30",
    description: "Request to share MRPL internal evaluation data with third-party contractor.",
    cls: "CONFIDENTIAL",
  },
  {
    id: "APR-2024-004",
    task: "Generate pipeline anomaly report with sensor data",
    requestedBy: "Engineering Agent",
    project: "Pipeline Anomaly Investigation",
    risk: "Low",
    evidence: 6,
    status: "Approved",
    requestedAt: "14 Sep 2026 16:00",
    description: "AI-generated report based on sensor data and historical inspection records.",
    cls: "RESTRICTED",
  },
];

const riskColors: Record<string, { bg: string; color: string }> = {
  Low: { bg: "#DCFCE7", color: "#15803D" },
  Medium: { bg: "#FEF3C7", color: "#92400E" },
  High: { bg: "#FEE2E2", color: "#991B1B" },
  Critical: { bg: "#450A0A", color: "#FCA5A5" },
};

const statusColors: Record<string, { bg: string; color: string }> = {
  Pending: { bg: "#FEF3C7", color: "#92400E" },
  Approved: { bg: "#DCFCE7", color: "#15803D" },
  Rejected: { bg: "#FEE2E2", color: "#991B1B" },
  Expired: { bg: "#F1F5F9", color: "#475569" },
};

export default function Approvals() {
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState<string | null>("APR-2024-001");

  const filtered = approvals.filter((a) => filter === "All" || a.status === filter);

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: "var(--color-bg-secondary)" }}>
      <div className="max-w-5xl mx-auto px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold" style={{ color: "var(--color-text-primary)" }}>Approval Center</h1>
            <p className="text-sm mt-0.5" style={{ color: "var(--color-text-muted)" }}>Human oversight for sensitive AI actions</p>
          </div>
          <span className="text-sm font-semibold px-3 py-1.5 rounded" style={{ background: "#FEF3C7", color: "#92400E" }}>
            2 pending
          </span>
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-5">
          {["All", "Pending", "Approved", "Rejected", "Expired"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="text-xs px-3 py-1.5 rounded border font-medium transition-colors"
              style={{
                borderColor: filter === f ? "var(--color-teal)" : "var(--color-border)",
                background: filter === f ? "#F0FDFA" : "white",
                color: filter === f ? "var(--color-teal)" : "var(--color-text-secondary)",
                fontSize: 12,
              }}
            >
              {f} {f === "Pending" ? "(2)" : ""}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((a) => (
            <div
              key={a.id}
              className="bg-white rounded border overflow-hidden"
              style={{ borderColor: a.status === "Pending" ? "var(--color-warning)" : "var(--color-border)", borderWidth: a.status === "Pending" ? 1.5 : 1 }}
            >
              <div
                className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-slate-50"
                onClick={() => setExpanded(expanded === a.id ? null : a.id)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm" style={{ color: "var(--color-text-primary)" }}>{a.task}</span>
                    <span className="text-xs px-1.5 py-0.5 rounded font-medium" style={{ background: "#FEF3C7", color: "#92400E", fontSize: 10 }}>🔒 {a.cls}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>Requested by: <strong style={{ color: "var(--color-text-secondary)" }}>{a.requestedBy}</strong></span>
                    <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>Project: {a.project}</span>
                    <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>{a.requestedAt}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-xs px-2 py-0.5 rounded font-medium" style={{ background: riskColors[a.risk].bg, color: riskColors[a.risk].color, fontSize: 11 }}>
                    Risk: {a.risk}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded font-medium" style={{ background: statusColors[a.status].bg, color: statusColors[a.status].color, fontSize: 11 }}>
                    {a.status}
                  </span>
                  <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>{a.evidence} sources</span>
                  <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>{expanded === a.id ? "▲" : "▼"}</span>
                </div>
              </div>

              {expanded === a.id && (
                <div className="border-t px-5 py-4" style={{ borderColor: "var(--color-border)", background: "var(--color-surface-subtle)" }}>
                  <p className="text-sm mb-4" style={{ color: "var(--color-text-secondary)", fontSize: 13 }}>{a.description}</p>

                  {/* Evidence sources */}
                  <div className="mb-4">
                    <div className="text-xs font-semibold mb-2" style={{ color: "var(--color-text-muted)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>Evidence Sources</div>
                    <div className="flex flex-wrap gap-2">
                      {["Inspection Report 2026", "SOP P-102 Rev 3.2", "Sensor Data Aug 2026", "Historical Maintenance Record"].slice(0, a.evidence).map((ev) => (
                        <span key={ev} className="text-xs px-2 py-1 rounded border" style={{ borderColor: "var(--color-border)", color: "var(--color-text-secondary)", background: "white", fontSize: 11 }}>
                          📄 {ev}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Verification Status */}
                  <div className="mb-4">
                    <div className="text-xs font-semibold mb-2" style={{ color: "var(--color-text-muted)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>Verification</div>
                    <div className="flex gap-4">
                      {[
                        { label: "Evidence Found", ok: true },
                        { label: "Permission Valid", ok: true },
                        { label: "Calculation Verified", ok: true },
                        { label: "No Conflicts", ok: a.evidence < 3 },
                      ].map((v) => (
                        <div key={v.label} className="flex items-center gap-1.5 text-xs" style={{ color: v.ok ? "var(--color-success)" : "var(--color-warning)" }}>
                          <span>{v.ok ? "✓" : "⚠"}</span>
                          <span>{v.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {a.status === "Pending" && (
                    <div className="flex gap-2">
                      <button className="px-4 py-2 rounded text-sm font-medium text-white" style={{ background: "var(--color-success)" }}>
                        ✓ Approve
                      </button>
                      <button className="px-4 py-2 rounded text-sm font-medium text-white" style={{ background: "var(--color-danger)" }}>
                        ✕ Reject
                      </button>
                      <button className="px-4 py-2 rounded text-sm font-medium border" style={{ borderColor: "var(--color-border)", color: "var(--color-text-secondary)" }}>
                        Request Changes
                      </button>
                      <button className="px-4 py-2 rounded text-sm font-medium border" style={{ borderColor: "var(--color-border)", color: "var(--color-info)" }}>
                        View Evidence
                      </button>
                    </div>
                  )}
                  {a.status !== "Pending" && (
                    <div className="text-xs px-3 py-2 rounded" style={{ background: statusColors[a.status].bg, color: statusColors[a.status].color }}>
                      {a.status === "Approved" ? "✓ Approved by authorized approver" : "✕ Rejected — see audit trail for details"}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
