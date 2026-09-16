import { useState } from "react";
import { FileText, FileSpreadsheet, MonitorPlay, Code, FileLock2, ShieldAlert, Download, Eye, Plus, ArrowRight, CheckCircle2, Clock } from "lucide-react";

const artifacts = [
  { name: "CDU-4 Management Approval Note", type: "Word", project: "CDU-4 Inspection Analysis", status: "Pending Review", generated: "16 Sep 2026 14:30", cls: "CONFIDENTIAL", template: "Approval Note v2.1", size: "128 KB" },
  { name: "P-102 Inspection Analysis Report", type: "PDF", project: "CDU-4 Inspection Analysis", status: "Verified", generated: "15 Sep 2026 10:00", cls: "CONFIDENTIAL", template: "Inspection Report v3.0", size: "2.4 MB" },
  { name: "Vendor CX-4 Technical Evaluation", type: "Excel", project: "Vendor Technical Evaluation", status: "Completed", generated: "14 Sep 2026 16:45", cls: "INTERNAL", template: "Technical Evaluation v1.0", size: "584 KB" },
  { name: "Pipeline Risk Assessment Q3 2026", type: "PowerPoint", project: "Pipeline Anomaly Investigation", status: "Completed", generated: "13 Sep 2026 09:30", cls: "RESTRICTED", template: "Management Presentation v2.0", size: "3.1 MB" },
  { name: "CDU-4 Analysis Code — vibration.py", type: "Code", project: "CDU-4 Inspection Analysis", status: "Verified", generated: "16 Sep 2026 12:00", cls: "CONFIDENTIAL", template: "—", size: "12 KB" },
];

const typeIcons: Record<string, any> = {
  Word: FileText,
  PDF: FileText,
  Excel: FileSpreadsheet,
  PowerPoint: MonitorPlay,
  Code: Code,
  "Engineering Drawing": FileText,
};

const typeColors: Record<string, { bg: string; color: string }> = {
  Word: { bg: "bg-blue-100", color: "text-blue-700" },
  PDF: { bg: "bg-rose-100", color: "text-rose-700" },
  Excel: { bg: "bg-emerald-100", color: "text-emerald-700" },
  PowerPoint: { bg: "bg-amber-100", color: "text-amber-700" },
  Code: { bg: "bg-teal-100", color: "text-teal-700" },
  "Engineering Drawing": { bg: "bg-indigo-100", color: "text-indigo-700" },
};

const statusColors: Record<string, { bg: string; color: string; icon: any }> = {
  "Pending Review": { bg: "bg-amber-100", color: "text-amber-800", icon: Clock },
  Verified: { bg: "bg-emerald-100", color: "text-emerald-800", icon: CheckCircle2 },
  Completed: { bg: "bg-emerald-100", color: "text-emerald-800", icon: CheckCircle2 },
};

const clsColors: Record<string, { bg: string; color: string }> = {
  CONFIDENTIAL: { bg: "bg-amber-100", color: "text-amber-800" },
  INTERNAL: { bg: "bg-blue-100", color: "text-blue-800" },
  RESTRICTED: { bg: "bg-rose-100", color: "text-rose-800" },
};

const pipeline = ["Approved Template", "AI Generation", "Validation", "Human Review", "Final Artifact"];

export default function Artifacts() {
  const [filter, setFilter] = useState("All");

  const filtered = artifacts.filter((a) => filter === "All" || a.type === filter);

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      <div className="max-w-6xl mx-auto px-8 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Artifacts</h1>
            <p className="text-sm mt-1 text-slate-500">AI-generated outputs — all artifacts use approved templates and require human review</p>
          </div>
          <button className="flex items-center gap-2 text-sm px-5 py-2.5 rounded-lg font-semibold text-white bg-teal-600 hover:bg-teal-700 shadow-sm transition-all active:scale-95">
            <Plus className="w-4 h-4" /> Generate Artifact
          </button>
        </div>

        {/* Generation Pipeline */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8 shadow-sm">
          <div className="font-semibold text-sm mb-4 text-slate-900">Generation Pipeline</div>
          <div className="flex items-center gap-3 overflow-x-auto pb-2 hide-scrollbar">
            {pipeline.map((step, i) => (
              <div key={step} className="flex items-center gap-3 flex-shrink-0 min-w-[140px]">
                <div className="flex-1 px-4 py-2.5 rounded-lg text-xs font-semibold text-center bg-slate-100 text-slate-600 border border-slate-200">
                  {step}
                </div>
                {i < pipeline.length - 1 && <ArrowRight className="w-4 h-4 text-slate-400" />}
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs px-4 py-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 font-medium">
            <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0" />
            All AI-generated artifacts require human review before use. Content must be verified against source evidence.
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 hide-scrollbar">
          {["All", "Word", "PDF", "Excel", "PowerPoint", "Code"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-sm px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap shadow-sm ${
                filter === f
                  ? "bg-teal-50 text-teal-700 border border-teal-200"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Artifacts Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                {["Type", "Name", "Project", "Status", "Generated", "Size", "Classification", ""].map((h) => (
                  <th key={h} className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((a, i) => {
                const Icon = typeIcons[a.type] || FileText;
                const StatusIcon = statusColors[a.status]?.icon;
                return (
                  <tr key={i} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${typeColors[a.type]?.bg} ${typeColors[a.type]?.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900 text-sm">{a.name}</div>
                      <div className="text-xs text-slate-500 mt-1">{a.template}</div>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-600">{a.project}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md font-semibold border border-current/20 ${statusColors[a.status]?.bg} ${statusColors[a.status]?.color}`}>
                        {StatusIcon && <StatusIcon className="w-3.5 h-3.5" />} {a.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500">{a.generated}</td>
                    <td className="px-6 py-4 text-xs text-slate-500">{a.size}</td>
                    <td className="px-6 py-4">
                      <span className={`flex items-center gap-1 w-max text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-wider border border-current/20 ${clsColors[a.cls]?.bg} ${clsColors[a.cls]?.color}`}>
                        <FileLock2 className="w-3 h-3" /> {a.cls}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity justify-end">
                        <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium shadow-sm transition-colors">
                          <Eye className="w-3.5 h-3.5" /> View
                        </button>
                        <button className="flex items-center justify-center w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 shadow-sm transition-colors" title="Download">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-slate-500 text-sm">
              No artifacts found matching this filter.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
