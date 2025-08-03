import type * as React from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  RiBardLine,
  RiBracesLine,
  RiChat1Line,
  RiCheckDoubleLine,
  RiMickeyLine,
  RiMicLine,
  RiPlanetLine,
  RiSeedlingLine,
  RiSettings3Line,
} from '@remixicon/react';
import { TeamSwitcher } from './team-switcher';

// This is sample data.
const data = {
  teams: [
    {
      name: 'ArkDigital',
      logo: 'https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp2/logo-01_upxvqe.png',
    },
    {
      name: 'Acme Corp.',
      logo: 'https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp2/logo-01_upxvqe.png',
    },
    {
      name: 'Evil Corp.',
      logo: 'https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp2/logo-01_upxvqe.png',
    },
  ],
  navMain: [
    {
      title: 'Playground',
      url: '#',
      items: [
        {
          title: 'Chat',
          url: '#',
          icon: RiChat1Line,
          isActive: true,
        },
        {
          title: 'Real-time',
          url: '#',
          icon: RiBardLine,
        },
        {
          title: 'Assistants',
          url: '#',
          icon: RiMickeyLine,
        },
        {
          title: 'Audio',
          url: '#',
          icon: RiMicLine,
        },
        {
          title: 'Metrics',
          url: '#',
          icon: RiCheckDoubleLine,
        },
        {
          title: 'Documentation',
          url: '#',
          icon: RiBracesLine,
        },
      ],
    },
    {
      title: 'More',
      url: '#',
      items: [
        {
          title: 'Community',
          url: '#',
          icon: RiPlanetLine,
        },
        {
          title: 'Help Centre',
          url: '#',
          icon: RiSeedlingLine,
        },
        {
          title: 'Settings',
          url: '#',
          icon: RiSettings3Line,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} className="dark !border-none">
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        {/* We only show the first parent group */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50 uppercase">
            {data.navMain[0]?.title}
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-2">
            <SidebarMenu>
              {data.navMain[0]?.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="group/menu-button h-9 gap-3 rounded-md font-medium data-[active=true]:bg-gradient-to-b data-[active=true]:from-sidebar-primary data-[active=true]:to-sidebar-primary/70 data-[active=true]:shadow-[0_1px_2px_0_rgb(0_0_0/.05),inset_0_1px_0_0_rgb(255_255_255/.12)] data-[active=true]:hover:bg-transparent [&>svg]:size-auto"
                    isActive={item.isActive}
                  >
                    <a href={item.url}>
                      {item.icon && (
                        <item.icon
                          className="text-sidebar-foreground/50 group-data-[active=true]/menu-button:text-sidebar-foreground"
                          size={22}
                          aria-hidden="true"
                        />
                      )}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {/* Secondary Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50 uppercase">
            {data.navMain[1]?.title}
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-2">
            <SidebarMenu>
              {data.navMain[1]?.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="group/menu-button h-9 gap-3 rounded-md font-medium [&>svg]:size-auto"
                    isActive={item.isActive}
                  >
                    <a href={item.url}>
                      {item.icon && (
                        <item.icon
                          className="text-sidebar-foreground/50 group-data-[active=true]/menu-button:text-primary"
                          size={22}
                          aria-hidden="true"
                        />
                      )}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
