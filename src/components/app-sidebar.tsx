"use client"

import * as React from "react"
import {
  GalleryVerticalEnd,
  Music,
  PersonStanding,
  User2,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Humix",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    }
  ],
  navMain: [
    {
      title: "Albums",
      url: "#",
      icon: Music,
      isActive: true,
      items: [
        {
          title: "Meus Álbums",
          url: "/albums",
        },
        {
          title: "Não Ouvidos",
          url: "/nao-ouvido",
        },
        {
          title: "Recomendados",
          url: "#",
        },
      ],
    },
    {
      title: "Bandas",
      url: "#",
      icon: PersonStanding,
      isActive: true,
      items: [
        {
          title: "Minhas bandas",
          url: "/bandas",
        },
        {
          title: "Meu ranking",
          url: "#",
        },
        {
          title: "Recomendados",
          url: "#",
        },
      ],
    },
    {
      title: "Usuários",
      url: "#",
      icon: User2,
      isActive: true,
      items: [
        {
          title: "Seguindo",
          url: "/usuarios-seguindo",
        },
        {
          title: "Meus seguidores",
          url: "#",
        },
        {
          title: "Buscar",
          url: "/buscar-usuarios",
        },
      ],
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
