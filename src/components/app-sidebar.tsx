import * as React from "react"
import {
    Frame,
    Map,
    PieChart,
} from "lucide-react"
import { NavMenus } from "@/components/nav-menus"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import {
    DropdownMenu,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar"
import { useNavigate } from "react-router-dom"

// This is sample data.
const data = {
    menus: [
        {
            name: "Feel Good",
            url: "feel-good",
            icon: Frame,
        },
        {
            name: "Action Fix",
            url: "action-fix",
            icon: PieChart,
        },
        {
            name: "Mind Benders",
            url: "mind-benders",
            icon: Map,
        },
        {
            name: "Watchlist",
            url: "watchlist",
            icon: PieChart,
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const navigate = useNavigate();
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                    onClick={ () => navigate("/") }
                                >
                                    <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                        <img
                                            src="/vite.svg"
                                            alt="Vite Logo"
                                            className="w-5 h-5"
                                        />
                                    </div>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-medium">Moviq</span>
                                    </div>
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMenus menus={data.menus} />
            </SidebarContent>
            <SidebarFooter>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
