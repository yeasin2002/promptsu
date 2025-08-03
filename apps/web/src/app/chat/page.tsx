import { AppSidebar } from '@/components/feature/chat/app-sidebar';
import Chat from '@/components/feature/chat/chat';
import {
  SettingsPanel,
  SettingsPanelProvider,
} from '@/components/feature/chat/settings-panel';
import UserDropdown from '@/components/feature/chat/user-dropdown';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="group/sidebar-inset bg-sidebar">
        <header className="dark before:-left-px relative flex h-16 shrink-0 items-center gap-2 bg-sidebar px-4 text-sidebar-foreground before:absolute before:inset-y-3 before:z-50 before:w-px before:bg-gradient-to-b before:from-white/5 before:via-white/15 before:to-white/5 md:px-6 lg:px-8">
          <SidebarTrigger className="-ms-2" />
          <div className="ml-auto flex items-center gap-8">
            <nav className="flex items-center font-medium text-sm max-sm:hidden">
              <a
                className="text-sidebar-foreground/50 transition-colors before:px-4 before:text-sidebar-foreground/30 before:content-['/'] first:before:hidden hover:text-sidebar-foreground/70 [&[aria-current]]:text-sidebar-foreground"
                href="#"
                aria-current
              >
                Playground
              </a>
              <a
                className="text-sidebar-foreground/50 transition-colors before:px-4 before:text-sidebar-foreground/30 before:content-['/'] first:before:hidden hover:text-sidebar-foreground/70 [&[aria-current]]:text-sidebar-foreground"
                href="#"
              >
                Dashboard
              </a>
              <a
                className="text-sidebar-foreground/50 transition-colors before:px-4 before:text-sidebar-foreground/30 before:content-['/'] first:before:hidden hover:text-sidebar-foreground/70 [&[aria-current]]:text-sidebar-foreground"
                href="#"
              >
                Docs
              </a>
              <a
                className="text-sidebar-foreground/50 transition-colors before:px-4 before:text-sidebar-foreground/30 before:content-['/'] first:before:hidden hover:text-sidebar-foreground/70 [&[aria-current]]:text-sidebar-foreground"
                href="#"
              >
                API Reference
              </a>
            </nav>
            <UserDropdown />
          </div>
        </header>
        <SettingsPanelProvider>
          <div className="flex h-[calc(100svh-4rem)] bg-[hsl(240_5%_92.16%)] transition-all duration-300 ease-in-out md:rounded-s-3xl md:group-peer-data-[state=collapsed]/sidebar-inset:rounded-s-none">
            <Chat />
            <SettingsPanel />
          </div>
        </SettingsPanelProvider>
      </SidebarInset>
    </SidebarProvider>
  );
}
