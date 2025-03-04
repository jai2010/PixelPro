import React, { useState, useEffect, useRef } from "react";
import { ZoomIn, ZoomOut, Move } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

interface EditingCanvasProps {
  mediaUrl?: string;
  mediaType?: "image" | "video";
  zoomLevel?: number;
  rotation?: number;
  dotMatrixSettings?: DotMatrixSettings;
  textOverlays?: { 
    id: string;
    content: string; 
    format: TextFormat;
    position: { x: number; y: number };
  }[];
}

const EditingCanvas: React.FC<EditingCanvasProps> = ({
  mediaUrl,
  mediaType = "image",
  zoomLevel = 100, // Set default values here
  rotation = 0,
  onZoomChange,
  onRotateChange,
  textOverlays = [],
  effects = { dotMatrix: false, backgroundRemoved: false },
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = useState<number>(zoomLevel); // Initialize from props
  const [currentRotation, setCurrentRotation] = useState<number>(rotation); // Rename to avoid conflicts
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.log("EditingCanvas mounted with mediaUrl:", mediaUrl);
    if (!mediaUrl || mediaType !== "image") return;
    
    const img = new Image();
    img.src = mediaUrl;
    img.crossOrigin = "anonymous";
    img.onload = () => {
      console.log("Image loaded successfully:", mediaUrl);
      renderImage(img);
    };
    img.onerror = () => console.error("Failed to load image", mediaUrl);
  }, [mediaUrl]);

  // Sync zoomLevel from props to state
  useEffect(() => {
    setZoom(zoomLevel);
  }, [zoomLevel]);

  // Sync rotation from props to state
  useEffect(() => {
    setCurrentRotation(rotation);
  }, [rotation]);

  useEffect(() => {
    if (!canvasRef.current) {
      console.error("Canvas reference is null. Retrying...");
      return;
    }
    console.log("Canvas reference is valid:", canvasRef.current);
  }, [canvasRef]);
  
  

  const renderImage = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Canvas reference is null");
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("Failed to get canvas context");
      return;
    }
    
    console.log("Rendering image to canvas:", img.width, img.height);
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, img.width, img.height);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);
  
  return (
    <div className="relative w-full h-full flex flex-col bg-gray-900 rounded-lg overflow-hidden justify-end items-center">
      <div className="flex-1 overflow-hidden relative cursor-move w-full h-full">
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom / 100}) rotate(${currentRotation}deg)`,
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {!mediaUrl ? (
            <div className="flex items-center justify-center h-full w-full bg-gray-800 text-gray-400">
              <p>No media loaded. Please upload an image.</p>
            </div>
          ) : mediaType === "image" ? (
            <canvas ref={canvasRef} className="shadow-lg " />
          ) : (
            <video src={mediaUrl} controls className="max-w-full max-h-full" />
          )}
        </motion.div>
      </div>

      {/* Render Text Overlays Inside the Zoomable Area */}
      {textOverlays.map(({ id, content, format, position }) => (
        <p
          key={id}
          style={{
            position: "absolute",
            top: position.y,
            left: position.x,
            fontFamily: format.fontFamily,
            fontSize: `${format.fontSize}px`,
            fontWeight: format.fontWeight,
            fontStyle: format.fontStyle,
            textDecoration: format.textDecoration,
            color: format.color,
            textAlign: format.alignment,
            cursor: "move",
            transform: `scale(${zoom / 100})`, // Ensures text scales with zoom
          }}
        >
          {content}
        </p>
      ))}

      <div className="absolute top-4 right-4 flex gap-2">
        <Button variant="ghost" size="icon" onClick={() => setZoom(Math.min(zoom + 10, 200))}>
          <ZoomIn className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => setZoom(Math.max(zoom - 10, 50))}>
          <ZoomOut className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className={isDragging ? "bg-gray-700" : ""}>
          <Move className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default EditingCanvas;