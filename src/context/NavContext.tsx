import { createContext, useContext } from "react";

export type Page =
  | "dashboard"
  | "workbench"
  | "projects"
  | "project-detail"
  | "tasks"
  | "artifacts"
  | "approvals"
  | "knowledge-base"
  | "documents"
  | "collections"
  | "research-notebooks"
  | "notes"
  | "agents"
  | "model-router"
  | "models"
  | "tool-registry"
  | "offline-plugins"
  | "coding-workspace"
  | "sandbox"
  | "engineering-analysis"
  | "engineering-drawings"
  | "collaboration"
  | "personal-chat"
  | "security-center"
  | "rbac"
  | "audit-trail"
  | "system-health"
  | "gpu-compute"
  | "network-security"
  | "settings"
  | "help-center"
  | "multimodal"
  | "verification"
  | "data-query";

export type Project = {
  name: string;
  owner: string;
  dept: string;
  status: string;
  progress: number;
  tasks: number;
  artifacts: number;
  cls: string;
  agents: string[];
  updated: string;
  contributors: string[];
};

export type NavContextType = {
  currentPage: Page;
  navigate: (page: Page) => void;
  projects: Project[];
  updateProject: (name: string, updates: Partial<Project>) => void;
};

export const NavContext = createContext<NavContextType>({
  currentPage: "dashboard",
  navigate: () => {},
  projects: [],
  updateProject: () => {},
});

export const useNav = () => useContext(NavContext);
