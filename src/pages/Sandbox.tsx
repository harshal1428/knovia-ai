import React, { useState, useEffect, useRef } from "react";

const securityChecks = [
  { label: "Network Disabled", ok: true },
  { label: "Filesystem Isolated", ok: true },
  { label: "CPU Limit (2 cores)", ok: true },
  { label: "Memory Limit (512 MB)", ok: true },
  { label: "Timeout (300s)", ok: true },
  { label: "Temporary Workspace", ok: true },
  { label: "Host Isolation", ok: true },
];

const executionSteps = [
  { step: "Code", status: "done" },
  { step: "Sandbox", status: "done" },
  { step: "Tests", status: "pending" },
  { step: "Results", status: "pending" },
  { step: "Verified", status: "pending" },
];

const terminalLines = [
  { text: "$ docker run --rm --network=none --cpus=2 --memory=512m mrpl-sandbox:latest", color: "#22D3EE" },
  { text: "Sandbox initialized — network disabled, filesystem isolated", color: "#94A3B8" },
  { text: "$ pip install -r requirements.txt --no-index --find-links /offline-packages/", color: "#22D3EE" },
  { text: "Installing packages from offline registry...", color: "#94A3B8" },
  { text: "Successfully installed pandas-2.1.0 numpy-1.26.0 scipy-1.11.0", color: "#86EFAC" },
  { text: "$ python -m pytest tests/ -v --tb=short", color: "#22D3EE" },
  { text: "collected 18 items", color: "#94A3B8" },
  { text: "", color: "" },
  { text: "tests/test_vibration.py::test_threshold_detection PASSED", color: "#86EFAC" },
  { text: "tests/test_vibration.py::test_exceedance_calc PASSED", color: "#86EFAC" },
  { text: "tests/test_vibration.py::test_report_generation PASSED", color: "#86EFAC" },
  { text: "tests/test_data.py::test_csv_loading PASSED", color: "#86EFAC" },
  { text: "...14 more tests...", color: "#94A3B8" },
  { text: "", color: "" },
  { text: "====== 18 passed in 2.14s ======", color: "#86EFAC" },
  { text: "Sandbox session complete — workspace destroyed", color: "#94A3B8" },
];

export default function Sandbox() {
  const [activeTab, setActiveTab] = useState("Terminal");
  const [isRunning, setIsRunning] = useState(false);
  const [termLines, setTermLines] = useState<typeof terminalLines>([]);
  const [execSteps, setExecSteps] = useState(executionSteps);
  const [stats, setStats] = useState({ passed: "-", duration: "-", status: "pending" });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const runSandbox = () => {
    if (isRunning) return;
    setIsRunning(true);
    setTermLines([]);
    setExecSteps([
      { step: "Code", status: "done" },
      { step: "Sandbox", status: "done" },
      { step: "Tests", status: "running" },
      { step: "Results", status: "pending" },
      { step: "Verified", status: "pending" },
    ]);
    setStats({ passed: "-", duration: "-", status: "running" });
    setActiveTab("Terminal");

    let lineIdx = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (lineIdx < terminalLines.length) {
        setTermLines(prev => [...prev, terminalLines[lineIdx]]);
        lineIdx++;

        if (lineIdx === 9) {
          setExecSteps(prev => prev.map(s => s.step === "Tests" ? { ...s, status: "done" } : s.step === "Results" ? { ...s, status: "running" } : s));
        }
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsRunning(false);
        setExecSteps(prev => prev.map(s => s.step === "Results" ? { ...s, status: "done" } : s.step === "Verified" ? { ...s, status: "done" } : s));
        setStats({ passed: "18", duration: "2.14s", status: "done" });
      }
    }, 300);
  };

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: "var(--color-bg-secondary)" }}>
      <div className="max-w-5xl mx-auto px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold" style={{ color: "var(--color-text-primary)" }}>Isolated Execution Sandbox</h1>
            <p className="text-sm mt-0.5" style={{ color: "var(--color-text-muted)" }}>Code executes in a fully isolated, temporary container environment</p>
          </div>
          <div className="flex gap-2">
            <button className="text-xs px-3 py-2 rounded border font-medium hover:bg-slate-50 transition-colors" style={{ borderColor: "var(--color-border)", color: "var(--color-text-secondary)" }}>View Diff</button>
            <button className="text-xs px-3 py-2 rounded border font-medium hover:bg-slate-50 transition-colors" style={{ borderColor: "var(--color-border)", color: "var(--color-text-secondary)" }}>Rollback</button>
            <button onClick={runSandbox} disabled={isRunning} className="text-xs px-4 py-2 rounded font-medium text-white transition-colors disabled:opacity-50 hover:bg-teal-700" style={{ background: "var(--color-teal)" }}>
              {isRunning ? "Running Sandbox..." : "Run Sandbox"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Left — Security + Results */}
          <div className="space-y-4">
            {/* Security Status */}
            <div className="bg-white rounded border p-5" style={{ borderColor: "var(--color-border)" }}>
              <div className="font-semibold text-sm mb-3" style={{ color: "var(--color-text-primary)" }}>Sandbox Security</div>
              {securityChecks.map((check) => (
                <div key={check.label} className="flex items-center gap-2 py-1.5">
                  <span className="text-sm" style={{ color: check.ok ? "#15803D" : "#DC2626" }}>{check.ok ? "🟢" : "🔴"}</span>
                  <span className="text-xs font-medium" style={{ color: check.ok ? "#15803D" : "#DC2626" }}>{check.label}</span>
                </div>
              ))}
            </div>

            {/* Test Results */}
            <div className="bg-white rounded border p-5" style={{ borderColor: "var(--color-border)" }}>
              <div className="font-semibold text-sm mb-3" style={{ color: "var(--color-text-primary)" }}>Test Results</div>
              <div className="space-y-2">
                {[
                  { label: "Tests", value: "18", color: "var(--color-text-primary)" },
                  { label: "Passed", value: stats.passed, color: stats.status === "done" ? "var(--color-success)" : "var(--color-text-muted)" },
                  { label: "Failed", value: stats.status === "done" ? "0" : "-", color: "var(--color-text-muted)" },
                  { label: "Duration", value: stats.duration, color: "var(--color-text-secondary)" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between text-sm">
                    <span style={{ color: "var(--color-text-muted)", fontSize: 13 }}>{item.label}</span>
                    <span className="font-semibold" style={{ color: item.color }}>{item.value}</span>
                  </div>
                ))}
              </div>
              {stats.status === "done" && (
                <div className="mt-4 py-3 rounded text-center font-semibold" style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", color: "#15803D" }}>
                  ✓ VERIFIED
                </div>
              )}
            </div>

            {/* Execution Timeline */}
            <div className="bg-white rounded border p-5" style={{ borderColor: "var(--color-border)" }}>
              <div className="font-semibold text-sm mb-3" style={{ color: "var(--color-text-primary)" }}>Execution Flow</div>
              <div className="space-y-2">
                {execSteps.map((s, i) => (
                  <div key={s.step} className="flex items-center gap-2">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
                      style={{
                        background: s.status === "done" ? "var(--color-teal)" : s.status === "running" ? "#EFF6FF" : "var(--color-border)",
                        color: s.status === "done" ? "white" : s.status === "running" ? "var(--color-blue)" : "var(--color-text-muted)",
                        border: s.status === "running" ? "1.5px solid var(--color-blue)" : "none",
                        fontSize: 9,
                      }}
                    >
                      {s.status === "done" ? "✓" : i + 1}
                    </div>
                    <span className="text-xs font-medium" style={{ color: s.status === "done" ? "var(--color-teal)" : s.status === "running" ? "var(--color-blue)" : "var(--color-text-muted)" }}>
                      {s.step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Terminal */}
          <div className="col-span-2">
            <div className="rounded-lg overflow-hidden h-full" style={{ background: "#0F172A", border: "1px solid #334155" }}>
              {/* Tabs */}
              <div className="flex border-b" style={{ background: "#1E293B", borderColor: "#334155" }}>
                {["Terminal", "Logs", "Diff"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="px-4 py-2 text-xs"
                    style={{ color: activeTab === tab ? "#F1F5F9" : "#64748B", borderBottom: activeTab === tab ? "1px solid #0F766E" : "1px solid transparent" }}
                  >
                    {tab}
                  </button>
                ))}
                <div className="ml-auto flex items-center pr-3 gap-2">
                  <span className="text-xs px-2 py-0.5 rounded font-medium" style={{ background: isRunning ? "#064E3B" : "#1E293B", color: isRunning ? "#6EE7B7" : "#475569", fontSize: 10 }}>
                    {isRunning ? "● Running" : "○ Idle"}
                  </span>
                </div>
              </div>
              {/* Terminal output */}
              <div className="p-5 overflow-y-auto" style={{ height: 520 }}>
                {termLines.length === 0 ? (
                   <div style={{ color: "#64748B", fontFamily: "var(--font-mono)", fontSize: 12 }}>Ready. Press "Run Sandbox" to initialize environment.</div>
                ) : (
                  termLines.map((line, i) => (
                    <div key={i} className="text-xs leading-6" style={{ fontFamily: "var(--font-mono)", color: line.color || "#334155", minHeight: 20 }}>
                      {line.text}
                    </div>
                  ))
                )}
                {isRunning && (
                  <div className="flex items-center mt-2">
                    <span className="text-xs" style={{ color: "#22D3EE", fontFamily: "var(--font-mono)" }}>$ _</span>
                    <span className="w-1.5 h-4 ml-0.5 animate-pulse" style={{ background: "#22D3EE" }} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
