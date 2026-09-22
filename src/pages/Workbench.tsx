import React, { useState, useRef, useEffect } from "react";
import { useNav } from "../context/NavContext";
import seedData from "../data/seed.json";

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
    generationSteps?: GenerationStep[];
  };
  artifact?: {
    name: string;
    status: "pending_approval" | "approved";
    type?: "doc" | "code" | "drawing";
    content?: string;
  };
  graph?: any;
  graph_2?: any;
};

type GenerationStep = { label: string; status: "pending" | "active" | "completed" };

type GenerationState = {
  active: boolean;
  steps: GenerationStep[];
  progress: number;
  startTime: number;
  duration: number;
  questionType: "simple" | "medium" | "complex" | "coding" | "engineering";
  artifactGen?: boolean;
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
  coding: "⌨ Coding Path · Sandbox Environment",
  engineering: "📐 Engineering Path · Analysis & CAD",
};

const ChartRenderer = ({ graph }: { graph: any }) => {
  if (!graph) return null;
  if (graph.type === "bar") {
    const maxVal = Math.max(...graph.data.map((d: any) => d.production || d.count || d.value || 0));
    return (
      <div className="mt-4 p-4 border border-slate-200 rounded-xl bg-white shadow-sm w-full">
        <h4 className="text-sm font-semibold text-slate-800 mb-4">{graph.title}</h4>
        <div className="flex items-end gap-2 h-40">
          {graph.data.map((d: any, idx: number) => {
            const val = d.production || d.count || d.value || 0;
            const pct = maxVal > 0 ? (val / maxVal) * 100 : 0;
            return (
              <div key={idx} className="flex-1 flex flex-col items-center justify-end group">
                <div 
                  className="w-full bg-teal-500 rounded-t-sm group-hover:bg-teal-400 transition-colors relative"
                  style={{ height: `${pct}%` }}
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-[10px] bg-slate-800 text-white px-1.5 py-0.5 rounded transition-opacity">
                    {val}
                  </div>
                </div>
                <div className="text-[10px] text-slate-500 mt-2 truncate w-full text-center">
                  {d.month || d.asset || d.year}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  if (graph.type === "line") {
    return (
      <div className="mt-4 p-4 border border-slate-200 rounded-xl bg-white shadow-sm w-full">
        <h4 className="text-sm font-semibold text-slate-800 mb-2">{graph.title}</h4>
        <div className="text-xs text-slate-500 italic">[Live Line Chart: {graph.xAxis} Trend]</div>
        <div className="flex gap-4 mt-3">
          {graph.data ? graph.data.map((d:any, i:number) => (
             <div key={i} className="flex flex-col items-center p-3 bg-slate-50 rounded-lg shadow-sm border border-slate-100">
               <span className="text-sm font-bold text-teal-700">{d.pressure ?? (d.production || d.value)}</span>
               <span className="text-[10px] text-slate-500 mt-1 uppercase font-semibold">{d.year || d.month}</span>
             </div>
          )) : graph.series?.map((s:any, i:number) => (
             <div key={i} className="flex flex-col p-3 bg-slate-50 rounded-lg shadow-sm border border-slate-100 text-xs">
                <span className="font-bold text-slate-700">{s.name} ({s.unit})</span>
                <span className="text-[10px] mt-1 text-teal-600 font-medium">{s.data.join(" → ")}</span>
             </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function Workbench() {
  const { navigate, projects, setPendingSandboxTask } = useNav();
  const [messages, setMessages] = useState<Message[]>(demoMessages);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<ExecutionMode>("auto");
  const [selectedAgent, setSelectedAgent] = useState("Research Agent");
  const [showRouter, setShowRouter] = useState(true);
  const [leftCollapsed, setLeftCollapsed] = useState(true);
  const [rightCollapsed, setRightCollapsed] = useState(true);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [currentProjectName, setCurrentProjectName] = useState(projects[0]?.name || "CDU-4 Inspection Analysis");
  const [viewingDrawing, setViewingDrawing] = useState(false);
  
  // State for Chats
  const [recentChats, setRecentChats] = useState([
    ...seedData.questions.map((q, idx) => ({
      id: 100 + idx,
      title: q.title,
      type: q.execution_size,
      questionData: q
    })),
    { id: 1, title: "Current status of Project Alpha", type: "Project", questionData: null },
    { id: 2, title: "Compare latest P-102 report", type: "Project", questionData: null },
    { id: 3, title: "Personal Notes - Q3", type: "Personal", questionData: null }
  ]);
  const [showNewChatMenu, setShowNewChatMenu] = useState(false);
  
  const currentProject = projects.find(p => p.name === currentProjectName) || projects[0];

  const [generation, setGeneration] = useState<GenerationState | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, generation]);

  const handleNewChat = (type: "Project" | "Personal") => {
    const newChat = {
      id: Date.now(),
      title: "New " + type + " Chat",
      type: type,
      questionData: null
    };
    setRecentChats([newChat, ...recentChats]);
    setMessages([]);
    setShowNewChatMenu(false);
  };

  const loadChat = (chat: any) => {
    if (!chat.questionData) return;
    const q = chat.questionData;
    let path: ExecutionPath = "fast";
    if (q.complexity.includes("Complex")) path = "complex";
    else if (q.complexity.includes("Medium")) path = "knowledge";

    let artifact = undefined;
    if (q.artifacts && q.artifacts.length > 0) {
      const artName = q.artifacts[0];
      const type = (artName.endsWith(".svg") || artName.endsWith(".png") || artName.endsWith(".cad")) ? "drawing" : (artName.endsWith(".csv") || artName.endsWith(".xlsx")) ? "code" : "doc";
      artifact = {
        name: artName,
        status: "approved",
        type: type as any,
        content: ""
      };
    }

    const answerContent = `**${q.answer.summary}**\n\n${q.answer.details.map((d:string) => "• " + d).join("\n")}`;

    const newMessages: Message[] = [
      {
        id: Date.now(),
        role: "user",
        content: q.question
      },
      {
        id: Date.now() + 1,
        role: "assistant",
        content: answerContent,
        meta: {
          path: path,
          agent: q.complexity.includes("Complex") ? "Engineering Agent" : (q.complexity.includes("Medium") ? "Knowledge Agent" : "Sovereign AI"),
          model: "Gemini 3.1 Pro (Low)",
          sources: q.sources ? q.sources.length : 0,
          verified: true,
          generationSteps: q.execution_steps.map((s:string) => ({ label: s, status: "completed" as const }))
        },
        artifact: artifact,
        graph: q.graph,
        graph_2: q.graph_2
      }
    ];
    setMessages(newMessages);
  };

  const handleSend = () => {
    if (!input.trim() || generation?.active) return;
    const userMsg: Message = { id: messages.length + 1, role: "user", content: input };
    setMessages([...messages, userMsg]);
    setInput("");

    const lowerInput = input.toLowerCase();
    let qType: "simple" | "medium" | "complex" | "coding" | "engineering" = "simple";
    let duration = 3; // 3 sec default
    let hasArtifact = false;

    if (lowerInput.includes("code") || lowerInput.includes("sandbox") || lowerInput.includes("testcase") || lowerInput.includes("coding")) {
      qType = "coding";
      duration = 15;
      hasArtifact = true;
    } else if (lowerInput.includes("drawing") || lowerInput.includes("engineering") || lowerInput.includes("design")) {
      qType = "engineering";
      duration = 15;
      hasArtifact = true;
    } else if (lowerInput.includes("plan") || lowerInput.includes("complex") || lowerInput.includes("turnaround")) {
      qType = "complex";
      duration = 15; // Speeding up simulation for UX
      hasArtifact = true;
    } else if (lowerInput.includes("analyze") || lowerInput.includes("report") || lowerInput.includes("compare")) {
      qType = "medium";
      duration = 8;
      hasArtifact = true;
    }

    let steps: GenerationStep[] = [];
    if (qType === "coding") {
      steps = [
        { label: "Opening Sandbox Environment", status: "active" },
        { label: "Writing implementation code", status: "pending" },
        { label: "Generating unit test cases", status: "pending" },
        { label: "Running tests & verifying execution", status: "pending" },
        { label: "Finalizing sandbox output", status: "pending" }
      ];
    } else if (qType === "engineering") {
      steps = [
        { label: "Loading engineering constraints & requirements", status: "active" },
        { label: "Running finite element & structural analysis", status: "pending" },
        { label: "Generating 3D blueprint / drawing", status: "pending" },
        { label: "Validating safety factors against standards", status: "pending" }
      ];
    } else if (qType === "complex") {
      steps = [
        { label: "Analyzing multi-agent requirements", status: "active" },
        { label: "Delegating tasks to Research & Engineering agents", status: "pending" },
        { label: "Running simulations in Sandbox", status: "pending" },
        { label: "Generating artifacts and blueprints", status: "pending" },
        { label: "Finalizing output & awaiting approval", status: "pending" }
      ];
    } else if (qType === "medium") {
      steps = [
        { label: "Retrieving documents via Hybrid RAG", status: "active" },
        { label: "Cross-referencing compliance rules", status: "pending" },
        { label: "Generating summary artifact", status: "pending" },
        { label: "Finalizing", status: "pending" }
      ];
    } else {
      steps = [
        { label: "Drafting response", status: "active" }
      ];
    }

    setGeneration({
      active: true,
      steps: steps,
      progress: 0,
      startTime: Date.now(),
      duration: duration,
      questionType: qType,
      artifactGen: hasArtifact
    });
  };

  // Chat generation simulation loop
  import_useEffect_if_needed: {
    // (using React.useEffect inline below to avoid changing top-level imports)
  }
  
  // Simulate active generation
  import_react: React.useEffect(() => {
    if (!generation?.active) return;

    const interval = setInterval(() => {
      const elapsed = (Date.now() - generation.startTime) / 1000;
      const progress = Math.min((elapsed / generation.duration) * 100, 100);
      
      let newSteps = [...generation.steps];
      if (generation.questionType === "complex") {
        if (progress < 10) newSteps = newSteps.map((s,i) => i===0 ? {...s, status: "active"} : {...s, status: "pending"});
        else if (progress < 30) newSteps = newSteps.map((s,i) => i<1 ? {...s, status: "completed"} : i===1 ? {...s, status: "active"} : {...s, status: "pending"});
        else if (progress < 60) newSteps = newSteps.map((s,i) => i<2 ? {...s, status: "completed"} : i===2 ? {...s, status: "active"} : {...s, status: "pending"});
        else if (progress < 85) newSteps = newSteps.map((s,i) => i<3 ? {...s, status: "completed"} : i===3 ? {...s, status: "active"} : {...s, status: "pending"});
        else newSteps = newSteps.map((s,i) => i<4 ? {...s, status: "completed"} : i===4 ? {...s, status: "active"} : {...s, status: "pending"});
      } else if (generation.questionType === "medium") {
        if (progress < 20) newSteps = newSteps.map((s,i) => i===0 ? {...s, status: "active"} : {...s, status: "pending"});
        else if (progress < 60) newSteps = newSteps.map((s,i) => i<1 ? {...s, status: "completed"} : i===1 ? {...s, status: "active"} : {...s, status: "pending"});
        else if (progress < 90) newSteps = newSteps.map((s,i) => i<2 ? {...s, status: "completed"} : i===2 ? {...s, status: "active"} : {...s, status: "pending"});
        else newSteps = newSteps.map((s,i) => i<3 ? {...s, status: "completed"} : i===3 ? {...s, status: "active"} : {...s, status: "pending"});
      }

      setGeneration((prev) => prev ? { ...prev, progress, steps: newSteps } : null);

      if (elapsed >= generation.duration) {
        clearInterval(interval);
        let path: ExecutionPath = "fast";
        let content = "Hello! I am Sovereign AI, ready to assist you. How can I help you today?";
        let artifactDetails: any = undefined;

        if (generation.questionType === "complex") {
          path = "complex";
          content = "I have generated the comprehensive turnaround plan and associated artifacts. Please review the attached execution DAG and resource allocation blueprint.";
          artifactDetails = { name: "Turnaround_Plan_v1.pdf", status: "pending_approval", type: "doc" };
        } else if (generation.questionType === "medium") {
          path = "knowledge";
          content = "Analysis complete. I've cross-referenced the reports and generated a summary document highlighting the key discrepancies.";
          artifactDetails = { name: "Analysis_Report.csv", status: "pending_approval", type: "doc" };
        } else if (generation.questionType === "coding") {
          path = "complex"; 
          content = "I have analyzed the requirements and designed the implementation logic.";
          artifactDetails = { 
            name: "sandbox_script.py", 
            status: "pending_approval", 
            type: "code",
            content: `import numpy as np
import pandas as pd
from typing import List, Dict

class PumpEfficiencyAnalyzer:
    def __init__(self, threshold: float = 7.1):
        self.threshold = threshold
        self.data_cache = []

    def process_telemetry(self, raw_data: List[Dict]) -> pd.DataFrame:
        df = pd.DataFrame(raw_data)
        if df.empty:
            raise ValueError("No data provided")
        df['efficiency_score'] = df['flow_rate'] / (df['power_kw'] + 1e-5)
        self.data_cache.append(df)
        return df

    def check_anomalies(self, df: pd.DataFrame) -> List[str]:
        anomalies = []
        for idx, row in df.iterrows():
            if row['vibration_mms'] > self.threshold:
                anomalies.append(f"High vibration at index {idx}: {row['vibration_mms']}")
        return anomalies

def run_test_cases():
    analyzer = PumpEfficiencyAnalyzer()
    test_data = [
        {'flow_rate': 120, 'power_kw': 15, 'vibration_mms': 6.2},
        {'flow_rate': 115, 'power_kw': 16, 'vibration_mms': 8.5},
        {'flow_rate': 110, 'power_kw': 14, 'vibration_mms': 4.1}
    ]
    
    df = analyzer.process_telemetry(test_data)
    warnings = analyzer.check_anomalies(df)
    
    print(f"Processed {len(df)} records.")
    print(f"Detected {len(warnings)} anomalies.")
    for w in warnings:
        print(f" - {w}")
    return True

if __name__ == '__main__':
    run_test_cases()`
          };
        } else if (generation.questionType === "engineering") {
          path = "complex";
          content = "Engineering analysis is complete. I have evaluated the stress constraints and generated the requested CAD blueprint/drawing. Safety factors are within standards.";
          artifactDetails = { 
            name: "P102_Bearing_Design.cad", 
            status: "pending_approval", 
            type: "drawing" 
          };
        }
        
        const aiMsg: Message = {
          id: Date.now(),
          role: "assistant",
          content,
          meta: { 
            path: path as ExecutionPath, 
            agent: mode === "manual" ? selectedAgent : 
                   generation.questionType === "coding" ? "Coding Agent" : 
                   generation.questionType === "engineering" ? "Engineering Agent" : "Auto Selected", 
            model: "Sovereign-1 (Local)", 
            verified: true,
            generationSteps: [...newSteps]
          },
          artifact: generation.artifactGen ? artifactDetails : undefined
        };
        
        setMessages((prev) => [...prev, aiMsg]);
        setGeneration(null);
      }
    }, 500); // 500ms tick

    return () => clearInterval(interval);
  }, [generation?.active, generation?.startTime, generation?.duration, generation?.questionType, generation?.artifactGen, mode, selectedAgent]);

  const approveArtifact = (msgId: number) => {
    setMessages((prev) => prev.map(m => m.id === msgId && m.artifact ? { ...m, artifact: { ...m.artifact, status: "approved" } } : m));
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Single Compact Header */}
      <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-slate-200 flex-shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-slate-500">Project:</span>
          <span className="text-sm font-semibold text-slate-900 truncate max-w-[200px]">{currentProject.name}</span>
          <span className="text-[10px] px-2 py-0.5 rounded-md font-semibold bg-amber-100 text-amber-800 border border-amber-200">
            🔒 {currentProject.cls}
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 mr-2">
            <span className="text-xs text-slate-500 mr-2">{currentProject.contributors?.length || 0} contributors</span>
            <div className="flex -space-x-2">
              {currentProject.contributors?.slice(0, 3).map((c, i) => (
                <div
                  key={i}
                  title={c}
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold text-white border-2 border-white shadow-sm"
                  style={{ background: ["#0F766E", "#2563EB", "#7C3AED"][i % 3] }}
                >
                  {c.split(" ").map(n => n[0]).join("")}
                </div>
              ))}
              {currentProject.contributors?.length > 3 && (
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold bg-slate-200 text-slate-600 border-2 border-white shadow-sm">
                  +{currentProject.contributors.length - 3}
                </div>
              )}
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
                value={currentProjectName}
                onChange={(e) => setCurrentProjectName(e.target.value)}
                className="text-sm font-medium text-slate-700 border border-slate-300 rounded-md px-2 py-1.5 outline-none bg-white cursor-pointer w-full truncate shadow-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500" 
                title="Select Project"
              >
                {projects.map(p => (
                  <option key={p.name} value={p.name}>{p.name}</option>
                ))}
              </select>
              <button onClick={() => setLeftCollapsed(true)} className="text-slate-400 hover:text-slate-700 transition-colors p-1.5 rounded-md hover:bg-slate-200 flex-shrink-0" title="Close chat history">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
            </div>
            
            <div className="p-4 border-b border-slate-100 relative">
              <button 
                onClick={() => setShowNewChatMenu(!showNewChatMenu)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm" title="Start a fresh chat">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
                New Chat
              </button>
              
              {showNewChatMenu && (
                <div className="absolute top-14 left-4 right-4 bg-white border border-slate-200 shadow-xl rounded-xl p-1 z-20 animate-in fade-in zoom-in-95">
                  <button 
                    onClick={() => handleNewChat("Project")}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-teal-50 hover:text-teal-700 font-medium transition-colors"
                  >
                    📝 Project Chat
                  </button>
                  <button 
                    onClick={() => handleNewChat("Personal")}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-teal-50 hover:text-teal-700 font-medium transition-colors"
                  >
                    🔒 Personal Chat
                  </button>
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
              <div className="text-xs font-bold text-slate-400 tracking-wider uppercase px-2 mb-2 mt-1">Recent Chats</div>
              {recentChats.map((chat, i) => (
                <button 
                  key={chat.id} 
                  onClick={() => loadChat(chat)}
                  className={`w-full flex flex-col items-start px-3 py-2 rounded-lg transition-colors truncate ${i === 0 ? "bg-slate-100" : "hover:bg-slate-50"}`} 
                  title={`Load chat: ${chat.title}`}
                >
                  <span className={`text-sm truncate w-full text-left ${i === 0 ? "text-slate-900 font-medium" : "text-slate-600"}`}>
                    {chat.title}
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded mt-1 font-bold ${chat.type === "Project" ? "bg-blue-100 text-blue-700" : chat.type === "Personal" ? "bg-purple-100 text-purple-700" : "bg-teal-100 text-teal-700"}`}>
                    {chat.type}
                  </span>
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
          <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8 flex flex-col">
            
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
                  {msg.graph && <ChartRenderer graph={msg.graph} />}
                  {msg.graph_2 && <ChartRenderer graph={msg.graph_2} />}
                  {msg.artifact && (
                    <div className="mt-4 p-4 bg-white border border-slate-200 rounded-xl flex flex-col shadow-sm">
                      {/* Top Row: Icon, Info, and Action Button */}
                      <div className="flex items-start justify-between w-full">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 shadow-sm border border-teal-100 shrink-0">
                            {msg.artifact.type === "code" ? (
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                            ) : msg.artifact.type === "drawing" ? (
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                            ) : (
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                            )}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-800">{msg.artifact.name}</div>
                            <div className="text-[11px] text-slate-500 mt-0.5">
                              {msg.artifact.status === "pending_approval" ? "Awaiting your approval to save..." : "Approved & Saved"}
                            </div>
                          </div>
                        </div>

                        {/* Action Button (View in Sandbox, View Document, etc.) */}
                        <div className="flex items-center">
                          {msg.artifact.type === "code" && (
                            <button 
                              onClick={() => {
                                if (msg.artifact!.content) setPendingSandboxTask(msg.artifact!.content);
                                navigate("sandbox");
                              }} 
                              className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-lg transition-colors shadow-sm"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                              View in Sandbox
                            </button>
                          )}
                          {msg.artifact.type === "drawing" && (
                            <button onClick={() => setViewingDrawing(true)} className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-lg transition-colors shadow-sm">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                              View Drawing
                            </button>
                          )}
                          {msg.artifact.type === "doc" && (
                            <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-lg transition-colors shadow-sm">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                              Open Document
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Approvals Row */}
                      <div className="mt-4 flex items-center justify-between w-full border-t border-slate-100 pt-3">
                        <span className="text-xs text-slate-400 font-medium tracking-wide uppercase">AI Action Required</span>
                        {msg.artifact.status === "pending_approval" ? (
                          <div className="flex items-center gap-2">
                            <button onClick={() => approveArtifact(msg.id)} className="text-xs px-5 py-1.5 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-700 transition-colors shadow-sm">Approve</button>
                            <button className="text-xs px-5 py-1.5 bg-white border border-slate-200 text-slate-600 font-semibold rounded-md hover:bg-slate-50 transition-colors shadow-sm">Reject</button>
                          </div>
                        ) : (
                          <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded border border-green-200 uppercase tracking-wider shadow-sm">✓ Approved</span>
                        )}
                      </div>
                    </div>
                  )}
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

                  {/* Persistent Generation Steps */}
                  {msg.meta?.generationSteps && (
                    <details className="mt-4 rounded-2xl bg-slate-50 border border-slate-100 shadow-inner w-full group overflow-hidden">
                      <summary className="text-xs font-bold text-slate-500 uppercase tracking-wider p-4 cursor-pointer hover:bg-slate-100 transition-colors list-none flex items-center justify-between outline-none">
                        <span className="flex items-center gap-2">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-teal-600"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                          Execution Log
                        </span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-open:rotate-180 transition-transform duration-200">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </summary>
                      <div className="flex flex-col gap-2 px-4 pb-4 border-t border-slate-100 pt-3">
                        {msg.meta.generationSteps.map((step, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                            <span className="text-[12px] text-slate-500 font-medium line-through decoration-slate-300">
                              {step.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </details>
                  )}
                </div>
              </div>
            ))}

            {/* Generation Indicator */}
            {generation?.active && (
              <div className="flex justify-start mb-8">
                <div className="max-w-3xl flex flex-col items-start gap-2">
                  <div className="flex items-center gap-2.5 ml-1">
                    <div className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold bg-teal-600 text-white shadow-sm animate-pulse">
                      AI
                    </div>
                    <span className="text-sm font-semibold text-slate-700">Sovereign AI Thinking...</span>
                  </div>
                  <div className="rounded-2xl p-5 bg-white border border-slate-200 shadow-sm rounded-tl-sm min-w-[320px]">
                    <div className="flex flex-col gap-3 mb-4">
                      {generation.steps.map((step, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          {step.status === "completed" ? (
                            <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                          ) : step.status === "active" ? (
                            <div className="w-4 h-4 rounded-full border-2 border-slate-200 border-t-teal-500 animate-spin flex-shrink-0"></div>
                          ) : (
                            <div className="w-4 h-4 rounded-full border-2 border-slate-200 flex-shrink-0"></div>
                          )}
                          <span className={`text-[13px] ${step.status === "active" ? "font-semibold text-slate-800" : step.status === "completed" ? "text-slate-500 line-through" : "text-slate-400"}`}>
                            {step.label}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                      <div className="h-full bg-teal-500 transition-all duration-500 ease-linear" style={{ width: `${generation.progress}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Drawing Modal */}
          {viewingDrawing && (
            <div className="absolute inset-0 z-50 flex items-center justify-center p-8 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl flex flex-col overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">P102_Bearing_Design.cad</h2>
                    <div className="text-xs text-slate-500 mt-0.5">Engineering Drawing · P-102 Feed Transfer Pump</div>
                  </div>
                  <button onClick={() => setViewingDrawing(false)} className="text-sm px-4 py-2 rounded-lg font-medium text-white bg-teal-600 hover:bg-teal-700 transition-colors">
                    Close
                  </button>
                </div>
                <div className="flex-1 overflow-auto bg-slate-100 p-6 flex justify-center items-center">
                  <img src="/engineering_drawing.png" alt="Engineering Drawing" className="max-w-full max-h-[70vh] rounded shadow-md object-contain bg-white border border-slate-200" />
                </div>
              </div>
            </div>
          )}

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
                  { label: "Documents", count: `${currentProject.artifacts} files`, icon: "◧", color: "text-blue-500" },
                  { label: "Knowledge", count: "1.2K chunks", icon: "◈", color: "text-purple-500" },
                  { label: "Database", count: "MRPL PostgreSQL", icon: "⬡", color: "text-teal-500" },
                  { label: "Notes", count: "3 notes", icon: "◪", color: "text-amber-500" },
                  { label: "Contributors", count: `${currentProject.contributors?.length || 0} active`, icon: "◯", color: "text-rose-500" },
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
