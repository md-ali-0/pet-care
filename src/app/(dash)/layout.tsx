'use client'

import DashNavbar from "@/components/dashboard/dash-navbar";
import Sidebar from "@/components/dashboard/dash-sidebar";
import React from "react";

export default function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen">
    <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
    />
    <div className="flex-1 flex flex-col overflow-hidden">
        <DashNavbar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto dash-content-scroll">
            <div className="mx-auto max-w-screen-2xl px-4 md:px-6 2xl:px-10 py-2">
                {children}
            </div>
        </main>
    </div>
</div>
  );
}
