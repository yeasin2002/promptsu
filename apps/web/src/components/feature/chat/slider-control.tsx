'use client';

import { RiRefreshLine } from "@remixicon/react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Slider } from "@workspace/ui/components/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import { useSliderWithInput } from '@/hooks/use-slider-with-input';
import { cn } from "@/lib/utils";

interface SliderControlProps {
  className?: string;
  minValue: number;
  maxValue: number;
  initialValue: [number];
  defaultValue: [number];
  step: number;
  label: string;
}

export default function SliderControl({
  className,
  minValue,
  maxValue,
  initialValue,
  defaultValue,
  step,
  label,
}: SliderControlProps) {
  const {
    sliderValue,
    inputValues,
    validateAndUpdateValue,
    handleInputChange,
    handleSliderChange,
    resetToDefault,
    showReset,
  } = useSliderWithInput({ minValue, maxValue, initialValue, defaultValue });

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between gap-2">
        <Label className="font-normal">{label}</Label>
        <div className="flex items-center gap-1">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  aria-label="Reset"
                  className={cn(
                    "size-7 text-muted-foreground/70 transition-all hover:bg-transparent hover:text-foreground",
                    showReset ? "opacity-100" : "pointer-events-none opacity-0"
                  )}
                  onClick={resetToDefault}
                  size="icon"
                  variant="ghost"
                >
                  <RiRefreshLine aria-hidden="true" size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="dark px-2 py-1 text-xs">
                Reset to default
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Input
            aria-label="Enter value"
            className="h-6 w-11 border-none bg-transparent px-1 py-0 text-right tabular-nums shadow-none focus:bg-background"
            inputMode="decimal"
            onBlur={() => validateAndUpdateValue(inputValues[0] ?? "", 0)}
            onChange={(e) => handleInputChange(e, 0)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                validateAndUpdateValue(inputValues[0] ?? "", 0);
              }
            }}
            type="text"
            value={inputValues[0]}
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Slider
          aria-label={label}
          className="grow [&>*:first-child]:bg-black/10"
          max={maxValue}
          min={minValue}
          onValueChange={handleSliderChange}
          step={step}
          value={sliderValue}
        />
      </div>
    </div>
  );
}
