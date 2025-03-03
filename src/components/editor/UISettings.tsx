import React, { useState } from "react";
import { Moon, Sun, Maximize, Minimize } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface UISettingsProps {
  darkMode?: boolean;
  onDarkModeChange?: (enabled: boolean) => void;
  canvasSize?: number;
  onCanvasSizeChange?: (size: number) => void;
  isFullscreen?: boolean;
  onFullscreenToggle?: () => void;
}

const UISettings = ({
  darkMode = true,
  onDarkModeChange = () => {},
  canvasSize = 100,
  onCanvasSizeChange = () => {},
  isFullscreen = false,
  onFullscreenToggle = () => {},
}: UISettingsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 bg-background border border-border rounded-lg shadow-lg p-3 z-10">
      <div className="flex flex-col gap-3 w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {darkMode ? (
              <Moon className="h-4 w-4 text-primary" />
            ) : (
              <Sun className="h-4 w-4 text-primary" />
            )}
            <span className="text-sm font-medium">Dark Mode</span>
          </div>
          <Switch checked={darkMode} onCheckedChange={onDarkModeChange} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Canvas Size</span>
            <span className="text-xs text-muted-foreground">{canvasSize}%</span>
          </div>
          <Slider
            value={[canvasSize]}
            min={50}
            max={150}
            step={5}
            onValueChange={(value) => onCanvasSizeChange(value[0])}
            className="w-full"
          />
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onFullscreenToggle}
                className="flex items-center justify-center w-full gap-2 py-1.5 rounded-md bg-primary/10 hover:bg-primary/20 transition-colors"
              >
                {isFullscreen ? (
                  <>
                    <Minimize className="h-4 w-4" />
                    <span className="text-sm">Exit Fullscreen</span>
                  </>
                ) : (
                  <>
                    <Maximize className="h-4 w-4" />
                    <span className="text-sm">Enter Fullscreen</span>
                  </>
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {isFullscreen
                  ? "Exit fullscreen mode"
                  : "Enter fullscreen mode"}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default UISettings;
