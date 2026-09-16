import { useState } from "react";
import { Check, X, AlertTriangle, ShieldAlert, FileText, ChevronDown, ChevronUp, Lock, RefreshCcw } from "lucide-react";

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

const riskColors: Record<string, { bg: string; color: string; icon: any }> = {
  Low: { bg: "bg-emerald-100", color: "text-emerald-700", icon: Check },
  Medium: { bg: "bg-amber-100", color: "text-amber-700", icon: AlertTriangle },
  High: { bg: "bg-orange-100", color: "text-orange-700", icon: ShieldAlert },
  Critical: { bg: "bg-rose-100", color: "text-rose-700", icon: ShieldAlert },
};

const statusColors: Record<string, { bg: string; color: string }> = {
  Pending: { bg: "bg-amber-100", color: "text-amber-800" },
  Approved: { bg: "bg-emerald-100", color: "text-emerald-800" },
  Rejected: { bg: "bg-rose-100", color: "text-rose-800" },
  Expired: { bg: "bg-slate-100", color: "text-slate-600" },
};

export default function Approvals() {
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState<string | null>("APR-2024-001");

  const filtered = approvals.filter((a) => filter === "All" || a.status === filter);

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      <div className="max-w-5xl mx-auto px-8 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Approval Center</h1>
            <p className="text-sm mt-1 text-slate-500">Human oversight for sensitive AI actions and artifacts</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-100 border border-amber-200 shadow-sm">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-semibold text-amber-800">2 Pending Actions</span>
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 hide-scrollbar">
          {["All", "Pending", "Approved", "Rejected", "Expired"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-sm px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap shadow-sm ${
                filter === f
                  ? "bg-teal-50 text-teal-700 border border-teal-200"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {f} {f === "Pending" && <span className="ml-1 px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-700 text-xs">2</span>}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.map((a) => {
            const RiskIcon = riskColors[a.risk].icon;
            return (
              <div
                key={a.id}
                className={`bg-white rounded-xl border overflow-hidden shadow-sm hover:shadow-md transition-shadow ${
                  a.status === "Pending" ? "border-amber-300 ring-1 ring-amber-300/50" : "border-slate-200"
                }`}
              >
                <div
                  className="flex flex-col sm:flex-row sm:items-center gap-4 px-6 py-5 cursor-pointer hover:bg-slate-50/50 transition-colors"
                  onClick={() => setExpanded(expanded === a.id ? null : a.id)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-semibold text-slate-900 text-base">{a.task}</span>
                      <span className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-md font-bold bg-slate-100 text-slate-600 border border-slate-200 uppercase tracking-wider">
                        <Lock className="w-3 h-3" /> {a.cls}
                      </span>
                    </div>
                    <div className="flex items-center gap-x-4 gap-y-2 mt-2 flex-wrap">
                      <span className="text-xs text-slate-500 flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-[10px]">
                          {a.requestedBy.split(' ').map(n=>n[0]).join('')}
                        </div>
                        <strong className="text-slate-700 font-medium">{a.requestedBy}</strong>
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs text-slate-500 font-medium">{a.project}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs text-slate-400">{a.requestedAt}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0 self-start sm:self-center">
                    <span className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md font-medium border ${riskColors[a.risk].bg} ${riskColors[a.risk].color} border-current/20`}>
                      <RiskIcon className="w-3.5 h-3.5" />
                      {a.risk} Risk
                    </span>
                    <span className={`text-xs px-2.5 py-1 rounded-md font-bold tracking-wide uppercase border ${statusColors[a.status].bg} ${statusColors[a.status].color} border-current/20`}>
                      {a.status}
                    </span>
                    <span className="text-xs text-slate-500 font-medium ml-2 flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-slate-400" />
                      {a.evidence}
                    </span>
                    <div className="ml-2 text-slate-400">
                      {expanded === a.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                </div>

                {expanded === a.id && (
                  <div className="border-t border-slate-100 px-6 py-5 bg-slate-50/50">
                    <p className="text-sm mb-5 text-slate-700 leading-relaxed max-w-4xl">{a.description}</p>

                    {/* Evidence sources */}
                    <div className="mb-6">
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <FileText className="w-4 h-4" /> Evidence Sources
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {["Inspection Report 2026", "SOP P-102 Rev 3.2", "Sensor Data Aug 2026", "Historical Maintenance Record"].slice(0, a.evidence).map((ev) => (
                          <span key={ev} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 font-medium shadow-sm hover:border-teal-300 hover:text-teal-700 transition-colors cursor-pointer">
                            <FileText className="w-3.5 h-3.5 text-slate-400" /> {ev}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Verification Status */}
                    <div className="mb-6">
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4" /> Pre-Flight Verification
                      </div>
                      <div className="flex flex-wrap gap-x-6 gap-y-3">
                        {[
                          { label: "Evidence Found", ok: true },
                          { label: "Permission Valid", ok: true },
                          { label: "Calculation Verified", ok: true },
                          { label: "No Conflicts", ok: a.evidence < 3 },
                        ].map((v) => (
                          <div key={v.label} className={`flex items-center gap-2 text-sm font-medium ${v.ok ? "text-emerald-700" : "text-amber-600"}`}>
                            {v.ok ? <Check className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                            {v.label}
                          </div>
                        ))}
                      </div>
                    </div>

                    {a.status === "Pending" ? (
                      <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-slate-200">
                        <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 shadow-sm transition-all hover:shadow-md active:scale-95">
                          <Check className="w-4 h-4" /> Approve & Execute
                        </button>
                        <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-rose-700 bg-white border border-rose-200 hover:bg-rose-50 shadow-sm transition-all active:scale-95">
                          <X className="w-4 h-4" /> Reject
                        </button>
                        <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 shadow-sm transition-all active:scale-95">
                          <RefreshCcw className="w-4 h-4" /> Request Changes
                        </button>
                      </div>
                    ) : (
                      <div className={`mt-6 pt-4 border-t border-slate-200 flex items-center gap-2 text-sm font-semibold ${
                        a.status === "Approved" ? "text-emerald-700" : "text-rose-700"
                      }`}>
                        {a.status === "Approved" ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                        {a.status === "Approved" ? "Approved by authorized approver" : "Rejected — see audit trail for details"}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
