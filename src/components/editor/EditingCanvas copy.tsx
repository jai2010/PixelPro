import React, { useState, useRef, useEffect } from "react";
import { ZoomIn, ZoomOut, Move, Image as ImageIcon, Video } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface EditingCanvasProps {
  mediaUrl?: string;
  mediaType?: "image" | "video";
  effects?: {
    dotMatrix?: boolean | any;
    backgroundRemoved?: boolean;
    overlays?: Array<{
      id: string;
      type: string;
      content: string;
      position: { x: number; y: number };
    }>;
    texts?: Array<{
      id: string;
      content: string;
      position: { x: number; y: number };
      style: object;
    }>;
  };
  onCanvasClick?: (position: { x: number; y: number }) => void;
}

const EditingCanvas: React.FC<EditingCanvasProps> = ({
  mediaUrl,
  mediaType = "image",
  effects = {
    dotMatrix: false,
    backgroundRemoved: false,
    overlays: [],
    texts: [],
  },
  onCanvasClick = () => {},
}) => {
  const [zoom, setZoom] = useState<number>(100);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const canvasRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle zoom in/out
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 10, 50));
  };

  // Handle drag operations
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    setPosition((prev) => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY,
    }));

    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      onCanvasClick({ x, y });
    }
  };

  const [currentMediaUrl, setCurrentMediaUrl] = useState<string | undefined>(mediaUrl);


  // Apply dot matrix effect (placeholder implementation)
  const applyDotMatrixEffect = (url: string) => {
    if (!effects.dotMatrix) return url;
    // In a real implementation, this would apply the actual effect
    return url;
  };

  // Clean up event listeners
  useEffect(() => {
    const handleMouseUpGlobal = () => {
      setIsDragging(false);
    };

    window.addEventListener("mouseup", handleMouseUpGlobal);
    return () => {
      window.removeEventListener("mouseup", handleMouseUpGlobal);
    };
  }, []);

  useEffect(() => {
    setCurrentMediaUrl(mediaUrl);
  }, [mediaUrl]);

  // Clean up object URLs only when component unmounts
  useEffect(() => {
    return () => {
      if (mediaUrl && mediaUrl.startsWith("blob:")) {
        URL.revokeObjectURL(mediaUrl);
      }
    };
  }, []);

  useEffect(() => {
    console.log("EditingCanvas mounted with mediaUrl:", mediaUrl);
  }, [mediaUrl]);

  return (
    <div className="relative w-full h-full flex flex-col bg-gray-900 rounded-lg overflow-hidden justify-end items-center">
      {/* Main canvas area */}
      <div
        ref={canvasRef}
        className="flex-1 overflow-hidden relative cursor-move"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={handleCanvasClick}
      >
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            x: position.x,
            y: position.y,
            scale: zoom / 100,
          }}
          drag={isDragging}
          dragMomentum={false}
        >
          {mediaType === "image" ? (
            <div
              className={`relative ${effects.backgroundRemoved ? "bg-transparent" : "bg-white"}`}
            >
              {currentMediaUrl && (
                <>
                  {console.log("Processed URL for image:", applyDotMatrixEffect(mediaUrl))}
                  <img
                    src={applyDotMatrixEffect(mediaUrl)}
                    alt="Editing canvas"
                    className="max-w-full max-h-full object-contain"
                  />
                </>
              )}

              {/* Render overlays */}
              {effects.overlays?.map((overlay) => (
                <div
                  key={overlay.id}
                  className="absolute"
                  style={{
                    left: `${overlay.position.x}px`,
                    top: `${overlay.position.y}px`,
                  }}
                >
                  {overlay.content}
                </div>
              ))}

              {/* Render text elements */}
              {effects.texts?.map((text) => (
                <div
                  key={text.id}
                  className="absolute"
                  style={{
                    left: `${text.position.x}px`,
                    top: `${text.position.y}px`,
                    ...text.style,
                  }}
                >
                  {text.content}
                </div>
              ))}
            </div>
          ) : (
            <div className="relative">
              {mediaUrl && (
                <video
                  ref={videoRef}
                  src={mediaUrl}
                  controls
                  className="max-w-full max-h-full"
                />
              )}
              {/* Video overlays would be rendered here */}
            </div>
          )}
        </motion.div>
      </div>

      {/* Canvas controls */}
      <div className="absolute top-4 right-4 z-10 flex gap-2 bg-gray-800/80 p-2 rounded-lg">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={handleZoomIn}>
                <ZoomIn className="h-5 w-5 text-gray-200" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Zoom In</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={handleZoomOut}>
                <ZoomOut className="h-5 w-5 text-gray-200" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Zoom Out</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={isDragging ? "bg-gray-700" : ""}
                onMouseDown={() => setIsDragging(true)}
              >
                <Move className="h-5 w-5 text-gray-200" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Pan Canvas</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Media type indicator */}
      <div className="absolute top-4 left-4 z-10 bg-gray-800/80 p-2 rounded-lg flex items-center gap-2">
        {mediaType === "image" ? (
          <>
            <ImageIcon className="h-4 w-4 text-gray-200" />
            <span className="text-xs text-gray-200">Image</span>
          </>
        ) : (
          <>
            <Video className="h-4 w-4 text-gray-200" />
            <span className="text-xs text-gray-200">Video</span>
          </>
        )}
      </div>
    </div>
  );
};

export default EditingCanvas;
