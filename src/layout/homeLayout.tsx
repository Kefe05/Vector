import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-screen">
        <SidebarTrigger />
        <div className="w-full ">{children}</div>
      </main>
    </SidebarProvider>
  );
}
