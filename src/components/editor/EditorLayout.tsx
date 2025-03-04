import React, { useState, useEffect } from "react";
import UploadArea from "./UploadArea";
import EditingCanvas from "./EditingCanvas";
import ActionControls from "./ActionControls";
import SaveOptionsDialog from "./SaveOptionsDialog";
import DotMatrixPanel from "./ToolPanels/DotMatrixPanel";
import BackgroundPanel from "./ToolPanels/BackgroundPanel";
import EffectsPanel from "./ToolPanels/EffectsPanel";
import TextPanel from "./ToolPanels/TextPanel";
import OverlayPanel from "./ToolPanels/OverlayPanel";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wand2,
  Settings,
  HelpCircle,
  Image,
  Grid,
  Type,
  Layers,
  Palette,
  Video,
  FileImage,
  ImagePlus,
} from "lucide-react";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";

interface EditorLayoutProps {
  initialMode?: "upload" | "edit";
}

const EditorLayout: React.FC<EditorLayoutProps> = ({
  initialMode = "upload",
}) => {
  const [mode, setMode] = useState<"upload" | "edit">(initialMode);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [mediaUrl, setMediaUrl] = useState<string>("");
  const [mediaType, setMediaType] = useState<"image" | "video">("image");
  const [activeToolPanel, setActiveToolPanel] = useState<string | null>(null);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [zoom, setZoom] = useState(100); // Initialize zoom level
  const [rotation, setRotation] = useState(0); // Initialize rotation angle
  const [historySteps, setHistorySteps] = useState<any[]>([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);

  // Effects state
  const [effects, setEffects] = useState({
    dotMatrix: false,
    backgroundRemoved: false,
    overlays: [],
    texts: [],
  });

  // Initialize history with initial state
  useEffect(() => {
    if (historySteps.length === 0) {
      setHistorySteps([{ effects }]);
      setCurrentHistoryIndex(0);
    }
  }, []);

  const handleFileSelect = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      console.log("File selected:", file.name, file.type);
  
      // Create object URL for preview
      const url = URL.createObjectURL(file);
      console.log("Generated Object URL:", url);
      setMediaUrl(url);
  
      // Determine media type
      const isVideo = file.type.startsWith("video/");
      setMediaType(isVideo ? "video" : "image");
  
      // If it's a video, automatically show video controls
      if (isVideo) {
        setActiveToolPanel("video");
      }
  
      // Transition to edit mode after file selection
      setMode("edit");
    }
  };
  

  const handleToolSelect = (toolId: string) => {
    setActiveToolPanel(activeToolPanel === toolId ? null : toolId);
  };

  const handleSave = () => {
    setSaveDialogOpen(true);
  };

  const [textOverlays, setTextOverlays] = useState<
    { id: string; content: string; format: TextFormat; position: { x: number; y: number } }[]
  >([]);

  const handleAddText = (text: string, format: TextFormat) => {
    setTextOverlays((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        content: text,
        format,
        position: { x: 50, y: 50 }, // Default starting position
      },
    ]);
  };
  
  const handleFormatText = (id: string, format: TextFormat) => {
    setTextOverlays((prev) =>
      prev.map((overlay) =>
        overlay.id === id ? { ...overlay, format } : overlay
      )
    );
  };
  

  const handleEffectChange = (effectType: string, value: any) => {
    const newEffects = { ...effects, [effectType]: value };
    setEffects(newEffects);
    addHistoryStep(newEffects);
  };

  const handleNewFile = () => {
    setMode("upload");
    setMediaUrl("");
    setMediaFiles([]);
    setActiveToolPanel(null);
  };

  const handleOpenFile = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*,video/*";
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        handleFileSelect(Array.from(files));
      }
    };
    input.click();
  };

  const handleCloseFile = () => {
    console.log("Closing file and resetting media");
    setMediaUrl(""); // Clears the current image/video
    setMediaFiles([]);
    // setMode("upload");
    setActiveToolPanel(null);
  };



  const handleGenerateAI = () => {
    // Simulate AI image generation with a placeholder
    setMediaUrl("https://images.unsplash.com/photo-1682687982501-1e58ab814714");
    setMediaType("image");
    setMode("edit");
  };

  const renderToolPanel = () => {
    switch (activeToolPanel) {
      case "dotMatrix":
        return (
          <DotMatrixPanel
            onApply={(settings) => handleEffectChange("dotMatrix", settings)}
          />
        );
      case "background":
        return <BackgroundPanel />;
      case "effects":
        return <EffectsPanel />;
      case "text":
        return <TextPanel />;
      case "overlay":
        return <OverlayPanel />;
      case "video":
        return (
          <div className="w-full h-full bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <Video className="h-5 w-5 text-blue-500" />
              Video Controls
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Playback Speed</label>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    0.5x
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    1x
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    1.5x
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    2x
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Trim Video</label>
                <div className="h-8 bg-gray-700 rounded-md relative">
                  <div className="absolute left-1/4 right-1/4 top-0 bottom-0 bg-blue-500/30 border-l-2 border-r-2 border-blue-500"></div>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>00:00</span>
                  <span>01:30</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Volume</label>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    Mute
                  </Button>
                  <div className="h-2 flex-1 bg-gray-700 rounded-full">
                    <div className="h-full w-3/4 bg-blue-500 rounded-full"></div>
                  </div>
                  <span className="text-xs">75%</span>
                </div>
              </div>

              <div className="pt-4">
                <Button className="w-full">Apply Changes</Button>
              </div>
            </div>
          </div>
        );
      case "gallery":
        return (
          <div className="w-full h-full bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <FileImage className="h-5 w-5 text-blue-500" />
              Gallery
            </h3>

            <Tabs defaultValue="unsplash">
              <TabsList className="w-full grid grid-cols-2 mb-4">
                <TabsTrigger value="unsplash">Unsplash</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
              </TabsList>

              <TabsContent value="unsplash" className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "https://images.unsplash.com/photo-1682687982501-1e58ab814714",
                    "https://images.unsplash.com/photo-1682687218147-9806132dc697",
                    "https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1",
                    "https://images.unsplash.com/photo-1682685797743-3a7b6b8d8149",
                  ].map((url, index) => (
                    <div
                      key={index}
                      className="cursor-pointer rounded-md overflow-hidden h-24"
                      onClick={() => {
                        setMediaUrl(url);
                        setMediaType("image");
                        setMode("edit");
                      }}
                    >
                      <img
                        src={url}
                        alt={`Gallery image ${index}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="templates" className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "https://images.unsplash.com/photo-1557683311-eac922347aa1",
                    "https://images.unsplash.com/photo-1557683316-973673baf926",
                    "https://images.unsplash.com/photo-1615266508370-7e77ea6b1f79",
                    "https://images.unsplash.com/photo-1557682268-e3955ed5d83f",
                  ].map((url, index) => (
                    <div
                      key={index}
                      className="cursor-pointer rounded-md overflow-hidden h-24"
                      onClick={() => {
                        setMediaUrl(url);
                        setMediaType("image");
                        setMode("edit");
                      }}
                    >
                      <img
                        src={url}
                        alt={`Template ${index}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        );
      case "ai":
        return (
          <div className="w-full h-full bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <ImagePlus className="h-5 w-5 text-blue-500" />
              AI Image Generator
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Prompt</label>
                <textarea
                  className="w-full h-24 bg-gray-700 border border-gray-600 rounded-md p-2 text-sm"
                  placeholder="Describe the image you want to generate..."
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Style</label>
                <div className="grid grid-cols-2 gap-2">
                  <Button size="sm" variant="outline">
                    Photorealistic
                  </Button>
                  <Button size="sm" variant="outline">
                    Artistic
                  </Button>
                  <Button size="sm" variant="outline">
                    3D Render
                  </Button>
                  <Button size="sm" variant="outline">
                    Cartoon
                  </Button>
                </div>
              </div>

              <div className="pt-4">
                <Button className="w-full" onClick={handleGenerateAI}>
                  Generate Image
                </Button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-gray-900 text-white">
      {/* Main content area */}
      <div className="flex-1 flex relative overflow-hidden">
        <AnimatePresence mode="wait">
          {mode === "upload" ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full flex items-center justify-center p-6"
            >
              <div className="w-full max-w-3xl">
                <UploadArea onFileSelect={handleFileSelect} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="edit"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full flex flex-col"
            >
              {/* Top Navbar */}
              <div className="w-full h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-6">
                <div className="flex items-center gap-2">
                  <Wand2 className="h-6 w-6 text-blue-500" />
                  <h1 className="text-xl font-bold text-white">
                    PixelPro Editor
                  </h1>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center mr-6">
                    <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center mr-2">
                      <span className="text-xs font-bold">JD</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm">John Doe</span>
                      <span className="text-xs text-gray-400">
                        Pro Plan (3/10 credits)
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="text-gray-300 hover:text-white"
                  >
                    <Settings className="h-5 w-5 mr-2" />
                    Settings
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-gray-300 hover:text-white"
                  >
                    <HelpCircle className="h-5 w-5 mr-2" />
                    Help
                  </Button>
                </div>
              </div>

              <div className="flex flex-1 overflow-hidden">
                {/* Left sidebar - Tools and Control Panels */}
                <div className="flex h-full">
                  {/* Tool Icons */}
                  <div className="w-16 bg-gray-800 border-r border-gray-700 flex flex-col items-center py-4 space-y-6">
                    <button
                      onClick={() => handleToolSelect("background")}
                      className={`p-3 rounded-lg ${activeToolPanel === "background" ? "bg-blue-600" : "hover:bg-gray-700"}`}
                    >
                      <span className="sr-only">Background Tools</span>
                      <Image className="h-6 w-6" />
                    </button>

                    <button
                      onClick={() => handleToolSelect("effects")}
                      className={`p-3 rounded-lg ${activeToolPanel === "effects" ? "bg-blue-600" : "hover:bg-gray-700"}`}
                    >
                      <span className="sr-only">Effects</span>
                      <Palette className="h-6 w-6" />
                    </button>

                    <button
                      onClick={() => handleToolSelect("dotMatrix")}
                      className={`p-3 rounded-lg ${activeToolPanel === "dotMatrix" ? "bg-blue-600" : "hover:bg-gray-700"}`}
                    >
                      <span className="sr-only">Dot Matrix</span>
                      <Grid className="h-6 w-6" />
                    </button>

                    <button
                      onClick={() => handleToolSelect("text")}
                      className={`p-3 rounded-lg ${activeToolPanel === "text" ? "bg-blue-600" : "hover:bg-gray-700"}`}
                    >
                      <span className="sr-only">Text</span>
                      <Type className="h-6 w-6" />
                    </button>

                    <button
                      onClick={() => handleToolSelect("overlay")}
                      className={`p-3 rounded-lg ${activeToolPanel === "overlay" ? "bg-blue-600" : "hover:bg-gray-700"}`}
                    >
                      <span className="sr-only">Overlays</span>
                      <Layers className="h-6 w-6" />
                    </button>

                    {mediaType === "video" && (
                      <button
                        onClick={() => handleToolSelect("video")}
                        className={`p-3 rounded-lg ${activeToolPanel === "video" ? "bg-blue-600" : "hover:bg-gray-700"}`}
                      >
                        <span className="sr-only">Video Controls</span>
                        <Video className="h-6 w-6" />
                      </button>
                    )}

                    <button
                      onClick={() => handleToolSelect("gallery")}
                      className={`p-3 rounded-lg ${activeToolPanel === "gallery" ? "bg-blue-600" : "hover:bg-gray-700"}`}
                    >
                      <span className="sr-only">Gallery</span>
                      <FileImage className="h-6 w-6" />
                    </button>

                    <button
                      onClick={() => handleToolSelect("ai")}
                      className={`p-3 rounded-lg ${activeToolPanel === "ai" ? "bg-blue-600" : "hover:bg-gray-700"}`}
                    >
                      <span className="sr-only">AI Generator</span>
                      <ImagePlus className="h-6 w-6" />
                    </button>
                  </div>

                  {/* Control Panel */}
                  <AnimatePresence>
                    {activeToolPanel && (
                      <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 300, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="h-full bg-gray-800 border-r border-gray-700 overflow-hidden"
                      >
                        <div className="p-4 h-full overflow-y-auto">
                          {renderToolPanel()}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Main editing area */}
                <div className="flex-1 flex flex-col">
                  {/* Action controls below navbar */}
                  <div className="w-full">
                    <ActionControls
                      onZoomIn={() => setZoom((prev) => Math.min(prev + 10, 200))}
                      onZoomOut={() => setZoom((prev) => Math.max(prev - 10, 10))}
                      onRotateLeft={() => setRotation((prev) => prev - 90)}
                      onRotateRight={() => setRotation((prev) => prev + 90)}
                      zoomLevel={zoom}
  
                      onNewFile={handleNewFile}
                      onOpenFile={handleOpenFile}
                      onCloseFile={handleCloseFile}
                    />
                  </div>

                  {/* Canvas area */}
                  <div className="flex-1 relative bg-gray-900">
                    {mediaUrl ? (
                      <EditingCanvas
                        mediaUrl={mediaUrl}
                        mediaType={mediaType}
                        textOverlays={textOverlays} // Ensure text is passed
                        // dotMatrixSettings={dotMatrixSettings}
                        zoomLevel={zoom}
                        rotation={rotation}
                        onZoomChange={setZoom}
                        onRotateChange={setRotation}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center text-gray-400">
                          <FileImage className="h-16 w-16 mx-auto mb-4 opacity-30" />
                          <p className="text-lg">No media loaded</p>
                          <p className="text-sm mt-2">
                            Use the file controls to open an image or video
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="w-full h-8 bg-gray-800 border-t border-gray-700 flex items-center justify-between px-6 text-xs text-gray-400">
        <div>© 2023 PixelPro. All rights reserved.</div>
        <div className="flex items-center gap-4">
          <span>Version 1.0.0</span>
          <span>|</span>
          <span>CPU: 32% | Memory: 1.2GB</span>
        </div>
      </div>

      {/* Save Options Dialog */}
      <SaveOptionsDialog
        open={saveDialogOpen}
        onOpenChange={setSaveDialogOpen}
        onSave={(type) => console.log(`Saving as ${type}`)}
        onExport={(format) => console.log(`Exporting as ${format}`)}
        onShare={(platform) => console.log(`Sharing on ${platform}`)}
      />
    </div>
  );
};

export default EditorLayout;
