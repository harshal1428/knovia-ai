import { useState, useRef, useEffect } from "react";
import { useNav } from "../context/NavContext";

const files = [
  { name: "main.py", type: "python", size: "4.2 KB" },
  { name: "analysis.py", type: "python", size: "8.1 KB" },
  { name: "utils.py", type: "python", size: "2.3 KB" },
  { name: "tests/", type: "folder", size: "" },
  { name: "  test_analysis.py", type: "python", size: "3.8 KB" },
  { name: "  test_utils.py", type: "python", size: "1.9 KB" },
  { name: "requirements.txt", type: "text", size: "0.3 KB" },
];

const sampleCode = `import pandas as pd
import numpy as np
from analysis import EquipmentAnalyzer

def analyze_vibration_data(sensor_file: str) -> dict:
    """Analyze pump vibration readings against SOP thresholds."""
    df = pd.read_csv(sensor_file)

    # P-102 SOP threshold: 7.1 mm/s
    SOP_THRESHOLD = 7.1

    results = {
        "max_vibration": df["vibration_mms"].max(),
        "mean_vibration": df["vibration_mms"].mean(),
        "threshold_exceeded": df["vibration_mms"].max() > SOP_THRESHOLD,
        "exceedance_pct": round(
            (df["vibration_mms"].max() - SOP_THRESHOLD) / SOP_THRESHOLD * 100, 2
        ),
    }

    return results

if __name__ == "__main__":
    results = analyze_vibration_data("sensor_data.csv")
    print(f"Max vibration: {results['max_vibration']} mm/s")
    print(f"Threshold exceeded: {results['threshold_exceeded']}")`;

const terminalOutput = `$ python -m pytest tests/ -v
collected 12 items

tests/test_analysis.py::test_vibration_threshold PASSED    [ 8%]
tests/test_analysis.py::test_exceedance_calculation PASSED  [16%]
tests/test_analysis.py::test_edge_cases PASSED             [25%]
tests/test_utils.py::test_data_loading PASSED              [33%]
tests/test_utils.py::test_normalization PASSED             [41%]
tests/test_utils.py::test_export_formats PASSED            [50%]
...

============================== 12 passed in 1.34s ==============================`;

const executionTimeline = [
  { step: "Analyze", status: "done" },
  { step: "Read", status: "done" },
  { step: "Modify", status: "done" },
  { step: "Sandbox", status: "done" },
  { step: "Test", status: "done" },
  { step: "Detect Error", status: "done" },
  { step: "AI Fix", status: "done" },
  { step: "Retest", status: "done" },
  { step: "Verify", status: "running" },
  { step: "Checkpoint", status: "pending" },
];

export default function CodingWorkspace() {
  const { navigate } = useNav();
  const [activeFile, setActiveFile] = useState("main.py");
  const [terminalTab, setTerminalTab] = useState("Terminal");
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "ai", text: "Coding Agent initialized. Repository context loaded. I can analyze code, generate tests, fix errors, and run the sandbox." }
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const [termLines, setTermLines] = useState<string[]>([]);
  const [testStats, setTestStats] = useState("");
  const [activeTabContent, setActiveTabContent] = useState(sampleCode);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const runTests = () => {
    if (isRunning) return;
    setIsRunning(true);
    setTerminalTab("Terminal");
    setTermLines(["$ python -m pytest tests/ -v"]);
    setTestStats("");
    
    let step = 0;
    const testLines = [
      "collected 12 items\n",
      "tests/test_analysis.py::test_vibration_threshold PASSED    [ 8%]",
      "tests/test_analysis.py::test_exceedance_calculation PASSED  [16%]",
      "tests/test_analysis.py::test_edge_cases PASSED             [25%]",
      "tests/test_utils.py::test_data_loading PASSED              [33%]",
      "tests/test_utils.py::test_normalization PASSED             [41%]",
      "tests/test_utils.py::test_export_formats PASSED            [50%]",
      "...",
      "============================== 12 passed in 1.34s =============================="
    ];

    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (step < testLines.length) {
        setTermLines(prev => [...prev, testLines[step]]);
        step++;
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsRunning(false);
        setTestStats("All 12 tests passed ✓\n\ntest_vibration_threshold PASSED\ntest_exceedance_calculation PASSED\ntest_edge_cases PASSED\n...");
      }
    }, 400);
  };

  const send = () => {
    if (!chatInput.trim() || isRunning) return;
    setMessages([...messages, { role: "user", text: chatInput }]);
    setChatInput("");
    setIsRunning(true);
    
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "ai", text: "Analyzing repository structure...\n\n✓ 3 Python files, 2 test files\n⚠ 2 tests failing in test_analysis.py — threshold validation logic has an off-by-one error on line 34.\n\nFix applied. Running tests..." }]);
      setActiveTabContent(sampleCode.replace("> SOP_THRESHOLD", ">= SOP_THRESHOLD"));
      runTests();
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full" style={{ background: "#0F172A" }}>
      {/* Header */}
      <div className="flex items-center gap-4 px-4 py-2.5 border-b flex-shrink-0" style={{ background: "#1E293B", borderColor: "#334155" }}>
        <span className="text-sm font-semibold" style={{ color: "#F1F5F9" }}>Coding Workspace</span>
        <span className="text-xs px-2 py-0.5 rounded font-medium" style={{ background: "#0F766E", color: "white", fontSize: 10 }}>CDU-4 Analysis Repo</span>
        <div className="flex items-center gap-2 ml-auto">
          <button onClick={() => navigate("sandbox")} className="text-xs px-3 py-1.5 rounded font-medium transition-colors hover:bg-slate-700" style={{ background: "#1E3A5F", color: "#93C5FD", fontSize: 11 }}>Open Sandbox</button>
          <button onClick={runTests} disabled={isRunning} className="text-xs px-3 py-1.5 rounded font-medium transition-colors hover:bg-emerald-800 disabled:opacity-50" style={{ background: "#064E3B", color: "#6EE7B7", fontSize: 11 }}>{isRunning ? "Running..." : "▶ Run"}</button>
          <button className="text-xs px-3 py-1.5 rounded font-medium transition-colors hover:bg-indigo-800" style={{ background: "#312E81", color: "#A5B4FC", fontSize: 11 }}>Create Checkpoint</button>
        </div>
      </div>

      {/* Execution Timeline */}
      <div className="flex items-center gap-2 px-4 py-2 overflow-x-auto flex-shrink-0" style={{ background: "#1E293B", borderBottom: "1px solid #334155" }}>
        {executionTimeline.map((step, i) => (
          <div key={step.step} className="flex items-center gap-1.5 flex-shrink-0">
            <div
              className="flex items-center gap-1.5 px-2 py-1 rounded text-xs"
              style={{
                background: step.status === "done" ? "#064E3B" : step.status === "running" ? "#1E3A5F" : "#1E293B",
                color: step.status === "done" ? "#6EE7B7" : step.status === "running" ? "#93C5FD" : "#475569",
                border: step.status === "running" ? "1px solid #3B82F6" : "1px solid transparent",
                fontSize: 11,
              }}
            >
              {step.status === "done" ? "✓" : step.status === "running" ? "◌" : "·"} {step.step}
            </div>
            {i < executionTimeline.length - 1 && <span style={{ color: "#334155" }}>→</span>}
          </div>
        ))}
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* File Explorer */}
        <div className="w-48 border-r flex flex-col flex-shrink-0" style={{ background: "#1E293B", borderColor: "#334155" }}>
          <div className="px-3 py-2 text-xs font-semibold" style={{ color: "#64748B", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Explorer
          </div>
          {files.map((f) => (
            <button
              key={f.name}
              onClick={() => !f.name.endsWith("/") && setActiveFile(f.name.trim())}
              className="w-full text-left px-3 py-1.5 text-xs hover:bg-slate-700 transition-colors"
              style={{
                color: activeFile === f.name.trim() ? "#6EE7B7" : f.type === "folder" ? "#94A3B8" : "#CBD5E1",
                background: activeFile === f.name.trim() ? "#0F2937" : "transparent",
                fontSize: 12,
              }}
            >
              {f.name}
            </button>
          ))}
        </div>

        {/* Editor */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b flex-shrink-0" style={{ background: "#1E293B", borderColor: "#334155" }}>
            {["main.py", "analysis.py"].map((t) => (
              <button
                key={t}
                onClick={() => setActiveFile(t)}
                className="px-4 py-2 text-xs border-r"
                style={{
                  borderColor: "#334155",
                  background: activeFile === t ? "#0F172A" : "transparent",
                  color: activeFile === t ? "#F1F5F9" : "#64748B",
                  borderTop: activeFile === t ? "1px solid #0F766E" : "1px solid transparent",
                }}
              >
                {t}
              </button>
            ))}
          </div>
          {/* Code */}
          <div className="flex-1 overflow-auto p-4">
            <pre className="text-xs leading-6" style={{ color: "#E2E8F0", fontFamily: "var(--font-mono)", fontSize: 12 }}>
              <code>{activeFile === "main.py" ? activeTabContent : "# Other file content..."}</code>
            </pre>
          </div>

          {/* Terminal */}
          <div className="border-t flex-shrink-0" style={{ borderColor: "#334155", height: 180 }}>
            <div className="flex border-b" style={{ background: "#1E293B", borderColor: "#334155" }}>
              {["Terminal", "Tests", "Problems"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTerminalTab(t)}
                  className="px-4 py-2 text-xs"
                  style={{ color: terminalTab === t ? "#F1F5F9" : "#64748B", borderBottom: terminalTab === t ? "1px solid #0F766E" : "1px solid transparent" }}
                >
                  {t === "Tests" ? "✓ Tests (12/12)" : t}
                </button>
              ))}
            </div>
            <div className="p-3 overflow-y-auto h-full flex flex-col gap-1">
              {terminalTab === "Terminal" ? (
                termLines.length === 0 ? (
                  <div style={{ color: "#64748B", fontFamily: "var(--font-mono)", fontSize: 11 }}>Ready. Press Run to execute tests.</div>
                ) : (
                  termLines.map((line, i) => (
                    <div key={i} style={{ color: line.includes("PASSED") ? "#86EFAC" : line.includes("error") ? "#F87171" : "#22D3EE", fontFamily: "var(--font-mono)", fontSize: 11 }}>{line}</div>
                  ))
                )
              ) : (
                <pre className="text-xs" style={{ color: "#86EFAC", fontFamily: "var(--font-mono)", fontSize: 11, lineHeight: 1.6 }}>{testStats}</pre>
              )}
              {isRunning && (
                <div className="flex items-center mt-1">
                  <span className="text-xs" style={{ color: "#22D3EE", fontFamily: "var(--font-mono)" }}>_</span>
                  <span className="w-1.5 h-3 ml-0.5 animate-pulse" style={{ background: "#22D3EE" }} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Coding Agent Chat */}
        <div className="w-72 border-l flex flex-col flex-shrink-0" style={{ background: "#1E293B", borderColor: "#334155" }}>
          <div className="px-4 py-2.5 border-b flex items-center gap-2" style={{ borderColor: "#334155" }}>
            <div className="w-5 h-5 rounded flex items-center justify-center text-xs font-semibold" style={{ background: "#0F766E", color: "white", fontSize: 9 }}>CA</div>
            <span className="text-xs font-medium" style={{ color: "#F1F5F9" }}>Coding Agent</span>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className="rounded px-3 py-2 text-xs max-w-full"
                  style={{
                    background: msg.role === "user" ? "#0F766E" : "#0F172A",
                    color: msg.role === "user" ? "white" : "#CBD5E1",
                    whiteSpace: "pre-wrap",
                    fontSize: 11,
                    border: msg.role === "ai" ? "1px solid #334155" : "none",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t" style={{ borderColor: "#334155" }}>
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") send(); }}
                placeholder="Ask the coding agent..."
                className="flex-1 px-3 py-2 rounded text-xs outline-none"
                style={{ background: "#0F172A", border: "1px solid #334155", color: "#F1F5F9", fontSize: 11 }}
              />
              <button onClick={send} className="px-3 py-2 rounded text-xs font-medium" style={{ background: "#0F766E", color: "white" }}>→</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
