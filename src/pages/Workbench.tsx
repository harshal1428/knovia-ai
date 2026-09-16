import { useState } from "react";
import { useNav } from "../context/NavContext";

type ExecutionMode = "auto" | "manual";
type ExecutionPath = "fast" | "knowledge" | "complex" | null;

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
  meta?: {
    path: ExecutionPath;
    agent?: string;
    model?: string;
    sources?: number;
    verified?: boolean;
  };
};

const demoMessages: Message[] = [
  {
    id: 1,
    role: "user",
    content: "What is the current status of Project Alpha?",
  },
  {
    id: 2,
    role: "assistant",
    content: "Project Alpha is currently 72% complete. CDU-4 turnaround is in progress, with 14 of 19 tasks completed. Estimated completion: 18 October 2026.",
    meta: { path: "fast", model: "Direct DB" },
  },
  {
    id: 3,
    role: "user",
    content: "Compare the latest P-102 inspection report with the approved SOP.",
  },
  {
    id: 4,
    role: "assistant",
    content: "Based on hybrid retrieval across 3 sources:\n\n**Inspection Report (Aug 2026):** Vibration at bearing DE: 8.2 mm/s (threshold: 7.1 mm/s). Seal leakage detected at mechanical seal.\n\n**SOP Rev 3.2:** Specifies immediate isolation when bearing vibration exceeds 7.1 mm/s. Seal inspection interval: 6 months — current overdue by 8 days.\n\n**Assessment:** Two deviations from SOP identified. Recommend initiating maintenance work order.",
    meta: { path: "knowledge", agent: "HSE Agent", model: "Local LLM", sources: 3, verified: true },
  },
];

const agents = ["Research Agent", "Document Agent", "Coding Agent", "Engineering Agent", "HSE/Inspection Agent", "Data Analysis Agent", "Calculation Agent", "Knowledge Retrieval Agent"];

const pathLabels: Record<string, string> = {
  fast: "⚡ Fast Path · Direct Data Retrieval",
  knowledge: "🔍 Knowledge Path · Hybrid RAG",
  complex: "⚙ Complex Path · Multi-Agent",
};

export default function Workbench() {
  const { navigate } = useNav();
  const [messages, setMessages] = useState<Message[]>(demoMessages);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<ExecutionMode>("auto");
  const [selectedAgent, setSelectedAgent] = useState("Research Agent");
  const [showRouter, setShowRouter] = useState(true);
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(true);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [currentProject, setCurrentProject] = useState("CDU-4 Inspection Analysis");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: messages.length + 1, role: "user", content: input };
    const paths: ExecutionPath[] = ["fast", "knowledge", "complex"];
    const path = paths[Math.floor(Math.random() * 3)];
    const aiMsg: Message = {
      id: messages.length + 2,
      role: "assistant",
      content: path === "fast"
        ? "Retrieving directly from MRPL project database..."
        : path === "knowledge"
        ? "Hybrid retrieval complete. Cross-referencing 4 documents against MRPL knowledge base..."
        : "Initiating multi-agent analysis. Planner → Document Agent → Engineering Agent → Verification...",
      meta: { path, agent: mode === "manual" ? selectedAgent : "Auto Selected", model: "Auto Routed" },
    };
    setMessages([...messages, userMsg, aiMsg]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Single Compact Header */}
      <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-slate-200 flex-shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-slate-500">Project:</span>
          <span className="text-sm font-semibold text-slate-900 truncate max-w-[200px]">{currentProject}</span>
          <span className="text-[10px] px-2 py-0.5 rounded-md font-semibold bg-amber-100 text-amber-800 border border-amber-200">
            🔒 CONFIDENTIAL
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 mr-2">
            <span className="text-xs text-slate-500 mr-2">3 contributors</span>
            <div className="flex -space-x-2">
              {["A", "B", "C"].map((l, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold text-white border-2 border-white shadow-sm"
                  style={{ background: ["#0F766E", "#2563EB", "#7C3AED"][i] }}
                >
                  {l}
                </div>
              ))}
            </div>
          </div>
          <div className="h-6 w-px bg-slate-200 mx-1"></div>
          
          <button
            onClick={() => navigate("approvals")}
            className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
            title="Approvals"
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="2" width="12" height="12" rx="1.5" stroke="#475569" strokeWidth="1.3" />
              <path d="M5 8l2 2 4-4" stroke="#475569" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <span
              className="absolute -top-0.5 -right-0.5 text-xs font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white bg-amber-500 text-white"
              style={{ fontSize: 10 }}
            >
              2
            </span>
          </button>

          <button className="flex items-center gap-2 px-2 py-1.5 rounded-full hover:bg-slate-50 transition-colors ml-1" title="User Profile">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shadow-sm bg-teal-600 text-white">
              AR
            </div>
            <span className="text-sm font-medium pr-1 text-slate-900">
              Anita Rao
            </span>
          </button>
          
          <div className="h-6 w-px bg-slate-200 mx-1"></div>
          <button className="text-xs px-3 py-1.5 rounded-lg font-medium text-white bg-teal-600 hover:bg-teal-700 transition-colors shadow-sm" title="Export report">
            Export
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel — Chat History & Project Selector */}
        {!leftCollapsed ? (
          <div className="w-64 bg-white border-r border-slate-200 flex-shrink-0 flex flex-col overflow-y-auto transition-all">
            <div className="flex items-center justify-between px-4 py-4 border-b border-slate-100 bg-slate-50/50 gap-2">
              <select 
                value={currentProject}
                onChange={(e) => setCurrentProject(e.target.value)}
                className="text-sm font-medium text-slate-700 border border-slate-300 rounded-md px-2 py-1.5 outline-none bg-white cursor-pointer w-full truncate shadow-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500" 
                title="Select Project"
              >
                <option value="CDU-4 Inspection Analysis">CDU-4 Inspection Analysis</option>
                <option value="Pump P-102 Maintenance">Pump P-102 Maintenance</option>
                <option value="Q3 Safety Audit">Q3 Safety Audit</option>
              </select>
              <button onClick={() => setLeftCollapsed(true)} className="text-slate-400 hover:text-slate-700 transition-colors p-1.5 rounded-md hover:bg-slate-200 flex-shrink-0" title="Close chat history">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
            </div>
            
            <div className="p-4 border-b border-slate-100">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm" title="Start a fresh chat">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
                New Chat
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
              <div className="text-xs font-bold text-slate-400 tracking-wider uppercase px-2 mb-2 mt-1">Recent</div>
              {[
                "Current status of Project Alpha",
                "Compare latest P-102 report",
                "Generate management approval",
                "Review HSE guidelines",
              ].map((chat, i) => (
                <button key={i} className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors truncate ${i === 0 ? "bg-slate-100 text-slate-900 font-medium" : "text-slate-600 hover:bg-slate-50"}`} title={`Load chat: ${chat}`}>
                  {chat}
                </button>
              ))}
              
              <div className="text-xs font-bold text-slate-400 tracking-wider uppercase px-2 mb-2 mt-6">Last Week</div>
              {[
                "Draft initial requirements",
                "Budget calculation query",
                "Vendor list 2026",
              ].map((chat, i) => (
                <button key={i} className="w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors text-slate-600 hover:bg-slate-50 truncate" title={`Load chat: ${chat}`}>
                  {chat}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <button
            onClick={() => setLeftCollapsed(false)}
            className="w-12 bg-white border-r border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors"
            title="Open chat history"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        )}

        {/* Center — Chat */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {/* (Router removed as requested, now integrated in main header) */}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-3xl ${msg.role === "user" ? "order-2" : ""}`}>
                  {msg.role === "assistant" && (
                    <div className="flex items-center gap-2.5 mb-2.5 ml-1">
                      <div className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold bg-teal-600 text-white shadow-sm">
                        AI
                      </div>
                      <span className="text-sm font-semibold text-slate-700">
                        {msg.meta?.agent || "Sovereign AI"}
                        {msg.meta?.model && <span className="text-slate-400 font-normal"> · {msg.meta.model}</span>}
                      </span>
                      {msg.meta?.verified && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-green-100 text-green-700 border border-green-200 uppercase tracking-wider ml-1">
                          ✓ Verified
                        </span>
                      )}
                    </div>
                  )}
                  <div
                    className={`rounded-2xl px-5 py-4 text-sm leading-relaxed shadow-sm ${
                      msg.role === "user" 
                        ? "bg-teal-600 text-white rounded-tr-sm" 
                        : "bg-white text-slate-800 border border-slate-200 rounded-tl-sm"
                    }`}
                    style={{ whiteSpace: "pre-wrap" }}
                  >
                    {msg.content}
                  </div>
                  {msg.meta?.path && (
                    <div className="mt-3 flex items-center gap-3 ml-1">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-md font-medium border ${
                          msg.meta.path === "fast" 
                            ? "bg-teal-50 text-teal-700 border-teal-200" 
                            : msg.meta.path === "knowledge" 
                              ? "bg-blue-50 text-blue-700 border-blue-200" 
                              : "bg-purple-50 text-purple-700 border-purple-200"
                        }`}
                      >
                        {pathLabels[msg.meta.path]}
                      </span>
                      {msg.meta.sources && (
                        <button 
                          onClick={() => setRightCollapsed(false)}
                          className="text-xs font-medium text-slate-500 hover:text-teal-600 flex items-center gap-1 transition-colors px-2 py-1 rounded-md hover:bg-teal-50 cursor-pointer"
                          title="View evidence sources"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                          {msg.meta.sources} sources
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex-shrink-0 px-6 pb-6 pt-2 bg-transparent">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden transition-all focus-within:shadow-md focus-within:border-teal-400">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                placeholder="Ask, analyze, create, search, calculate or execute..."
                rows={1}
                className="w-full px-4 py-3 text-sm outline-none resize-none text-slate-700 placeholder-slate-400 bg-transparent min-h-[44px]"
              />
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-50/80 border-t border-slate-100 relative">
                <button
                  onClick={() => setShowAttachMenu(!showAttachMenu)}
                  className="w-7 h-7 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center transition-colors shrink-0"
                  title="Attach options"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
                </button>

                <div className="flex items-center p-0.5 ml-1 rounded-lg bg-slate-100/80 border border-slate-200 shrink-0">
                  {(["auto", "manual"] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setMode(m)}
                      className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all capitalize ${
                        mode === m 
                          ? "bg-white text-teal-700 shadow-sm" 
                          : "text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      {m === "auto" ? "● Auto" : "○ Manual"}
                    </button>
                  ))}
                </div>
                {mode === "manual" && (
                  <select
                    value={selectedAgent}
                    onChange={(e) => setSelectedAgent(e.target.value)}
                    className="text-[10px] border border-slate-300 rounded-lg px-2 py-1 outline-none bg-white text-slate-700 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 shadow-sm max-w-[130px] truncate shrink-0 ml-1"
                  >
                    {agents.map((a) => <option key={a}>{a}</option>)}
                  </select>
                )}
                
                {showAttachMenu && (
                  <div className="absolute bottom-10 left-3 bg-white border border-slate-200 shadow-lg rounded-xl p-1.5 flex gap-1 z-20">
                    {["Attach", "Voice", "Image", "Agent", "Tools", "Model"].map((btn) => (
                      <button
                        key={btn}
                        onClick={() => setShowAttachMenu(false)}
                        className="text-xs px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium transition-colors"
                        title={btn}
                      >
                        {btn}
                      </button>
                    ))}
                  </div>
                )}
                <button
                  onClick={handleSend}
                  className={`ml-auto text-xs px-5 py-1.5 rounded-xl font-semibold transition-all shadow-sm ${
                    input.trim() 
                      ? "bg-teal-600 text-white hover:bg-teal-700 hover:shadow" 
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }`}
                  title="Send message"
                >
                  Send
                </button>
              </div>
            </div>
            <div className="text-center mt-2">
               <span className="text-[9px] text-slate-400 font-medium tracking-wide">AI CAN MAKE MISTAKES. VERIFY IMPORTANT INFORMATION.</span>
            </div>
          </div>
        </div>

        {/* Right Panel — Evidence & Context */}
        {!rightCollapsed ? (
          <div className="w-80 bg-white border-l border-slate-200 flex-shrink-0 overflow-y-auto transition-all relative">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 sticky top-0 bg-white/90 backdrop-blur z-10">
              <span className="text-xs font-bold text-slate-500 tracking-wider uppercase">Context & Evidence</span>
              <button onClick={() => setRightCollapsed(true)} className="text-slate-400 hover:text-slate-700 transition-colors p-1 rounded-md hover:bg-slate-100" title="Close right panel">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>

            {/* Project Context (Moved from Left Panel) */}
            <div className="px-5 py-5 border-b border-slate-100 bg-slate-50/30">
              <div className="text-sm font-semibold text-slate-800 mb-4">Project Context</div>
              <div className="space-y-4">
                {[
                  { label: "Documents", count: "7 files", icon: "◧", color: "text-blue-500" },
                  { label: "Knowledge", count: "1.2K chunks", icon: "◈", color: "text-purple-500" },
                  { label: "Database", count: "MRPL PostgreSQL", icon: "⬡", color: "text-teal-500" },
                  { label: "Notes", count: "3 notes", icon: "◪", color: "text-amber-500" },
                  { label: "Contributors", count: "3 active", icon: "◯", color: "text-rose-500" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center border border-slate-100 ${item.color}`}>
                      <span className="text-lg">{item.icon}</span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-800">{item.label}</div>
                      <div className="text-xs text-slate-500">{item.count}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Evidence */}
            <div className="px-5 py-5">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-semibold text-slate-800">Evidence Sources</div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200">3 USED</span>
              </div>
              <div className="space-y-4">
                {[
                  { doc: "Inspection SOP – Pump P-102", version: "3.2", dept: "Maintenance Eng.", method: "BM25 + Vector", score: 0.94 },
                  { doc: "CDU-4 Maintenance Log 2026", version: "—", dept: "Operations", method: "Vector", score: 0.87 },
                  { doc: "MRPL Equipment Vibration Limits", version: "2.1", dept: "Inspection Eng.", method: "BM25", score: 0.82 },
                ].map((ev, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl border border-slate-100 bg-white shadow-sm hover:shadow-md hover:border-slate-200 transition-all cursor-pointer"
                    title={`View document: ${ev.doc}`}
                  >
                    <div className="font-semibold text-sm text-slate-800 line-clamp-1 mb-2">{ev.doc}</div>
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500">v{ev.version}</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500">{ev.dept}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-50">
                      <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-blue-50 text-blue-600 border border-blue-100 uppercase tracking-wider">{ev.method}</span>
                      <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">{(ev.score * 100).toFixed(0)}% Match</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setRightCollapsed(false)}
            className="w-12 bg-white border-l border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors"
            title="Open Context & Evidence"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
        )}
      </div>
    </div>
  );
}
