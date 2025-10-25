import { AppSidebar } from "@/components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import React from "react"

import { Outlet, useLocation } from 'react-router-dom'

export default function RootLayout() {

    const routes = ["feel-good", "action-fix", "mind-benders"]
    const location = useLocation();
    const path = location.pathname;
    const currentChild = path.split("/").filter(Boolean).pop();

    console.log({ path, currentChild })

    const titleCase = (str: string) => {
        return str.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="/">
                                        Dashboard
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                {
                                    routes.includes(currentChild || "") &&
                                    <React.Fragment>
                                        <BreadcrumbSeparator className="hidden md:block" />
                                        <BreadcrumbItem>
                                            <BreadcrumbPage>{titleCase(currentChild || "")}</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </React.Fragment>
                                }
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <Outlet />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}