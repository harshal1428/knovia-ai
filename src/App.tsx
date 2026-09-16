import { useState } from "react";
import { NavContext, Page } from "./context/NavContext";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Dashboard from "./pages/Dashboard";
import Workbench from "./pages/Workbench";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Tasks from "./pages/Tasks";
import Artifacts from "./pages/Artifacts";
import Approvals from "./pages/Approvals";
import KnowledgeBase from "./pages/KnowledgeBase";
import Documents from "./pages/Documents";
import ResearchNotebooks from "./pages/ResearchNotebooks";
import Notes from "./pages/Notes";
import Agents from "./pages/Agents";
import ModelRouter from "./pages/ModelRouter";
import Models from "./pages/Models";
import ToolRegistry from "./pages/ToolRegistry";
import OfflinePlugins from "./pages/OfflinePlugins";
import CodingWorkspace from "./pages/CodingWorkspace";
import Sandbox from "./pages/Sandbox";
import EngineeringAnalysis from "./pages/EngineeringAnalysis";
import EngineeringDrawings from "./pages/EngineeringDrawings";
import MultimodalWorkspace from "./pages/MultimodalWorkspace";
import PersonalChat from "./pages/PersonalChat";
import SecurityCenter from "./pages/SecurityCenter";
import RBAC from "./pages/RBAC";
import AuditTrail from "./pages/AuditTrail";
import SystemHealth from "./pages/SystemHealth";
import GPU from "./pages/GPU";
import NetworkSecurity from "./pages/NetworkSecurity";
import HelpCenter from "./pages/HelpCenter";
import Settings from "./pages/Settings";

function PageContent({ page }: { page: Page }) {
  switch (page) {
    case "dashboard": return <Dashboard />;
    case "workbench": return <Workbench />;
    case "projects": return <Projects />;
    case "project-detail": return <ProjectDetail />;
    case "tasks": return <Tasks />;
    case "artifacts": return <Artifacts />;
    case "approvals": return <Approvals />;
    case "knowledge-base": return <KnowledgeBase />;
    case "documents": return <Documents />;
    case "collections": return <KnowledgeBase />;
    case "research-notebooks": return <ResearchNotebooks />;
    case "notes": return <Notes />;
    case "agents": return <Agents />;
    case "model-router": return <ModelRouter />;
    case "models": return <Models />;
    case "tool-registry": return <ToolRegistry />;
    case "offline-plugins": return <OfflinePlugins />;
    case "coding-workspace": return <CodingWorkspace />;
    case "sandbox": return <Sandbox />;
    case "engineering-analysis": return <EngineeringAnalysis />;
    case "engineering-drawings": return <EngineeringDrawings />;
    case "multimodal": return <MultimodalWorkspace />;
    case "collaboration": return <PersonalChat />;
    case "personal-chat": return <PersonalChat />;
    case "security-center": return <SecurityCenter />;
    case "rbac": return <RBAC />;
    case "audit-trail": return <AuditTrail />;
    case "system-health": return <SystemHealth />;
    case "gpu-compute": return <GPU />;
    case "network-security": return <NetworkSecurity />;
    case "help-center": return <HelpCenter />;
    case "settings": return <Settings />;
    default: return <Dashboard />;
  }
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Full-width pages that manage their own layout
  const fullHeightPages: Page[] = [
    "workbench", "coding-workspace", "personal-chat", "research-notebooks",
    "notes", "project-detail",
  ];
  const isFullHeight = fullHeightPages.includes(currentPage);

  return (
    <NavContext.Provider value={{ currentPage, navigate: setCurrentPage }}>
      <div className="flex h-screen overflow-hidden" style={{ background: "var(--color-bg)" }}>
        {/* Sidebar */}
        <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((v) => !v)} />

        {/* Main */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Header */}
          {currentPage !== "workbench" && <Header />}

          {/* Page content */}
          <div className={`flex-1 overflow-hidden ${isFullHeight ? "flex flex-col" : "overflow-y-auto"}`}>
            <PageContent page={currentPage} />
          </div>
        </div>
      </div>
    </NavContext.Provider>
  );
}
