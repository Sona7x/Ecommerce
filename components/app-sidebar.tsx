import { FaBorderTopLeft } from "react-icons/fa6";
import { TbCategory } from "react-icons/tb";
import { MdProductionQuantityLimits } from "react-icons/md";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: FaBorderTopLeft,
  },
  {
    title: "Products",
    url: "/admin/product",
    icon: TbCategory,
  },
  {
    title: "Orders",
    url: "/admin/order",
    icon: MdProductionQuantityLimits,
  },
  ,
  {
    title: "User",
    url: "/admin/user",
    icon: MdProductionQuantityLimits,
  },
  ,
  {
    title: "Settings",
    url: "/admin/settings",
    icon: MdProductionQuantityLimits,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Ecommerce Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
