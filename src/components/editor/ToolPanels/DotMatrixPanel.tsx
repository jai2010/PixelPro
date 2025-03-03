import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Grid, Circle, Square, Triangle } from "lucide-react";

interface DotMatrixPanelProps {
  onApply?: (settings: DotMatrixSettings) => void;
  onReset?: () => void;
  initialSettings?: DotMatrixSettings;
}

interface DotMatrixSettings {
  dotSize: number;
  dotDensity: number;
  dotShape: "circle" | "square" | "triangle";
  dotColor: string;
}

const DotMatrixPanel = ({
  onApply = () => {},
  onReset = () => {},
  initialSettings = {
    dotSize: 5,
    dotDensity: 50,
    dotShape: "circle",
    dotColor: "#ffffff",
  },
}: DotMatrixPanelProps) => {
  const [settings, setSettings] = useState<DotMatrixSettings>(initialSettings);

  const handleSizeChange = (value: number[]) => {
    setSettings({ ...settings, dotSize: value[0] });
  };

  const handleDensityChange = (value: number[]) => {
    setSettings({ ...settings, dotDensity: value[0] });
  };

  const handleShapeChange = (value: "circle" | "square" | "triangle") => {
    setSettings({ ...settings, dotShape: value });
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, dotColor: e.target.value });
  };

  const handleApply = () => {
    onApply(settings);
  };

  const handleReset = () => {
    setSettings(initialSettings);
    onReset();
  };

  // Preview component to show how the dot matrix effect will look
  const DotMatrixPreview = () => {
    const getShapeComponent = () => {
      switch (settings.dotShape) {
        case "circle":
          return (
            <Circle
              size={settings.dotSize * 2}
              fill={settings.dotColor}
              color={settings.dotColor}
            />
          );
        case "square":
          return (
            <Square
              size={settings.dotSize * 2}
              fill={settings.dotColor}
              color={settings.dotColor}
            />
          );
        case "triangle":
          return (
            <Triangle
              size={settings.dotSize * 2}
              fill={settings.dotColor}
              color={settings.dotColor}
            />
          );
        default:
          return (
            <Circle
              size={settings.dotSize * 2}
              fill={settings.dotColor}
              color={settings.dotColor}
            />
          );
      }
    };

    // Calculate number of dots based on density
    const dotCount = Math.max(3, Math.floor(settings.dotDensity / 10));

    return (
      <div className="bg-gray-800 rounded-md p-2 h-32 flex items-center justify-center">
        <div
          className="grid"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${dotCount}, 1fr)`,
            gridTemplateRows: `repeat(${Math.ceil(dotCount / 2)}, 1fr)`,
            gap: `${10 - settings.dotDensity / 20}px`,
            width: "100%",
            height: "100%",
          }}
        >
          {Array.from({ length: dotCount * Math.ceil(dotCount / 2) }).map(
            (_, i) => (
              <div key={i} className="flex items-center justify-center">
                {getShapeComponent()}
              </div>
            ),
          )}
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full h-full bg-background border-border">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Grid className="h-5 w-5" />
          DotMatrix Effect
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Dot Size</label>
          <Slider
            value={[settings.dotSize]}
            min={1}
            max={10}
            step={1}
            onValueChange={handleSizeChange}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Small</span>
            <span>Large</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Dot Density</label>
          <Slider
            value={[settings.dotDensity]}
            min={10}
            max={100}
            step={5}
            onValueChange={handleDensityChange}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Sparse</span>
            <span>Dense</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Dot Shape</label>
          <Select value={settings.dotShape} onValueChange={handleShapeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select shape" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="circle">Circle</SelectItem>
              <SelectItem value="square">Square</SelectItem>
              <SelectItem value="triangle">Triangle</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Dot Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={settings.dotColor}
              onChange={handleColorChange}
              className="w-10 h-10 rounded cursor-pointer"
            />
            <span className="text-sm">{settings.dotColor}</span>
          </div>
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium mb-2 block">Preview</label>
          <DotMatrixPreview />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
        <Button onClick={handleApply}>Apply Effect</Button>
      </CardFooter>
    </Card>
  );
};

export default DotMatrixPanel;
