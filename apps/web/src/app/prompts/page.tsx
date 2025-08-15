'use client';

import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu';
import {
  SidebarInset,
  SidebarProvider,
} from '@workspace/ui/components/sidebar';
import {
  Bookmark,
  Copy,
  ExternalLink,
  MoreHorizontal,
  Plus,
} from 'lucide-react';
import React from 'react';
import { PromptsDirectorySidebar } from './prompts-directory-sidebar';
import { prompts } from './propts-sample-data';

function PromptsDirectory() {
  const [selectedCategory] = React.useState<string | null>(null);
  const [sortBy, setSortBy] = React.useState('popular');

  const filteredPrompts = prompts.filter(
    (prompt) =>
      !selectedCategory ||
      prompt.category.toLowerCase().includes(selectedCategory.toLowerCase())
  );

  const sortedPrompts = [...filteredPrompts].sort((a, b) => {
    if (sortBy === 'popular') return b.likes - a.likes;
    if (sortBy === 'newest') return b.id - a.id;
    return a.title.localeCompare(b.title);
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <SidebarProvider>
        <PromptsDirectorySidebar />
        <SidebarInset>
          <div className="p-6">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="font-semibold text-xl">All Prompts</h2>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm">Sort by:</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        className="border-gray-700 bg-gray-800"
                        size="sm"
                        variant="outline"
                      >
                        {sortBy === 'popular'
                          ? 'Most Popular'
                          : sortBy === 'newest'
                            ? 'Newest'
                            : 'Alphabetical'}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="border-gray-700 bg-gray-800">
                      <DropdownMenuItem onClick={() => setSortBy('popular')}>
                        Most Popular
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy('newest')}>
                        Newest
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setSortBy('alphabetical')}
                      >
                        Alphabetical
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <span>Reply in</span>
                <Badge className="border-gray-600" variant="outline">
                  English
                </Badge>
                <span>using</span>
                <Badge className="border-gray-600" variant="outline">
                  technical
                </Badge>
                <span>tone, for</span>
                <Badge className="border-gray-600" variant="outline">
                  developers
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {sortedPrompts.map((prompt) => (
                <Card
                  className="border-gray-700 bg-gray-800 transition-colors hover:bg-gray-750"
                  key={prompt.id}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="font-medium text-lg text-white leading-tight">
                        {prompt.title}
                      </CardTitle>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                            size="sm"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="border-gray-700 bg-gray-800">
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            Copy Prompt
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Open in New Tab
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Bookmark className="mr-2 h-4 w-4" />
                            Save to Favorites
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="mb-4 line-clamp-4 text-gray-400 text-sm">
                      {prompt.description}
                    </CardDescription>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge
                          className="bg-gray-700 text-gray-300 text-xs"
                          variant="secondary"
                        >
                          {prompt.category}
                        </Badge>
                        {prompt.isSpecial && (
                          <Badge className="bg-emerald-600 text-white text-xs">
                            <Plus className="mr-1 h-3 w-3" />
                            Contribute
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <span>{prompt.author}</span>
                        {prompt.likes > 0 && (
                          <span>• {prompt.likes.toLocaleString()}</span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

export default PromptsDirectory;
