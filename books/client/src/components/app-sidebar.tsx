import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useState, useEffect } from "react";
import { logout } from "@/app/utils/authService";
import Link from "next/link";

// This is sample data.
const data = {

  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Home",
          url: "#",
        },
        {
          title: "Books",
          url: "#",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
    useEffect(() => {
      const token = localStorage.getItem("access_token");
      if (token) {
        setIsAuthenticated(true);
      }
    }, []);
  return (
    <Sidebar {...props}>
      <SidebarHeader className="bg-[#c0b5b8] ">
      </SidebarHeader >
      <SidebarContent className="bg-[#c0b5b8] ">
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                 <SidebarMenuItem>
                {isAuthenticated ? (
                  <SidebarMenuButton onClick={logout}>Logout</SidebarMenuButton>
                ) : (
                  <Link href="/">
                  <span className="text-red-500 p-2">Please Login</span>
                  </Link>
                )}
              </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
