'use client';

import { Badge } from '@workspace/ui/components/badge';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@workspace/ui/components/sidebar';
import { Search } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';
import { categories, platforms } from './propts-sample-data';

export function PromptsDirectorySidebar() {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <Sidebar className="border-gray-800 border-r">
      <SidebarHeader className="p-4">
        <div className="space-y-4">
          <div>
            <h1 className="font-bold text-2xl text-emerald-400">
              prompts.chat
            </h1>
            <p className="text-gray-400 text-sm">
              World's First & Most Famous Prompts Directory
            </p>
            <Badge
              className="mt-2 bg-emerald-900 text-emerald-300"
              variant="secondary"
            >
              New: Try Vibe Coding Model
            </Badge>
          </div>

          <div>
            <p className="mb-2 text-gray-400 text-sm">
              Choose your AI platform
            </p>
            <div className="flex flex-wrap gap-2">
              {platforms.map((platform) => (
                <Badge
                  className={cn(
                    'text-white ',
                    platform.active
                      ? 'bg-emerald-600 hover:bg-emerald-700'
                      : 'border-gray-600 hover:bg-gray-800'
                  )}
                  key={platform.name}
                  variant={platform.active ? 'default' : 'outline'}
                >
                  {platform.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="relative mb-4">
              <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 transform text-gray-400" />
              <SidebarInput
                className="border-gray-700 bg-gray-800 pl-10"
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search prompts..."
                value={searchQuery}
              />
            </div>

            <SidebarMenu>
              {categories.map((category) => (
                <SidebarMenuItem key={category.name}>
                  <SidebarMenuButton className="w-full justify-between hover:bg-gray-800">
                    <span className="text-gray-300">{category.name}</span>
                    <span className="text-gray-500 text-sm">
                      {category.count}
                    </span>
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
