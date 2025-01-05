"use client"

import * as React from "react"
import jwt from "jsonwebtoken";
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Albums",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Não Ouvidos",
          url: "/nao-ouvidos",
        },
        {
          title: "Ranking",
          url: "/ranking",
        },
        {
          title: "Favoritos",
          url: "/favoritos",
        },
      ],
    },
    {
      title: "Bandas",
      url: "#",
      icon: Bot,
      isActive: true,
      items: [
        {
          title: "Lista",
          url: "/bandas",
        },
        {
          title: "Favoritos",
          url: "/minhas-bandas",
        }
      ],
    },
    {
      title: "Meu Perfil",
      url: "#",
      icon: BookOpen,
      isActive: true,
      items: [
        {
          title: "Destaques",
          url: "/destaques",
        },
        {
          title: "Minhas Badges",
          url: "/badges",
        },
        {
          title: "Amigos",
          url: "/amigos",
        },
        {
          title: "Recomendações",
          url: "/recomendacoes",
        },
      ],
    },

  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Ver meu ano",
      url: "/ano",
      icon: Frame,
    },
    {
      name: "Meus dados",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Criar playlist",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = React.useState({ name: "", email: "", avatar: "" });

  React.useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (token) {
      try {
        const decoded: any = jwt.decode(token);
        setUser({
          name: decoded.username || "Unknown",
          email: decoded.email || "Unknown",
          avatar: "/default-avatar.jpg",
        });
      } catch (err) {
        console.error("Error decoding token:", err);
      }
    }
  }, []);


  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Humix</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
