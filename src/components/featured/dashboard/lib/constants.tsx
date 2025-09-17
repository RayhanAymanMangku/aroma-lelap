import { Layers, LayoutTemplate } from "lucide-react";

export const sidebarItem = [
    {
        id: 1,
        name: "Dashboard",
        icon: <LayoutTemplate className="h-4 w-4" />,
        href: "/dashboard",
    },
    {
        id: 2,
        name: "Products",
        icon: <Layers className="h-4 w-4" />,
        href: "/dashboard/products",
    },
]

export const dashboardCardData = [
    {
        id: 1,
        value: 10,
        title: "Total Products"
    }
]