import React from "react";
import { Sidebar } from "@/components/ui/Sidebar";
import { Topbar } from "@/components/ui/Topbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-obsidian-950 text-foreground overflow-hidden">
      {/* Collapsible Sidebar */}
      <Sidebar />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto h-screen">
        {/* Navigation Head */}
        <Topbar />

        {/* Workspace Canvas */}
        <main className="flex-1 p-8 md:p-10 space-y-8 bg-gradient-to-b from-obsidian-950 via-obsidian-950 to-obsidian-900">
          {children}
        </main>
      </div>
    </div>
  );
}
