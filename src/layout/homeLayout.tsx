import { SidebarProvider } from "../components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen bg-white">
        <AppSidebar />
        <main className="flex-1 overflow-hidden">
          <div className="h-full">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
