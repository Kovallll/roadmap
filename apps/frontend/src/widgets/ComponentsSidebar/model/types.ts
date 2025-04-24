export interface TypeStore {
  type: string | null;
  setType: (type: string) => void;
}

export interface ComponentsSidebarProps {
  nodeLabels: string[];
}
