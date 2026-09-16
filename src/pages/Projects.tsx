import { useState } from "react";
import { useNav } from "../context/NavContext";

const projects = [
  { name: "CDU-4 Inspection Analysis", owner: "Anita Rao", dept: "Process Engineering", status: "Active", progress: 72, tasks: 14, artifacts: 3, cls: "CONFIDENTIAL", agents: ["Engineering Agent", "HSE Agent"], updated: "16 Sep 2026" },
  { name: "P-102 Pump Maintenance Study", owner: "Rajesh Kumar", dept: "Inspection Engineering", status: "Active", progress: 45, tasks: 9, artifacts: 1, cls: "CONFIDENTIAL", agents: ["HSE/Inspection Agent"], updated: "15 Sep 2026" },
  { name: "Vendor Technical Evaluation — CX-4", owner: "Priya Nair", dept: "Procurement", status: "Completed", progress: 100, tasks: 12, artifacts: 5, cls: "INTERNAL", agents: ["Research Agent", "Document Agent"], updated: "14 Sep 2026" },
  { name: "Reformer Unit Optimization", owner: "Suresh Bhat", dept: "Process Engineering", status: "Active", progress: 33, tasks: 6, artifacts: 0, cls: "CONFIDENTIAL", agents: ["Data Analysis Agent", "Engineering Agent"], updated: "16 Sep 2026" },
  { name: "Pipeline Anomaly Investigation", owner: "Meena Shetty", dept: "HSE", status: "Pending Approval", progress: 88, tasks: 11, artifacts: 2, cls: "RESTRICTED", agents: ["HSE Agent", "Document Agent"], updated: "12 Sep 2026" },
  { name: "Annual Turnaround Planning 2027", owner: "Arvind Rao", dept: "Maintenance", status: "Planning", progress: 12, tasks: 3, artifacts: 0, cls: "INTERNAL", agents: [], updated: "10 Sep 2026" },
];

const statusColors: Record<string, string> = {
  Active: "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
  "Pending Approval": "bg-amber-100 text-amber-800",
  Planning: "bg-slate-100 text-slate-600",
};

const clsColors: Record<string, string> = {
  CONFIDENTIAL: "bg-amber-100 text-amber-800",
  INTERNAL: "bg-blue-100 text-blue-700",
  RESTRICTED: "bg-rose-100 text-rose-800",
};

export default function Projects() {
  const { navigate } = useNav();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = projects.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || p.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      <div className="max-w-6xl mx-auto px-10 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Projects</h1>
            <p className="text-base mt-2 text-slate-500">
              {projects.length} active projects · MRPL Refinery Operations
            </p>
          </div>
          <button
            className="text-sm px-5 py-2.5 rounded-lg font-medium text-white bg-teal-600 hover:bg-teal-700 transition-colors shadow-sm"
          >
            + New Project
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M11.5 11.5L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all bg-white shadow-sm"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
            {["All", "Active", "Completed", "Pending Approval", "Planning"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-sm px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                  filter === f
                    ? "bg-teal-50 text-teal-700 border border-teal-200 shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900 shadow-sm"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50">
                {["Project", "Owner / Department", "Status", "Progress", "Agents", "Updated", "Classification", ""].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr
                  key={i}
                  className="hover:bg-slate-50 cursor-pointer transition-colors border-b border-slate-100 last:border-0 group"
                  onClick={() => navigate("project-detail")}
                >
                  <td className="px-6 py-4">
                    <div className="font-semibold text-sm text-slate-900">{p.name}</div>
                    <div className="text-xs text-slate-500 mt-1">{p.tasks} tasks · {p.artifacts} artifacts</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-slate-700">{p.owner}</div>
                    <div className="text-xs text-slate-500 mt-1">{p.dept}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-md font-medium ${statusColors[p.status] || "bg-slate-100 text-slate-700"}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${p.progress === 100 ? "bg-green-500" : "bg-teal-500"}`}
                          style={{ width: `${p.progress}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-slate-600">{p.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1.5">
                      {p.agents.slice(0, 2).map((a) => (
                        <span key={a} className="text-[10px] px-2 py-1 rounded-md bg-teal-50 text-teal-700 font-medium">
                          {a}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 font-medium">
                    {p.updated}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-wider border ${clsColors[p.cls]?.replace('bg-', 'border-').replace('100', '200')} ${clsColors[p.cls] || "bg-slate-100 text-slate-700 border-slate-200"}`}>
                      {p.cls}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-xs px-4 py-2 rounded-lg border border-slate-200 font-medium text-slate-600 hover:bg-white hover:text-slate-900 hover:border-slate-300 transition-colors bg-slate-50 opacity-0 group-hover:opacity-100">
                      Open →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-slate-500">
              No projects found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
