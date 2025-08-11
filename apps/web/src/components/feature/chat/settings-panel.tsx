'use client';

import { RiQuillPenAiLine, RiSettingsLine } from '@remixicon/react';
import { Button } from "@workspace/ui/components/button";
import { Label } from "@workspace/ui/components/label";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@workspace/ui/components/sheet";
import React from "react";
import { useIsMobile } from '@/hooks/use-mobile';
import SliderControl from './slider-control';

type SettingsPanelContext = {
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  togglePanel: () => void;
};

const SettingsPanelContext = React.createContext<SettingsPanelContext | null>(
  null
);

function useSettingsPanel() {
  const context = React.useContext(SettingsPanelContext);
  if (!context) {
    throw new Error(
      'useSettingsPanel must be used within a SettingsPanelProvider.'
    );
  }
  return context;
}

const SettingsPanelProvider = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);

  // Helper to toggle the sidebar.
  const togglePanel = React.useCallback(() => {
    return isMobile && setOpenMobile((open) => !open);
  }, [isMobile]);

  const contextValue = React.useMemo<SettingsPanelContext>(
    () => ({
      isMobile,
      openMobile,
      setOpenMobile,
      togglePanel,
    }),
    [isMobile, openMobile, togglePanel]
  );

  return (
    <SettingsPanelContext.Provider value={contextValue}>
      {children}
    </SettingsPanelContext.Provider>
  );
};
SettingsPanelProvider.displayName = 'SettingsPanelProvider';

const SettingsPanelContent = () => {
  const id = React.useId();

  return (
    <>
      {/* Sidebar header */}
      <div className="py-5">
        <div className="flex items-center gap-2">
          <RiQuillPenAiLine
            aria-hidden="true"
            className="text-muted-foreground/70"
            size={20}
          />
          <h2 className="font-medium text-sm">My preferences</h2>
        </div>
      </div>

      {/* Sidebar content */}
      <div className="-mt-px">
        {/* Content group */}
        <div className="relative py-5 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-black/[0.06] before:via-black/10 before:to-black/[0.06]">
          <h3 className="mb-4 font-medium text-muted-foreground/80 text-xs uppercase">
            Chat presets
          </h3>
          <div className="space-y-3">
            {/* Model */}
            <div className="flex items-center justify-between gap-2">
              <Label className="font-normal" htmlFor={`${id}-model`}>
                Model
              </Label>
              <Select defaultValue="1">
                <SelectTrigger
                  className="[&_svg]:-me-1 h-7 w-auto max-w-full gap-1 border-none bg-background px-2 py-1"
                  id={`${id}-model`}
                >
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent
                  align="end"
                  className="[&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8"
                >
                  <SelectItem value="1">Chat 4.0</SelectItem>
                  <SelectItem value="2">Chat 3.5</SelectItem>
                  <SelectItem value="3">Chat 3.0</SelectItem>
                  <SelectItem value="4">Chat 2.5</SelectItem>
                  <SelectItem value="5">Chat 2.0</SelectItem>
                  <SelectItem value="6">Chat 1.5</SelectItem>
                  <SelectItem value="7">Chat 1.0</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Response format */}
            <div className="flex items-center justify-between gap-2">
              <Label className="font-normal" htmlFor={`${id}-response-format`}>
                Response format
              </Label>
              <Select defaultValue="1">
                <SelectTrigger
                  className="[&_svg]:-me-1 h-7 w-auto max-w-full gap-1 border-none bg-background px-2 py-1"
                  id={`${id}-response-format`}
                >
                  <SelectValue placeholder="Select response format" />
                </SelectTrigger>
                <SelectContent
                  align="end"
                  className="[&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8"
                >
                  <SelectItem value="1">text</SelectItem>
                  <SelectItem value="2">json_object</SelectItem>
                  <SelectItem value="3">json_schema</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Writing style */}
            <div className="flex items-center justify-between gap-2">
              <Label className="font-normal" htmlFor={`${id}-writing-style`}>
                Writing style
              </Label>
              <Select defaultValue="1">
                <SelectTrigger
                  className="[&_svg]:-me-1 h-7 w-auto max-w-full gap-1 border-none bg-background px-2 py-1"
                  id={`${id}-writing-style`}
                >
                  <SelectValue placeholder="Select writing style" />
                </SelectTrigger>
                <SelectContent
                  align="end"
                  className="[&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8"
                >
                  <SelectItem value="1">Concise</SelectItem>
                  <SelectItem value="2">Formal</SelectItem>
                  <SelectItem value="3">Technical</SelectItem>
                  <SelectItem value="4">Creative</SelectItem>
                  <SelectItem value="5">Scientific</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Mode */}
            <div className="flex items-center justify-between gap-2">
              <Label className="font-normal" htmlFor={`${id}-mode`}>
                Mode
              </Label>
              <Select defaultValue="1">
                <SelectTrigger
                  className="[&_svg]:-me-1 h-7 w-auto max-w-full gap-1 border-none bg-background px-2 py-1"
                  id={`${id}-mode`}
                >
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent
                  align="end"
                  className="[&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8"
                >
                  <SelectItem value="1">Chatbot</SelectItem>
                  <SelectItem value="2">Code</SelectItem>
                  <SelectItem value="3">Translate</SelectItem>
                  <SelectItem value="4">Summarize</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Content group */}
        <div className="relative py-5 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-black/[0.06] before:via-black/10 before:to-black/[0.06]">
          <h3 className="mb-4 font-medium text-muted-foreground/80 text-xs uppercase">
            Configurations
          </h3>
          <div className="space-y-3">
            {/* Temperature */}
            <SliderControl
              defaultValue={[1]}
              initialValue={[1.25]}
              label="Temperature"
              maxValue={2}
              minValue={0}
              step={0.01}
            />

            {/* Maximum length */}
            <SliderControl
              className="[&_input]:w-14"
              defaultValue={[2048]}
              initialValue={[2048]}
              label="Maximum length"
              maxValue={16_383}
              minValue={1}
              step={1}
            />

            {/* Top P */}
            <SliderControl
              defaultValue={[0]}
              initialValue={[0.5]}
              label="Top P"
              maxValue={1}
              minValue={0}
              step={0.01}
            />
          </div>
        </div>
      </div>
    </>
  );
};
SettingsPanelContent.displayName = 'SettingsPanelContent';

const SettingsPanel = () => {
  const { isMobile, openMobile, setOpenMobile } = useSettingsPanel();

  if (isMobile) {
    return (
      <Sheet onOpenChange={setOpenMobile} open={openMobile}>
        <SheetContent className="w-72 bg-[hsl(240_5%_92.16%)] px-4 py-0 md:px-6 [&>button]:hidden">
          <SheetTitle className="hidden">Settings</SheetTitle>
          <div className="flex h-full w-full flex-col">
            <SettingsPanelContent />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <ScrollArea>
      <div className="w-[300px] px-4 md:px-6">
        <SettingsPanelContent />
      </div>
    </ScrollArea>
  );
};
SettingsPanel.displayName = 'SettingsPanel';

const SettingsPanelTrigger = ({
  onClick,
}: {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  const { isMobile, togglePanel } = useSettingsPanel();

  if (!isMobile) {
    return null;
  }

  return (
    <Button
      className="px-2"
      onClick={(event) => {
        onClick?.(event);
        togglePanel();
      }}
      variant="ghost"
    >
      <RiSettingsLine
        aria-hidden="true"
        className="size-5 text-muted-foreground sm:text-muted-foreground/70"
        size={20}
      />
      <span className="max-sm:sr-only">Settings</span>
    </Button>
  );
};
SettingsPanelTrigger.displayName = 'SettingsPanelTrigger';

export {
  SettingsPanel,
  SettingsPanelProvider,
  SettingsPanelTrigger,
  useSettingsPanel,
};

