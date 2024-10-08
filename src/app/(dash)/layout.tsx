'use client'

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
    <div className="flex">
      <div className="inline-block max-w-lg text-center justify-center">
        {children}
      </div>
    </div>
  );
}
