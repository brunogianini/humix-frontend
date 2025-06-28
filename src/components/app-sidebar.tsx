"use client"

import * as React from "react"
import {
  AudioWaveform,
  Bandage,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Group,
  GroupIcon,
  Map,
  Music,
  PersonStanding,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
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
          url: "#",
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
          url: "#",
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
