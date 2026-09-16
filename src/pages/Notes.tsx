import { useState } from "react";
import { Plus, Folder, Users, User, ShieldAlert, Bold, Italic, List, CheckSquare, Table as TableIcon, Code, MessageSquare, Sparkles, Share2, Save, Lock, PenLine } from "lucide-react";

const notesList = [
  { id: 1, title: "CDU-4 Inspection Observations", preview: "Key findings from the Aug 2026 inspection...", type: "Project", cls: "CONFIDENTIAL", updated: "16 Sep 2026" },
  { id: 2, title: "P-102 Maintenance Action Items", preview: "1. Isolate pump immediately 2. Schedule seal...", type: "Project", cls: "CONFIDENTIAL", updated: "15 Sep 2026" },
  { id: 3, title: "Vendor CX-4 Evaluation Notes", preview: "Initial impressions from technical datasheet...", type: "Shared", cls: "INTERNAL", updated: "12 Sep 2026" },
  { id: 4, title: "Personal — Career Planning 2027", preview: "Targets for next performance cycle...", type: "Personal", cls: "INTERNAL", updated: "10 Sep 2026" },
];

const typeColors: Record<string, { bg: string; color: string; icon: any }> = {
  Project: { bg: "bg-teal-100", color: "text-teal-700", icon: Folder },
  Shared: { bg: "bg-blue-100", color: "text-blue-700", icon: Users },
  Personal: { bg: "bg-purple-100", color: "text-purple-700", icon: User },
  Restricted: { bg: "bg-rose-100", color: "text-rose-700", icon: ShieldAlert },
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
    <div className="flex h-full bg-slate-50">
      {/* Sidebar */}
      <div className="w-80 border-r border-slate-200 bg-white flex-shrink-0 flex flex-col">
        <div className="px-5 py-5 border-b border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg font-bold tracking-tight text-slate-900">Notes</h1>
            <button className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg font-semibold text-white bg-teal-600 hover:bg-teal-700 shadow-sm transition-all active:scale-95">
              <Plus className="w-3.5 h-3.5" /> New Note
            </button>
          </div>
          <div className="flex gap-1 bg-slate-100/80 p-1 rounded-lg">
            {["All", "Project", "Shared", "Personal"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-1 text-[11px] py-1.5 rounded-md transition-all font-semibold ${
                  filter === f
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
          {filtered.map((note) => {
            const Icon = typeColors[note.type]?.icon || PenLine;
            return (
              <button
                key={note.id}
                onClick={() => setActiveNote(note.id)}
                className={`w-full text-left px-5 py-4 transition-all relative ${
                  activeNote === note.id ? "bg-teal-50/50" : "hover:bg-slate-50"
                }`}
              >
                {activeNote === note.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal-500"></div>
                )}
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <span className={`font-semibold text-sm line-clamp-1 ${activeNote === note.id ? "text-teal-900" : "text-slate-900"}`}>
                    {note.title}
                  </span>
                </div>
                <div className="text-xs line-clamp-2 mb-3 text-slate-500 leading-relaxed">
                  {note.preview}
                </div>
                <div className="flex items-center justify-between">
                  <span className={`flex items-center gap-1 text-[10px] px-2 py-1 rounded-md font-bold ${typeColors[note.type]?.bg} ${typeColors[note.type]?.color}`}>
                    <Icon className="w-3 h-3" /> {note.type}
                  </span>
                  <span className="text-[11px] font-medium text-slate-400">{note.updated}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white">
        {/* Toolbar */}
        <div className="border-b border-slate-200 px-6 py-3 flex flex-wrap items-center gap-4 flex-shrink-0 bg-white">
          <div className="flex items-center gap-1 border-r border-slate-200 pr-4">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors" title="Heading 1"><span className="font-bold text-xs">H1</span></button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors" title="Heading 2"><span className="font-bold text-xs">H2</span></button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors" title="Bold"><Bold className="w-4 h-4" /></button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors" title="Italic"><Italic className="w-4 h-4" /></button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors" title="List"><List className="w-4 h-4" /></button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors" title="Checklist"><CheckSquare className="w-4 h-4" /></button>
          </div>
          <div className="flex items-center gap-1 border-r border-slate-200 pr-4">
            <button className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"><TableIcon className="w-3.5 h-3.5" /> Table</button>
            <button className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"><Code className="w-3.5 h-3.5" /> Code</button>
            <button className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"><MessageSquare className="w-3.5 h-3.5" /> Callout</button>
          </div>
          {/* AI actions */}
          <div className="flex items-center gap-2 flex-wrap">
            {["Summarize", "Rewrite", "Extract Actions", "→ Task", "→ Report"].map((btn) => (
              <button key={btn} className="flex items-center gap-1.5 text-[11px] px-3 py-1.5 rounded-full font-bold text-teal-700 bg-teal-50 border border-teal-200 hover:bg-teal-100 transition-colors shadow-sm">
                <Sparkles className="w-3 h-3 text-teal-500" /> {btn}
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button className="flex items-center gap-2 text-xs px-4 py-2 rounded-lg font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-colors shadow-sm">
              <Share2 className="w-3.5 h-3.5" /> Share
            </button>
            <button className="flex items-center gap-2 text-xs px-4 py-2 rounded-lg font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-all shadow-sm active:scale-95">
              <Save className="w-3.5 h-3.5" /> Save
            </button>
          </div>
        </div>

        {/* Note Content */}
        <div className="flex-1 overflow-y-auto px-8 sm:px-16 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span className="flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-md font-bold bg-teal-100 text-teal-800 uppercase tracking-wider">
                <Folder className="w-3 h-3" /> Project
              </span>
              <span className="flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-md font-bold bg-amber-100 text-amber-800 border border-amber-200 uppercase tracking-wider">
                <Lock className="w-3 h-3" /> CONFIDENTIAL
              </span>
              <span className="text-xs font-medium text-slate-400">Updated 16 Sep 2026</span>
            </div>
            <div className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-p:text-slate-700 prose-strong:text-slate-900 prose-a:text-teal-600 prose-li:text-slate-700">
              {sampleContent.split("\n").map((line, i) => {
                if (line.startsWith("## ")) return <h2 key={i} className="text-2xl font-bold mt-8 mb-4 tracking-tight">{line.slice(3)}</h2>;
                if (line.startsWith("### ")) return <h3 key={i} className="text-lg font-semibold mt-6 mb-3">{line.slice(4)}</h3>;
                if (line.startsWith("- [x] ")) return <div key={i} className="flex items-start gap-3 py-1 group"><CheckSquare className="mt-0.5 w-4 h-4 text-teal-600 flex-shrink-0" /><span className="text-sm line-through text-slate-400 group-hover:text-slate-500 transition-colors">{line.slice(6)}</span></div>;
                if (line.startsWith("- [ ] ")) return <div key={i} className="flex items-start gap-3 py-1 group"><div className="mt-0.5 w-4 h-4 border-2 border-slate-300 rounded flex-shrink-0 group-hover:border-teal-500 transition-colors" /><span className="text-sm text-slate-700 group-hover:text-slate-900 transition-colors">{line.slice(6)}</span></div>;
                if (line.startsWith("- ")) return <div key={i} className="flex items-start gap-3 py-1"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" /><span className="text-sm text-slate-700">{line.slice(2)}</span></div>;
                if (line.match(/^\d\./)) return <div key={i} className="py-1 text-sm font-medium text-slate-700 pl-1">{line}</div>;
                if (line === "") return <div key={i} className="h-4" />;
                if (line.startsWith("**") && line.endsWith("**")) {
                  const parts = line.split("**");
                  return (
                    <p key={i} className="text-sm py-1 text-slate-700 leading-relaxed">
                      {parts.map((p, j) => j % 2 === 1 ? <strong key={j} className="font-semibold text-slate-900">{p}</strong> : p)}
                    </p>
                  );
                }
                return <p key={i} className="text-sm py-1 text-slate-700 leading-relaxed">{line}</p>;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
