import { useState } from "react";

const stages = ["Upload", "Security Scan", "Classification", "OCR / Parsing", "Metadata", "Chunking", "Embedding", "Index", "Ready"];

const documents = [
  { name: "CDU-4 Inspection Report Aug 2026", type: "PDF", size: "4.2 MB", dept: "Inspection Eng.", cls: "CONFIDENTIAL", status: "Ready", version: "1.0", date: "16 Sep 2026", pages: 47 },
  { name: "Inspection SOP – Pump P-102", type: "PDF", size: "1.8 MB", dept: "Maintenance Eng.", cls: "CONFIDENTIAL", status: "Ready", version: "3.2", date: "12 Aug 2026", pages: 28 },
  { name: "MRPL Equipment Vibration Limits", type: "PDF", size: "0.9 MB", dept: "Inspection Eng.", cls: "CONFIDENTIAL", status: "Ready", version: "2.1", date: "15 Mar 2026", pages: 12 },
  { name: "Vendor Evaluation Report CX-4", type: "DOCX", size: "2.1 MB", dept: "Procurement", cls: "INTERNAL", status: "Ready", version: "1.3", date: "10 Sep 2026", pages: 34 },
  { name: "Pipeline Anomaly Report 2026-08", type: "PDF", size: "6.7 MB", dept: "HSE", cls: "RESTRICTED", status: "Processing", version: "1.0", date: "16 Sep 2026", pages: 89 },
  { name: "CDU-4 Maintenance Log 2026", type: "XLSX", size: "0.4 MB", dept: "Operations", cls: "INTERNAL", status: "Ready", version: "—", date: "15 Sep 2026", pages: null },
];

const statusColors: Record<string, { bg: string; color: string }> = {
  Ready: { bg: "#DCFCE7", color: "#15803D" },
  Processing: { bg: "#DBEAFE", color: "#1D4ED8" },
  Failed: { bg: "#FEE2E2", color: "#991B1B" },
};

const clsColors: Record<string, { bg: string; color: string }> = {
  CONFIDENTIAL: { bg: "#FEF3C7", color: "#92400E" },
  INTERNAL: { bg: "#DBEAFE", color: "#1E40AF" },
  RESTRICTED: { bg: "#FEE2E2", color: "#991B1B" },
};

export default function Documents() {
  const [uploading, setUploading] = useState(false);
  const [uploadStage, setUploadStage] = useState(0);
  const [selectedDoc, setSelectedDoc] = useState<number | null>(null);

  const simulateUpload = () => {
    setUploading(true);
    setUploadStage(0);
    const interval = setInterval(() => {
      setUploadStage((s) => {
        if (s >= stages.length - 1) { clearInterval(interval); setTimeout(() => setUploading(false), 1000); return s; }
        return s + 1;
      });
    }, 600);
  };

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: "var(--color-bg-secondary)" }}>
      <div className="max-w-6xl mx-auto px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold" style={{ color: "var(--color-text-primary)" }}>Documents</h1>
            <p className="text-sm mt-0.5" style={{ color: "var(--color-text-muted)" }}>Document intelligence — upload, process, and query MRPL documents</p>
          </div>
          <button
            onClick={simulateUpload}
            className="text-sm px-4 py-2 rounded font-medium text-white"
            style={{ background: "var(--color-teal)" }}
          >
            ↑ Upload Document
          </button>
        </div>

        {/* Upload Progress */}
        {uploading && (
          <div className="mb-6 bg-white rounded border p-5" style={{ borderColor: "var(--color-teal)", borderWidth: 1.5 }}>
            <div className="flex items-center justify-between mb-4">
              <div className="font-medium text-sm" style={{ color: "var(--color-text-primary)" }}>Processing: CDU-4 Inspection Report.pdf</div>
              <span className="text-xs px-2 py-0.5 rounded font-medium" style={{ background: "#DBEAFE", color: "#1D4ED8" }}>Ingesting...</span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {stages.map((stage, i) => (
                <div key={stage} className="flex items-center gap-2 flex-shrink-0">
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border-2"
                      style={{
                        borderColor: i <= uploadStage ? "var(--color-teal)" : "var(--color-border)",
                        background: i < uploadStage ? "var(--color-teal)" : i === uploadStage ? "#F0FDFA" : "white",
                        color: i < uploadStage ? "white" : i === uploadStage ? "var(--color-teal)" : "var(--color-text-muted)",
                      }}
                    >
                      {i < uploadStage ? "✓" : i + 1}
                    </div>
                    <span className="text-xs text-center" style={{ color: i <= uploadStage ? "var(--color-teal)" : "var(--color-text-muted)", fontSize: 10, width: 60 }}>{stage}</span>
                  </div>
                  {i < stages.length - 1 && (
                    <div className="h-0.5 w-6 mb-4 flex-shrink-0" style={{ background: i < uploadStage ? "var(--color-teal)" : "var(--color-border)" }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Conflict Detection Alert */}
        <div className="mb-6 bg-white rounded border p-4" style={{ borderColor: "#D97706", borderWidth: 1.5 }}>
          <div className="flex items-start gap-3">
            <span className="text-base mt-0.5">⚠️</span>
            <div className="flex-1">
              <div className="font-semibold text-sm" style={{ color: "var(--color-text-primary)" }}>Source Conflict Detected</div>
              <div className="text-xs mt-1" style={{ color: "var(--color-text-secondary)" }}>
                3 documents contain conflicting operating limits for Pump P-102 seal pressure.
              </div>
              <div className="flex items-center gap-3 mt-3">
                {[
                  { doc: "SOP P-102", ver: "3.2", status: "Approved", date: "2026" },
                  { doc: "SOP P-102", ver: "2.8", status: "Superseded", date: "2025" },
                  { doc: "Rev Memo", ver: "3.1", status: "Draft", date: "2026" },
                ].map((d) => (
                  <div key={d.ver} className="flex-1 px-3 py-2 rounded border text-xs" style={{ borderColor: "var(--color-border)", background: "var(--color-surface-subtle)" }}>
                    <div className="font-medium" style={{ color: "var(--color-text-primary)" }}>{d.doc} v{d.ver}</div>
                    <div style={{ color: "var(--color-text-muted)" }}>{d.status} · {d.date}</div>
                  </div>
                ))}
                <div className="flex flex-col gap-1">
                  <button className="text-xs px-2 py-1 rounded font-medium" style={{ background: "var(--color-teal)", color: "white" }}>Use v3.2</button>
                  <button className="text-xs px-2 py-1 rounded border" style={{ borderColor: "var(--color-border)", color: "var(--color-text-secondary)" }}>Use All</button>
                  <button className="text-xs px-2 py-1 rounded border" style={{ borderColor: "var(--color-border)", color: "var(--color-text-secondary)" }}>Ask Me</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Documents Table */}
        <div className="bg-white rounded border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
          <div className="flex items-center gap-3 px-5 py-3 border-b" style={{ borderColor: "var(--color-border)" }}>
            <input type="text" placeholder="Search documents..." className="flex-1 max-w-xs px-3 py-1.5 text-sm rounded border outline-none" style={{ borderColor: "var(--color-border)", fontSize: 13 }} />
            <select className="text-xs border rounded px-2 py-1.5 outline-none" style={{ borderColor: "var(--color-border)", color: "var(--color-text-secondary)" }}>
              <option>All Types</option>
              <option>PDF</option>
              <option>DOCX</option>
              <option>XLSX</option>
            </select>
            <select className="text-xs border rounded px-2 py-1.5 outline-none" style={{ borderColor: "var(--color-border)", color: "var(--color-text-secondary)" }}>
              <option>All Status</option>
              <option>Ready</option>
              <option>Processing</option>
            </select>
          </div>
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                {["Document", "Type", "Department", "Version", "Date", "Status", "Classification", ""].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "var(--color-text-muted)", background: "var(--color-surface-subtle)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {documents.map((doc, i) => (
                <tr
                  key={i}
                  className="hover:bg-slate-50 cursor-pointer transition-colors"
                  style={{ borderBottom: i < documents.length - 1 ? "1px solid var(--color-border)" : "none" }}
                  onClick={() => setSelectedDoc(i === selectedDoc ? null : i)}
                >
                  <td className="px-5 py-3.5">
                    <div className="font-medium text-sm" style={{ color: "var(--color-text-primary)", fontSize: 13 }}>{doc.name}</div>
                    <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>{doc.size}{doc.pages ? ` · ${doc.pages} pages` : ""}</div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: "var(--color-surface-subtle)", color: "var(--color-text-secondary)", fontSize: 11 }}>{doc.type}</span>
                  </td>
                  <td className="px-5 py-3.5 text-xs" style={{ color: "var(--color-text-secondary)" }}>{doc.dept}</td>
                  <td className="px-5 py-3.5 text-xs" style={{ color: "var(--color-text-secondary)" }}>v{doc.version}</td>
                  <td className="px-5 py-3.5 text-xs" style={{ color: "var(--color-text-muted)" }}>{doc.date}</td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs px-2 py-0.5 rounded font-medium" style={{ background: statusColors[doc.status]?.bg, color: statusColors[doc.status]?.color, fontSize: 11 }}>{doc.status}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs px-1.5 py-0.5 rounded font-medium" style={{ background: clsColors[doc.cls]?.bg, color: clsColors[doc.cls]?.color, fontSize: 10 }}>{doc.cls}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-1">
                      <button className="text-xs px-2 py-1 rounded border hover:bg-slate-100" style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)", fontSize: 11 }}>View</button>
                      <button className="text-xs px-2 py-1 rounded border hover:bg-slate-100" style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)", fontSize: 11 }}>Query</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
