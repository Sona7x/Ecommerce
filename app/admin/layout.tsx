import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export async function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <main className="w-full">
          <section className="pt-10 h-[calc(100%-36px)]">{children}</section>
        </main>
      </SidebarProvider>
    </div>
  );
}

export default Dashboard;
