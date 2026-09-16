import { useState } from "react";

const artifacts = [
  { name: "CDU-4 Management Approval Note", type: "Word", project: "CDU-4 Inspection Analysis", status: "Pending Review", generated: "16 Sep 2026 14:30", cls: "CONFIDENTIAL", template: "Approval Note v2.1", size: "128 KB" },
  { name: "P-102 Inspection Analysis Report", type: "PDF", project: "CDU-4 Inspection Analysis", status: "Verified", generated: "15 Sep 2026 10:00", cls: "CONFIDENTIAL", template: "Inspection Report v3.0", size: "2.4 MB" },
  { name: "Vendor CX-4 Technical Evaluation", type: "Excel", project: "Vendor Technical Evaluation", status: "Completed", generated: "14 Sep 2026 16:45", cls: "INTERNAL", template: "Technical Evaluation v1.0", size: "584 KB" },
  { name: "Pipeline Risk Assessment Q3 2026", type: "PowerPoint", project: "Pipeline Anomaly Investigation", status: "Completed", generated: "13 Sep 2026 09:30", cls: "RESTRICTED", template: "Management Presentation v2.0", size: "3.1 MB" },
  { name: "CDU-4 Analysis Code — vibration.py", type: "Code", project: "CDU-4 Inspection Analysis", status: "Verified", generated: "16 Sep 2026 12:00", cls: "CONFIDENTIAL", template: "—", size: "12 KB" },
];

const typeIcons: Record<string, string> = {
  Word: "◧",
  PDF: "◪",
  Excel: "⬡",
  PowerPoint: "△",
  Code: "⌨",
  "Engineering Drawing": "⊡",
};

const typeColors: Record<string, { bg: string; color: string }> = {
  Word: { bg: "#DBEAFE", color: "#1D4ED8" },
  PDF: { bg: "#FEE2E2", color: "#991B1B" },
  Excel: { bg: "#DCFCE7", color: "#15803D" },
  PowerPoint: { bg: "#FEF3C7", color: "#92400E" },
  Code: { bg: "#F0FDFA", color: "var(--color-teal)" },
  "Engineering Drawing": { bg: "#F5F3FF", color: "#7C3AED" },
};

const statusColors: Record<string, { bg: string; color: string }> = {
  "Pending Review": { bg: "#FEF3C7", color: "#92400E" },
  Verified: { bg: "#DCFCE7", color: "#15803D" },
  Completed: { bg: "#DCFCE7", color: "#15803D" },
};

const clsColors: Record<string, { bg: string; color: string }> = {
  CONFIDENTIAL: { bg: "#FEF3C7", color: "#92400E" },
  INTERNAL: { bg: "#DBEAFE", color: "#1E40AF" },
  RESTRICTED: { bg: "#FEE2E2", color: "#991B1B" },
};

const pipeline = ["Approved Template", "AI Generation", "Validation", "Human Review", "Final Artifact"];

export default function Artifacts() {
  const [filter, setFilter] = useState("All");

  const filtered = artifacts.filter((a) => filter === "All" || a.type === filter);

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: "var(--color-bg-secondary)" }}>
      <div className="max-w-6xl mx-auto px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold" style={{ color: "var(--color-text-primary)" }}>Artifacts</h1>
            <p className="text-sm mt-0.5" style={{ color: "var(--color-text-muted)" }}>AI-generated outputs — all artifacts use approved templates and require human review</p>
          </div>
          <button className="text-xs px-4 py-2 rounded font-medium text-white" style={{ background: "var(--color-teal)" }}>+ Generate Artifact</button>
        </div>

        {/* Generation Pipeline */}
        <div className="bg-white rounded border p-5 mb-6" style={{ borderColor: "var(--color-border)" }}>
          <div className="font-semibold text-sm mb-3" style={{ color: "var(--color-text-primary)" }}>Generation Pipeline</div>
          <div className="flex items-center gap-3">
            {pipeline.map((step, i) => (
              <div key={step} className="flex items-center gap-3 flex-1">
                <div className="flex-1 px-3 py-2 rounded text-xs font-medium text-center" style={{ background: "var(--color-surface-subtle)", border: "1px solid var(--color-border)", color: "var(--color-text-secondary)" }}>
                  {step}
                </div>
                {i < pipeline.length - 1 && <span style={{ color: "var(--color-text-muted)" }}>→</span>}
              </div>
            ))}
          </div>
          <div className="mt-3 text-xs px-3 py-2 rounded" style={{ background: "#FEF3C7", border: "1px solid #FDE68A", color: "#92400E" }}>
            ⚠ All AI-generated artifacts require human review before use. Content must be verified against source evidence.
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-5">
          {["All", "Word", "PDF", "Excel", "PowerPoint", "Code"].map((f) => (
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
              {f}
            </button>
          ))}
        </div>

        {/* Artifacts Table */}
        <div className="bg-white rounded border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                {["Type", "Name", "Project", "Template", "Status", "Generated", "Size", "Classification", ""].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "var(--color-text-muted)", background: "var(--color-surface-subtle)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((a, i) => (
                <tr key={i} className="hover:bg-slate-50 cursor-pointer transition-colors" style={{ borderBottom: i < filtered.length - 1 ? "1px solid var(--color-border)" : "none" }}>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className="text-base" style={{ color: typeColors[a.type]?.color }}>{typeIcons[a.type]}</span>
                      <span className="text-xs px-1.5 py-0.5 rounded font-medium" style={{ background: typeColors[a.type]?.bg, color: typeColors[a.type]?.color, fontSize: 10 }}>{a.type}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 font-medium text-sm" style={{ color: "var(--color-text-primary)", fontSize: 13 }}>{a.name}</td>
                  <td className="px-5 py-3.5 text-xs" style={{ color: "var(--color-text-secondary)" }}>{a.project}</td>
                  <td className="px-5 py-3.5 text-xs" style={{ color: "var(--color-text-muted)" }}>{a.template}</td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs px-2 py-0.5 rounded font-medium" style={{ background: statusColors[a.status]?.bg, color: statusColors[a.status]?.color, fontSize: 11 }}>{a.status}</span>
                  </td>
                  <td className="px-5 py-3.5 text-xs" style={{ color: "var(--color-text-muted)" }}>{a.generated}</td>
                  <td className="px-5 py-3.5 text-xs" style={{ color: "var(--color-text-muted)" }}>{a.size}</td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs px-1.5 py-0.5 rounded font-medium" style={{ background: clsColors[a.cls]?.bg, color: clsColors[a.cls]?.color, fontSize: 10 }}>{a.cls}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-1">
                      <button className="text-xs px-2 py-1 rounded border hover:bg-slate-100 font-medium" style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)", fontSize: 11 }}>View</button>
                      <button className="text-xs px-2 py-1 rounded border hover:bg-slate-100 font-medium" style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)", fontSize: 11 }}>↓</button>
                    </div>
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
