"use client";

import { usePathname } from "next/navigation";
import NavMenu from "@/components/nav-menu";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "@/components/ui/sonner";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <SidebarProvider>
      {!isAdmin && <AppSidebar />}
      {!isAdmin && <SidebarTrigger />}

      <main className="w-full">
        {!isAdmin && <NavMenu />}

        <section className="pt-10 h-[calc(100%-36px)]">{children}</section>

        <Toaster />
      </main>
    </SidebarProvider>
  );
}
