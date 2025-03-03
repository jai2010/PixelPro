import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Image,
  Sticker,
  Square,
  Circle,
  Triangle,
  Star,
  Plus,
  Minus,
  RotateCw,
  Move,
  Trash2,
} from "lucide-react";

interface OverlayItem {
  id: string;
  type: "image" | "shape" | "sticker";
  name: string;
  src?: string;
  shape?: "square" | "circle" | "triangle" | "star";
}

interface OverlayPanelProps {
  onAddOverlay?: (item: OverlayItem) => void;
  onPositionOverlay?: (id: string, position: { x: number; y: number }) => void;
  onRemoveOverlay?: (id: string) => void;
  overlayItems?: OverlayItem[];
}

const OverlayPanel = ({
  onAddOverlay = () => {},
  onPositionOverlay = () => {},
  onRemoveOverlay = () => {},
  overlayItems = [
    {
      id: "1",
      type: "image",
      name: "Sample Image",
      src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809",
    },
    { id: "2", type: "shape", name: "Square", shape: "square" },
    {
      id: "3",
      type: "sticker",
      name: "Star Sticker",
      src: "https://api.dicebear.com/7.x/avataaars/svg?seed=overlay",
    },
  ],
}: OverlayPanelProps) => {
  const [activeTab, setActiveTab] = useState("gallery");
  const [opacity, setOpacity] = useState(100);
  const [scale, setScale] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [selectedOverlay, setSelectedOverlay] = useState<string | null>(null);

  const handleAddImage = () => {
    const newItem: OverlayItem = {
      id: `image-${Date.now()}`,
      type: "image",
      name: "New Image",
      src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809",
    };
    onAddOverlay(newItem);
  };

  const handleAddShape = (shape: "square" | "circle" | "triangle" | "star") => {
    const newItem: OverlayItem = {
      id: `shape-${Date.now()}`,
      type: "shape",
      name: `${shape.charAt(0).toUpperCase() + shape.slice(1)}`,
      shape,
    };
    onAddOverlay(newItem);
  };

  const handleAddSticker = () => {
    const newItem: OverlayItem = {
      id: `sticker-${Date.now()}`,
      type: "sticker",
      name: "New Sticker",
      src: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`,
    };
    onAddOverlay(newItem);
  };

  const renderShapeIcon = (shape?: string) => {
    switch (shape) {
      case "square":
        return <Square className="h-5 w-5" />;
      case "circle":
        return <Circle className="h-5 w-5" />;
      case "triangle":
        return <Triangle className="h-5 w-5" />;
      case "star":
        return <Star className="h-5 w-5" />;
      default:
        return <Square className="h-5 w-5" />;
    }
  };

  return (
    <Card className="w-full h-full bg-gray-800 border-gray-700 text-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Overlay Elements</CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-4">
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="shapes">Shapes</TabsTrigger>
            <TabsTrigger value="stickers">Stickers</TabsTrigger>
          </TabsList>

          <TabsContent value="gallery" className="h-[200px] overflow-y-auto">
            <div className="grid grid-cols-2 gap-2">
              {overlayItems
                .filter((item) => item.type === "image")
                .map((item) => (
                  <div
                    key={item.id}
                    className={`relative rounded-md overflow-hidden cursor-pointer border-2 ${selectedOverlay === item.id ? "border-primary" : "border-transparent"}`}
                    onClick={() => setSelectedOverlay(item.id)}
                  >
                    <img
                      src={item.src}
                      alt={item.name}
                      className="w-full h-20 object-cover"
                    />
                  </div>
                ))}
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center gap-1"
                onClick={handleAddImage}
              >
                <Plus className="h-5 w-5" />
                <span className="text-xs">Add Image</span>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="shapes" className="h-[200px] overflow-y-auto">
            <div className="grid grid-cols-2 gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-20 flex flex-col items-center justify-center gap-1"
                      onClick={() => handleAddShape("square")}
                    >
                      <Square className="h-8 w-8" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add Square</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-20 flex flex-col items-center justify-center gap-1"
                      onClick={() => handleAddShape("circle")}
                    >
                      <Circle className="h-8 w-8" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add Circle</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-20 flex flex-col items-center justify-center gap-1"
                      onClick={() => handleAddShape("triangle")}
                    >
                      <Triangle className="h-8 w-8" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add Triangle</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-20 flex flex-col items-center justify-center gap-1"
                      onClick={() => handleAddShape("star")}
                    >
                      <Star className="h-8 w-8" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add Star</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </TabsContent>

          <TabsContent value="stickers" className="h-[200px] overflow-y-auto">
            <div className="grid grid-cols-2 gap-2">
              {overlayItems
                .filter((item) => item.type === "sticker")
                .map((item) => (
                  <div
                    key={item.id}
                    className={`relative rounded-md overflow-hidden cursor-pointer border-2 ${selectedOverlay === item.id ? "border-primary" : "border-transparent"}`}
                    onClick={() => setSelectedOverlay(item.id)}
                  >
                    <img
                      src={item.src}
                      alt={item.name}
                      className="w-full h-20 object-contain p-2"
                    />
                  </div>
                ))}
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center gap-1"
                onClick={handleAddSticker}
              >
                <Sticker className="h-5 w-5" />
                <span className="text-xs">Add Sticker</span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {selectedOverlay && (
          <div className="mt-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="position">
                <AccordionTrigger className="py-2">
                  <div className="flex items-center gap-2">
                    <Move className="h-4 w-4" />
                    <span>Position & Transform</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Opacity</span>
                        <span>{opacity}%</span>
                      </div>
                      <Slider
                        value={[opacity]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={(value) => setOpacity(value[0])}
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Scale</span>
                        <span>{scale}%</span>
                      </div>
                      <Slider
                        value={[scale]}
                        min={10}
                        max={200}
                        step={1}
                        onValueChange={(value) => setScale(value[0])}
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Rotation</span>
                        <span>{rotation}°</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => setRotation((prev) => prev - 15)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <Slider
                          className="flex-1"
                          value={[rotation]}
                          min={0}
                          max={360}
                          step={1}
                          onValueChange={(value) => setRotation(value[0])}
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => setRotation((prev) => prev + 15)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => setRotation(0)}
                        >
                          <RotateCw className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <Button
                      variant="destructive"
                      size="sm"
                      className="w-full mt-2"
                      onClick={() => {
                        onRemoveOverlay(selectedOverlay);
                        setSelectedOverlay(null);
                      }}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OverlayPanel;
