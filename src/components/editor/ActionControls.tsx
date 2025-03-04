import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Undo,
  Redo,
  Save,
  History,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  RotateCw,
  FilePlus,
  FolderOpen,
  X,
} from "lucide-react";

interface ActionControlsProps {
  onUndo?: () => void;
  onRedo?: () => void;
  onSave?: () => void;
  onViewHistory?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onRotateLeft?: () => void;
  onRotateRight?: () => void;
  onNewFile?: () => void;
  onOpenFile?: () => void;
  onCloseFile?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  zoomLevel?: number;
}

const ActionControls = ({
  onUndo = () => {},
  onRedo = () => {},
  onSave = () => {},
  onViewHistory = () => {},
  onZoomIn = () => {},
  onZoomOut = () => {},
  onRotateLeft = () => {},
  onRotateRight = () => {},
  onNewFile = () => {},
  onOpenFile = () => {},
  onCloseFile = () => {},
  canUndo = false,
  canRedo = false,
  zoomLevel = 100,
}: ActionControlsProps) => {
  // Track history timeline position for visual indicator
  const [historyPosition, setHistoryPosition] = useState<number>(0);

  // Handle undo with history position update
  const handleUndo = () => {
    if (canUndo) {
      onUndo();
      setHistoryPosition((prev) => Math.max(0, prev - 1));
    }
  };

  // Handle redo with history position update
  const handleRedo = () => {
    if (canRedo) {
      onRedo();
      setHistoryPosition((prev) => prev + 1);
    }
  };

  return (
    <div className="w-full h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-4">
      {/* Left section - History controls */}
  
      {/* Center section - File controls and transform controls */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 border-r border-gray-700 pr-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onNewFile}
                  aria-label="New File"
                  className="flex items-center gap-1"
                >
                  <FilePlus className="h-4 w-4" />
                  <span className="text-xs">New</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>New File</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onOpenFile}
                  aria-label="Open File"
                  className="flex items-center gap-1"
                >
                  <FolderOpen className="h-4 w-4" />
                  <span className="text-xs">Open</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Open File</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onCloseFile}
                  aria-label="Close File"
                  className="flex items-center gap-1"
                >
                  <X className="h-4 w-4" />
                  <span className="text-xs">Close</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Close File</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex items-center space-x-2 border-r border-gray-700 pr-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onZoomOut}
                  aria-label="Zoom Out"
                >
                  <ZoomOut className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Zoom Out</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <span className="text-sm font-medium">{zoomLevel}%</span>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onZoomIn}
                  aria-label="Zoom In"
                >
                  <ZoomIn className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Zoom In</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onRotateLeft}
                  aria-label="Rotate Left"
                >
                  <RotateCcw className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Rotate Left</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onRotateRight}
                  aria-label="Rotate Right"
                >
                  <RotateCw className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Rotate Right</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Right section - Save options */}
      <div className="flex items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="primary"
                onClick={onSave}
                className="flex items-center gap-2"
                aria-label="Save Options"
              >
                <Save className="h-4 w-4" />
                <span className="hidden sm:inline">Save</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Save Options</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ActionControls;
