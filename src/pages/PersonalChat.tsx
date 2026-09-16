import { useState } from "react";

const conversations = [
  { id: 1, title: "Refinery process optimization ideas", preview: "What are best practices for...", time: "Today", temp: false },
  { id: 2, title: "CDU turnaround draft summary", preview: "Summarize the key points from...", time: "Yesterday", temp: false },
  { id: 3, title: "Temporary Chat", preview: "This chat is not saved...", time: "2 hrs ago", temp: true },
  { id: 4, title: "Career development options", preview: "Can you help me think through...", time: "3 days ago", temp: false },
];

export default function PersonalChat() {
  const [activeConv, setActiveConv] = useState(1);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "user", text: "What are some best practices for catalyst management in a refinery?" },
    { role: "ai", text: "Catalyst management best practices in refinery operations include:\n\n1. **Activity monitoring** — Regular sampling and testing to track deactivation rate.\n2. **Regeneration scheduling** — Planned cycles before activity falls below minimum threshold.\n3. **Poison management** — Feedstock pre-treatment to remove sulfur, metals, and nitrogen compounds.\n4. **Temperature control** — Avoid sintering by maintaining gradual temperature ramps.\n5. **Loading/unloading protocols** — Dust-free handling to prevent bed channeling.\n\nWould you like me to go deeper on any of these?" },
  ]);

  const send = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", text: input }, { role: "ai", text: "I'll help you with that. This is your personal workspace — responses here use general knowledge only, not MRPL organizational sources." }]);
    setInput("");
  };

  return (
    <div className="flex h-full" style={{ background: "#F7F9FC" }}>
      {/* Sidebar */}
      <div className="w-72 border-r bg-white flex-shrink-0 flex flex-col" style={{ borderColor: "var(--color-border)" }}>
        {/* Header */}
        <div className="px-5 py-4 border-b" style={{ borderColor: "var(--color-border)" }}>
          <h1 className="font-semibold text-sm" style={{ color: "var(--color-text-primary)" }}>Personal Chat</h1>
          <p className="text-xs mt-0.5 mb-3" style={{ color: "var(--color-text-muted)" }}>Private workspace for your own conversations</p>
          {/* Context Indicator */}
          <div className="flex items-center gap-2 px-3 py-2 rounded text-xs" style={{ background: "#F0F9FF", border: "1px solid #BAE6FD", color: "var(--color-info)" }}>
            <span>◯</span>
            <span className="font-medium">Personal Context</span>
          </div>
          <div className="text-xs mt-1.5 px-3" style={{ color: "var(--color-text-muted)" }}>
            Organizational knowledge is <strong>disabled</strong> in Personal Chat
          </div>
        </div>

        <div className="px-4 py-2">
          <button className="w-full text-xs px-3 py-2 rounded font-medium text-white" style={{ background: "var(--color-teal)" }}>
            + New Conversation
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setActiveConv(conv.id)}
              className="w-full text-left px-4 py-3.5 border-b hover:bg-slate-50 transition-colors"
              style={{
                borderColor: "var(--color-border)",
                background: activeConv === conv.id ? "#F0FDFA" : "transparent",
                borderRight: activeConv === conv.id ? "2px solid var(--color-teal)" : "2px solid transparent",
              }}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    {conv.temp && (
                      <span className="text-xs px-1 py-0.5 rounded" style={{ background: "#F1F5F9", color: "#64748B", fontSize: 10 }}>Temp</span>
                    )}
                    <span className="font-medium text-sm truncate" style={{ color: "var(--color-text-primary)", fontSize: 12 }}>{conv.title}</span>
                  </div>
                  <div className="text-xs truncate mt-0.5" style={{ color: "var(--color-text-muted)" }}>{conv.preview}</div>
                </div>
                <span className="text-xs flex-shrink-0" style={{ color: "var(--color-text-muted)", fontSize: 11 }}>{conv.time}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="bg-white border-b px-6 py-3.5 flex items-center justify-between flex-shrink-0" style={{ borderColor: "var(--color-border)" }}>
          <div>
            <div className="font-medium text-sm" style={{ color: "var(--color-text-primary)" }}>
              {conversations.find(c => c.id === activeConv)?.title}
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs px-2 py-0.5 rounded font-medium" style={{ background: "#F0F9FF", color: "var(--color-info)", fontSize: 10 }}>Personal Context</span>
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>General knowledge · No MRPL sources</span>
            </div>
          </div>
          <div className="flex gap-1">
            {["Rename", "Archive", "Delete"].map((a) => (
              <button key={a} className="text-xs px-2 py-1 rounded border hover:bg-slate-50" style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)", fontSize: 11 }}>{a}</button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-5">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className="max-w-2xl">
                {msg.role === "ai" && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded flex items-center justify-center text-xs font-semibold" style={{ background: "var(--color-blue)", color: "white", fontSize: 10 }}>AI</div>
                    <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>Personal AI · General Knowledge</span>
                  </div>
                )}
                <div
                  className="rounded-lg px-4 py-3 text-sm"
                  style={{
                    background: msg.role === "user" ? "var(--color-blue)" : "white",
                    color: msg.role === "user" ? "white" : "var(--color-text-primary)",
                    border: msg.role === "ai" ? "1px solid var(--color-border)" : "none",
                    whiteSpace: "pre-wrap",
                    fontSize: 13,
                  }}
                >
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t bg-white px-6 py-4 flex-shrink-0" style={{ borderColor: "var(--color-border)" }}>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") send(); }}
              placeholder="Ask anything — this is your private space..."
              className="flex-1 px-4 py-2.5 text-sm rounded border outline-none"
              style={{ borderColor: "var(--color-border)", fontSize: 13 }}
            />
            <button onClick={send} className="px-4 py-2 rounded text-sm font-medium text-white" style={{ background: "var(--color-blue)" }}>Send</button>
          </div>
          <p className="text-xs mt-2" style={{ color: "var(--color-text-muted)" }}>
            Personal Chat does not access MRPL organizational knowledge unless explicitly authorized.
          </p>
        </div>
      </div>
    </div>
  );
}
