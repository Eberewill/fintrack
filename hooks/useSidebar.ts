'use client';
import { create } from 'zustand';

interface SidebarStore {
  isCollapsed: boolean;
  toggleCollapsed: () => void;
}

export const useSidebar = create<SidebarStore>((set) => ({
  isCollapsed: false, // Default expanded (showing labels only)
  toggleCollapsed: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
 
}));