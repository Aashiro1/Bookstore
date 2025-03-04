import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import Header from "@/components/Header"

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
      <div>   
          <main>{children}</main>
        </div>
 
  )
}
