import { useState } from "react";

const notesList = [
  { id: 1, title: "CDU-4 Inspection Observations", preview: "Key findings from the Aug 2026 inspection...", type: "Project", cls: "CONFIDENTIAL", updated: "16 Sep 2026" },
  { id: 2, title: "P-102 Maintenance Action Items", preview: "1. Isolate pump immediately 2. Schedule seal...", type: "Project", cls: "CONFIDENTIAL", updated: "15 Sep 2026" },
  { id: 3, title: "Vendor CX-4 Evaluation Notes", preview: "Initial impressions from technical datasheet...", type: "Shared", cls: "INTERNAL", updated: "12 Sep 2026" },
  { id: 4, title: "Personal — Career Planning 2027", preview: "Targets for next performance cycle...", type: "Personal", cls: "INTERNAL", updated: "10 Sep 2026" },
];

const typeColors: Record<string, { bg: string; color: string }> = {
  Project: { bg: "#F0FDFA", color: "var(--color-teal)" },
  Shared: { bg: "#EFF6FF", color: "var(--color-blue)" },
  Personal: { bg: "#F5F3FF", color: "#7C3AED" },
  Restricted: { bg: "#FEE2E2", color: "#991B1B" },
};

const sampleContent = `## CDU-4 Inspection Observations

### Summary

Inspection conducted 14 Aug 2026 on CDU-4 unit. Two critical deviations identified from SOP requirements.

### Key Findings

1. **P-102 Bearing Vibration** — 8.2 mm/s DE bearing (threshold: 7.1 mm/s)
2. **Mechanical Seal Leakage** — Confirmed at seal housing, maintenance overdue by 8 days
3. **Tray Corrosion** — Progressive deterioration on trays 14–18, consistent with 2024/2025 records

### Recommended Actions

- [ ] Initiate emergency work order for P-102 isolation
- [ ] Schedule mechanical seal replacement
- [ ] Commission tray inspection for corrosion assessment
- [x] Upload inspection report to CDU-4 project knowledge base
- [x] Brief HSE officer on deviations

### References

- Inspection Report Aug 2026
- SOP P-102 Rev 3.2
- Historical Maintenance Record 2024–2025`;

export default function Notes() {
  const [activeNote, setActiveNote] = useState(1);
  const [filter, setFilter] = useState("All");

  const filtered = notesList.filter((n) => filter === "All" || n.type === filter);

  return (
    <div className="flex h-full" style={{ background: "#F7F9FC" }}>
      {/* Sidebar */}
      <div className="w-72 border-r bg-white flex-shrink-0 flex flex-col" style={{ borderColor: "var(--color-border)" }}>
        <div className="px-5 py-4 border-b" style={{ borderColor: "var(--color-border)" }}>
          <div className="flex items-center justify-between mb-3">
            <h1 className="font-semibold text-sm" style={{ color: "var(--color-text-primary)" }}>Notes</h1>
            <button className="text-xs px-3 py-1.5 rounded font-medium text-white" style={{ background: "var(--color-teal)", fontSize: 11 }}>+ New Note</button>
          </div>
          <div className="flex gap-1">
            {["All", "Project", "Shared", "Personal"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="flex-1 text-xs py-1 rounded transition-colors font-medium"
                style={{
                  background: filter === f ? "var(--color-teal)" : "transparent",
                  color: filter === f ? "white" : "var(--color-text-muted)",
                  fontSize: 11,
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filtered.map((note) => (
            <button
              key={note.id}
              onClick={() => setActiveNote(note.id)}
              className="w-full text-left px-4 py-4 border-b hover:bg-slate-50 transition-colors"
              style={{
                borderColor: "var(--color-border)",
                background: activeNote === note.id ? "#F0FDFA" : "transparent",
                borderRight: activeNote === note.id ? "2px solid var(--color-teal)" : "2px solid transparent",
              }}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <span className="font-medium text-sm" style={{ color: "var(--color-text-primary)", fontSize: 13 }}>{note.title}</span>
              </div>
              <div className="text-xs truncate mb-2" style={{ color: "var(--color-text-muted)" }}>{note.preview}</div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-1.5 py-0.5 rounded font-medium" style={{ background: typeColors[note.type].bg, color: typeColors[note.type].color, fontSize: 10 }}>{note.type}</span>
                <span className="text-xs" style={{ color: "var(--color-text-muted)", fontSize: 11 }}>{note.updated}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="bg-white border-b px-5 py-2.5 flex items-center gap-2 flex-shrink-0" style={{ borderColor: "var(--color-border)" }}>
          <div className="flex items-center gap-1 border-r pr-2 mr-1" style={{ borderColor: "var(--color-border)" }}>
            {["H1", "H2", "B", "I", "≡", "☑"].map((btn) => (
              <button key={btn} className="w-7 h-7 flex items-center justify-center rounded text-xs font-bold hover:bg-slate-100" style={{ color: "var(--color-text-secondary)" }}>{btn}</button>
            ))}
          </div>
          <div className="flex items-center gap-1 border-r pr-2 mr-1" style={{ borderColor: "var(--color-border)" }}>
            {["⊞ Table", "⌨ Code", "⬡ Callout"].map((btn) => (
              <button key={btn} className="text-xs px-2 py-1 rounded hover:bg-slate-100" style={{ color: "var(--color-text-secondary)" }}>{btn}</button>
            ))}
          </div>
          {/* AI actions */}
          <div className="flex items-center gap-1">
            {["AI Summarize", "AI Rewrite", "Extract Actions", "→ Task", "→ Report"].map((btn) => (
              <button key={btn} className="text-xs px-2.5 py-1 rounded font-medium hover:bg-teal-50 transition-colors" style={{ color: "var(--color-teal)", border: "1px solid #CCFBF1", fontSize: 11 }}>
                ✦ {btn}
              </button>
            ))}
          </div>
          <div className="ml-auto flex gap-2">
            <button className="text-xs px-3 py-1.5 rounded border" style={{ borderColor: "var(--color-border)", color: "var(--color-text-secondary)" }}>Share</button>
            <button className="text-xs px-3 py-1.5 rounded font-medium text-white" style={{ background: "var(--color-teal)" }}>Save</button>
          </div>
        </div>

        {/* Note Content */}
        <div className="flex-1 overflow-y-auto px-12 py-8" style={{ background: "white" }}>
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs px-2 py-1 rounded font-medium" style={{ background: "#F0FDFA", color: "var(--color-teal)" }}>Project</span>
              <span className="text-xs px-2 py-1 rounded font-medium" style={{ background: "#FEF3C7", color: "#92400E" }}>🔒 CONFIDENTIAL</span>
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>Updated 16 Sep 2026</span>
            </div>
            <div
              className="prose prose-sm max-w-none"
              style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-sans)" }}
            >
              {sampleContent.split("\n").map((line, i) => {
                if (line.startsWith("## ")) return <h2 key={i} className="text-xl font-semibold mt-6 mb-3" style={{ color: "var(--color-text-primary)" }}>{line.slice(3)}</h2>;
                if (line.startsWith("### ")) return <h3 key={i} className="text-base font-semibold mt-4 mb-2" style={{ color: "var(--color-text-primary)" }}>{line.slice(4)}</h3>;
                if (line.startsWith("- [x] ")) return <div key={i} className="flex items-start gap-2 py-0.5"><span className="mt-0.5 text-xs" style={{ color: "var(--color-success)" }}>☑</span><span className="text-sm line-through" style={{ color: "var(--color-text-muted)" }}>{line.slice(6)}</span></div>;
                if (line.startsWith("- [ ] ")) return <div key={i} className="flex items-start gap-2 py-0.5"><span className="mt-0.5 text-xs" style={{ color: "var(--color-text-muted)" }}>☐</span><span className="text-sm" style={{ color: "var(--color-text-secondary)" }}>{line.slice(6)}</span></div>;
                if (line.startsWith("- ")) return <div key={i} className="flex items-start gap-2 py-0.5"><span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: "var(--color-text-muted)" }} /><span className="text-sm" style={{ color: "var(--color-text-secondary)" }}>{line.slice(2)}</span></div>;
                if (line.match(/^\d\./)) return <div key={i} className="py-0.5 text-sm" style={{ color: "var(--color-text-secondary)" }}>{line}</div>;
                if (line === "") return <div key={i} className="h-2" />;
                if (line.startsWith("**") && line.endsWith("**")) {
                  const content = line.replace(/\*\*/g, "");
                  const parts = line.split("**");
                  return (
                    <p key={i} className="text-sm py-0.5" style={{ color: "var(--color-text-secondary)" }}>
                      {parts.map((p, j) => j % 2 === 1 ? <strong key={j} style={{ color: "var(--color-text-primary)" }}>{p}</strong> : p)}
                    </p>
                  );
                }
                return <p key={i} className="text-sm py-0.5" style={{ color: "var(--color-text-secondary)" }}>{line}</p>;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
