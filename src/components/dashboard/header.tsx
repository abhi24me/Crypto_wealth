"use client";

import { UserNav } from "@/components/dashboard/user-nav";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <SidebarTrigger className="md:hidden" />
      <div className="flex w-full items-center gap-4">
        <h1 className="text-xl font-semibold">WealthFrontier Manager</h1>
        <div className="ml-auto flex items-center gap-4">
          <UserNav />
        </div>
      </div>
    </header>
  );
}
