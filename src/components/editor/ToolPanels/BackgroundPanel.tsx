import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Wand2, Eraser, Upload, Image } from "lucide-react";

interface BackgroundPanelProps {
  onRemoveBackground?: () => void;
  onReplaceBackground?: (imageUrl: string) => void;
  backgroundOpacity?: number;
  setBackgroundOpacity?: (value: number) => void;
  enableAutoDetection?: boolean;
  setEnableAutoDetection?: (value: boolean) => void;
}

const BackgroundPanel = ({
  onRemoveBackground = () => {},
  onReplaceBackground = () => {},
  backgroundOpacity = 100,
  setBackgroundOpacity = () => {},
  enableAutoDetection = true,
  setEnableAutoDetection = () => {},
}: BackgroundPanelProps) => {
  const [activeTab, setActiveTab] = useState("remove");
  const [selectedBackground, setSelectedBackground] = useState<string | null>(
    null,
  );

  // Mock background images for the replace tab
  const backgroundOptions = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1511300636408-a63a89df3482?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1506260408121-e353d10b87c7?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=300&h=200&fit=crop",
  ];

  const handleBackgroundSelect = (imageUrl: string) => {
    setSelectedBackground(imageUrl);
    onReplaceBackground(imageUrl);
  };

  const handleOpacityChange = (value: number[]) => {
    setBackgroundOpacity(value[0]);
  };

  const handleAutoDetectionToggle = (checked: boolean) => {
    setEnableAutoDetection(checked);
  };

  return (
    <Card className="w-full h-full bg-gray-800 text-white border-gray-700">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Image size={18} />
          Background Tools
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="remove"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 w-full mb-4">
            <TabsTrigger value="remove">Remove</TabsTrigger>
            <TabsTrigger value="replace">Replace</TabsTrigger>
          </TabsList>

          <TabsContent value="remove" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Auto Detection</span>
                <Switch
                  checked={enableAutoDetection}
                  onCheckedChange={handleAutoDetectionToggle}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Precision</span>
                  <span className="text-xs text-gray-400">
                    {backgroundOpacity}%
                  </span>
                </div>
                <Slider
                  value={[backgroundOpacity]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={handleOpacityChange}
                />
              </div>

              <div className="pt-2">
                <Button
                  className="w-full flex items-center justify-center gap-2"
                  onClick={onRemoveBackground}
                >
                  <Eraser size={16} />
                  Remove Background
                </Button>
              </div>

              <div className="pt-2 text-xs text-gray-400">
                <p>
                  Use the eraser tool for manual adjustments after automatic
                  removal.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="replace" className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {backgroundOptions.map((bg, index) => (
                <div
                  key={index}
                  className={`relative cursor-pointer rounded-md overflow-hidden h-20 border-2 ${selectedBackground === bg ? "border-blue-500" : "border-transparent"}`}
                  onClick={() => handleBackgroundSelect(bg)}
                >
                  <img
                    src={bg}
                    alt={`Background ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              className="w-full mt-2 flex items-center justify-center gap-2 bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
            >
              <Upload size={16} />
              Upload Image
            </Button>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Opacity</span>
                <span className="text-xs text-gray-400">
                  {backgroundOpacity}%
                </span>
              </div>
              <Slider
                value={[backgroundOpacity]}
                min={0}
                max={100}
                step={1}
                onValueChange={handleOpacityChange}
              />
            </div>

            <Button
              className="w-full flex items-center justify-center gap-2"
              onClick={() =>
                selectedBackground && onReplaceBackground(selectedBackground)
              }
              disabled={!selectedBackground}
            >
              <Wand2 size={16} />
              Apply Background
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BackgroundPanel;
