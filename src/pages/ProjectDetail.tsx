import { useState } from "react";
import { useNav } from "../context/NavContext";

const tabs = ["Overview", "Chat", "Tasks", "Knowledge", "Documents", "Notebook", "Notes", "Code", "Sandbox", "Agents", "Artifacts", "Approvals", "Contributors", "Audit", "Settings"];

export default function ProjectDetail() {
  const { navigate } = useNav();
  const [activeTab, setActiveTab] = useState("Overview");
  const [showContributorModal, setShowContributorModal] = useState(false);

  return (
    <div className="flex flex-col h-full" style={{ background: "#F7F9FC" }}>
      {/* Project Header */}
      <div className="bg-white border-b px-8 py-5 flex-shrink-0" style={{ borderColor: "var(--color-border)" }}>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <button onClick={() => navigate("projects")} className="text-xs" style={{ color: "var(--color-text-muted)" }}>← Projects</button>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-semibold" style={{ color: "var(--color-text-primary)" }}>CDU-4 Inspection Analysis</h1>
              <span className="text-xs px-1.5 py-0.5 rounded font-medium" style={{ background: "#FEF3C7", color: "#92400E", fontSize: 10 }}>🔒 CONFIDENTIAL</span>
              <span className="text-xs px-2 py-0.5 rounded font-medium" style={{ background: "#DBEAFE", color: "#1D4ED8", fontSize: 11 }}>Active</span>
            </div>
            <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
              Comprehensive inspection analysis of CDU-4 unit with management approval note generation.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>Owner: <strong style={{ color: "var(--color-text-secondary)" }}>Anita Rao</strong></span>
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>Dept: <strong style={{ color: "var(--color-text-secondary)" }}>Process Engineering</strong></span>
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>Updated: <strong style={{ color: "var(--color-text-secondary)" }}>16 Sep 2026</strong></span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowContributorModal(true)}
              className="text-xs px-3 py-2 rounded border font-medium hover:bg-slate-50"
              style={{ borderColor: "var(--color-border)", color: "var(--color-text-secondary)" }}
            >
              + Add Contributor
            </button>
            <button className="text-xs px-3 py-2 rounded border font-medium hover:bg-slate-50" style={{ borderColor: "var(--color-border)", color: "var(--color-text-secondary)" }}>
              Export
            </button>
            <button
              onClick={() => navigate("workbench")}
              className="text-xs px-4 py-2 rounded font-medium text-white"
              style={{ background: "var(--color-teal)" }}
            >
              Open Workbench
            </button>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-4 flex items-center gap-3">
          <div className="flex-1 h-1.5 rounded-full overflow-hidden max-w-xs" style={{ background: "var(--color-border)" }}>
            <div className="h-full rounded-full" style={{ width: "72%", background: "var(--color-teal)" }} />
          </div>
          <span className="text-xs font-medium" style={{ color: "var(--color-text-secondary)" }}>72% complete</span>
          <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>14 of 19 tasks done</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b flex-shrink-0 overflow-x-auto" style={{ borderColor: "var(--color-border)" }}>
        <div className="flex px-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-3 text-xs font-medium border-b-2 transition-colors flex-shrink-0"
              style={{
                borderBottomColor: activeTab === tab ? "var(--color-teal)" : "transparent",
                color: activeTab === tab ? "var(--color-teal)" : "var(--color-text-muted)",
                fontSize: 12,
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        {activeTab === "Overview" && (
          <div className="max-w-4xl grid grid-cols-3 gap-5">
            {[
              { label: "Tasks", value: "14 / 19", color: "var(--color-teal)" },
              { label: "Documents", value: "7", color: "var(--color-blue)" },
              { label: "Artifacts", value: "3", color: "#7C3AED" },
              { label: "Pending Approvals", value: "1", color: "var(--color-warning)" },
              { label: "Contributors", value: "3", color: "var(--color-info)" },
              { label: "Knowledge Chunks", value: "1,284", color: "var(--color-teal)" },
            ].map((kpi) => (
              <div key={kpi.label} className="bg-white rounded border px-5 py-4" style={{ borderColor: "var(--color-border)" }}>
                <div className="text-xs mb-1" style={{ color: "var(--color-text-muted)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>{kpi.label}</div>
                <div className="text-xl font-semibold" style={{ color: kpi.color }}>{kpi.value}</div>
              </div>
            ))}
            <div className="col-span-3 bg-white rounded border" style={{ borderColor: "var(--color-border)" }}>
              <div className="px-5 py-3.5 border-b font-semibold text-sm" style={{ borderColor: "var(--color-border)", color: "var(--color-text-primary)" }}>Recent Activity</div>
              <div className="divide-y" style={{ borderColor: "var(--color-border)" }}>
                {[
                  { user: "Anita Rao", action: "Uploaded inspection report for CDU-4 Unit 2", time: "12 min ago", type: "upload" },
                  { user: "Document Agent", action: "Extracted and indexed 47 pages from inspection report", time: "10 min ago", type: "agent" },
                  { user: "Anita Rao", action: "Requested management approval note generation", time: "8 min ago", type: "request" },
                  { user: "HSE Agent", action: "Analysis complete — 2 deviations identified", time: "5 min ago", type: "agent" },
                  { user: "System", action: "Pending approval created for management note", time: "3 min ago", type: "approval" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 px-5 py-3">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5"
                      style={{ background: item.type === "agent" ? "#F0FDFA" : "var(--color-blue-light)", color: item.type === "agent" ? "var(--color-teal)" : "var(--color-blue)" }}
                    >
                      {item.user[0]}
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-medium" style={{ color: "var(--color-text-primary)", fontSize: 12 }}>{item.user}</span>
                      <span className="text-xs mx-1.5" style={{ color: "var(--color-text-muted)" }}>·</span>
                      <span className="text-xs" style={{ color: "var(--color-text-secondary)", fontSize: 12 }}>{item.action}</span>
                    </div>
                    <span className="text-xs flex-shrink-0" style={{ color: "var(--color-text-muted)" }}>{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "Contributors" && (
          <div className="max-w-3xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-sm" style={{ color: "var(--color-text-primary)" }}>Project Contributors</h2>
              <button
                onClick={() => setShowContributorModal(true)}
                className="text-xs px-3 py-2 rounded font-medium text-white"
                style={{ background: "var(--color-teal)" }}
              >
                + Add Contributor
              </button>
            </div>
            <div className="bg-white rounded border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
              {[
                { name: "Anita Rao", role: "Process Engineer", projectRole: "Project Manager", access: "Confidential", perms: ["View", "Upload", "Analyze", "Generate", "Approve"], since: "1 Sep 2026" },
                { name: "Rajesh Kumar", role: "Inspection Engineer", projectRole: "Analyst", access: "Confidential", perms: ["View", "Upload", "Analyze"], since: "5 Sep 2026" },
                { name: "Meena Shetty", role: "HSE Officer", projectRole: "Contributor", access: "Internal", perms: ["View", "Upload"], since: "10 Sep 2026" },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-4 px-5 py-4 border-b last:border-0" style={{ borderColor: "var(--color-border)" }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0" style={{ background: "var(--color-teal)", color: "white" }}>
                    {c.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm" style={{ color: "var(--color-text-primary)" }}>{c.name}</div>
                    <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>{c.role}</div>
                  </div>
                  <div className="text-xs px-2 py-1 rounded font-medium" style={{ background: "#EFF6FF", color: "var(--color-blue)" }}>{c.projectRole}</div>
                  <div className="flex gap-1">
                    {c.perms.map((p) => <span key={p} className="text-xs px-1.5 py-0.5 rounded" style={{ background: "#F0FDFA", color: "var(--color-teal)", fontSize: 10 }}>✓ {p}</span>)}
                  </div>
                  <span className="text-xs px-1.5 py-0.5 rounded font-medium" style={{ background: "#FEF3C7", color: "#92400E", fontSize: 10 }}>{c.access}</span>
                  <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>Since {c.since}</span>
                  <button className="text-xs px-2 py-1 rounded border hover:bg-slate-50" style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}>Manage</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {(activeTab !== "Overview" && activeTab !== "Contributors") && (
          <div className="flex items-center justify-center h-48">
            <div className="text-center">
              <div className="text-2xl mb-2 opacity-30">◎</div>
              <div className="text-sm font-medium" style={{ color: "var(--color-text-muted)" }}>{activeTab}</div>
              <div className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>Navigate to this section from the Workbench or use the dedicated page.</div>
              {activeTab === "Chat" && (
                <button onClick={() => navigate("workbench")} className="mt-3 text-xs px-4 py-2 rounded font-medium text-white" style={{ background: "var(--color-teal)" }}>
                  Open Workbench →
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add Contributor Modal */}
      {showContributorModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4" style={{ border: "1px solid var(--color-border)" }}>
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "var(--color-border)" }}>
              <h3 className="font-semibold text-sm" style={{ color: "var(--color-text-primary)" }}>Add Contributor</h3>
              <button onClick={() => setShowContributorModal(false)} style={{ color: "var(--color-text-muted)" }}>✕</button>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "var(--color-text-secondary)" }}>Search User</label>
                <input type="text" placeholder="Search MRPL users..." className="w-full px-3 py-2 text-sm rounded border outline-none" style={{ borderColor: "var(--color-border)" }} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: "var(--color-text-secondary)" }}>Project Role</label>
                  <select className="w-full px-3 py-2 text-sm rounded border outline-none" style={{ borderColor: "var(--color-border)" }}>
                    {["Viewer", "Contributor", "Analyst", "Project Manager", "Approver", "Administrator"].map((r) => <option key={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: "var(--color-text-secondary)" }}>Access Level</label>
                  <select className="w-full px-3 py-2 text-sm rounded border outline-none" style={{ borderColor: "var(--color-border)" }}>
                    {["Public", "Internal", "Confidential", "Restricted"].map((r) => <option key={r}>{r}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "var(--color-text-secondary)" }}>Access Expiry (optional)</label>
                <input type="date" className="w-full px-3 py-2 text-sm rounded border outline-none" style={{ borderColor: "var(--color-border)" }} />
              </div>
              <div className="rounded p-3 text-xs" style={{ background: "var(--color-surface-subtle)", border: "1px solid var(--color-border)" }}>
                <div className="font-medium mb-1" style={{ color: "var(--color-text-secondary)" }}>Permission Summary</div>
                {["✓ View project", "✓ Upload documents", "✓ Use approved agents", "✓ Create artifacts", "✕ Approve critical actions"].map((p) => (
                  <div key={p} style={{ color: p.startsWith("✓") ? "var(--color-success)" : "var(--color-danger)" }} className="py-0.5">{p}</div>
                ))}
                <div className="mt-1 pt-1 border-t" style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}>
                  Global RBAC restrictions still apply
                </div>
              </div>
            </div>
            <div className="flex gap-2 px-6 py-4 border-t" style={{ borderColor: "var(--color-border)" }}>
              <button onClick={() => setShowContributorModal(false)} className="flex-1 py-2 text-sm rounded border" style={{ borderColor: "var(--color-border)", color: "var(--color-text-secondary)" }}>Cancel</button>
              <button className="flex-1 py-2 text-sm rounded font-medium text-white" style={{ background: "var(--color-teal)" }}>Add Contributor</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
