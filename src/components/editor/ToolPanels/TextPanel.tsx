import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Type,
  Palette,
} from "lucide-react";

interface TextPanelProps {
  onAddText?: (text: string) => void;
  onFormatText?: (format: TextFormat) => void;
}

interface TextFormat {
  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  fontStyle: string;
  textDecoration: string;
  color: string;
  alignment: "left" | "center" | "right";
}

const TextPanel = ({
  onAddText = () => {},
  onFormatText = () => {},
}: TextPanelProps) => {
  const [text, setText] = useState("Add your text here");
  const [textFormat, setTextFormat] = useState<TextFormat>({
    fontFamily: "Inter",
    fontSize: 24,
    fontWeight: "normal",
    fontStyle: "normal",
    textDecoration: "none",
    color: "#ffffff",
    alignment: "left",
  });

  const [activeTab, setActiveTab] = useState("add");

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleAddText = () => {
    onAddText(text);
  };

  const updateFormat = (updates: Partial<TextFormat>) => {
    const newFormat = { ...textFormat, ...updates };
    setTextFormat(newFormat);
    onFormatText(newFormat);
  };

  const toggleBold = () => {
    updateFormat({
      fontWeight: textFormat.fontWeight === "bold" ? "normal" : "bold",
    });
  };

  const toggleItalic = () => {
    updateFormat({
      fontStyle: textFormat.fontStyle === "italic" ? "normal" : "italic",
    });
  };

  const toggleUnderline = () => {
    updateFormat({
      textDecoration:
        textFormat.textDecoration === "underline" ? "none" : "underline",
    });
  };

  const setAlignment = (alignment: "left" | "center" | "right") => {
    updateFormat({ alignment });
  };

  return (
    <div className="w-full h-full bg-gray-800 text-white p-4 rounded-lg">
      <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
        <Type size={18} />
        Text Tools
      </h3>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="add" className="flex-1">
            Add Text
          </TabsTrigger>
          <TabsTrigger value="format" className="flex-1">
            Format
          </TabsTrigger>
        </TabsList>

        <TabsContent value="add" className="space-y-4">
          <div>
            <label className="block text-sm mb-2">Text Content</label>
            <Input
              value={text}
              onChange={handleTextChange}
              className="bg-gray-800 border-gray-700"
            />
          </div>

          <div className="pt-2">
            <Button onClick={handleAddText} className="w-full">
              Add to Canvas
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="format" className="space-y-4">
          <div>
            <label className="block text-sm mb-2">Font Family</label>
            <Select
              value={textFormat.fontFamily}
              onValueChange={(value) => updateFormat({ fontFamily: value })}
            >
              <SelectTrigger className="bg-gray-800 border-gray-700">
                <SelectValue placeholder="Select font" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Inter">Inter</SelectItem>
                <SelectItem value="Roboto">Roboto</SelectItem>
                <SelectItem value="Montserrat">Montserrat</SelectItem>
                <SelectItem value="Playfair Display">
                  Playfair Display
                </SelectItem>
                <SelectItem value="Comic Sans MS">Comic Sans MS</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm mb-2">
              Font Size: {textFormat.fontSize}px
            </label>
            <Slider
              value={[textFormat.fontSize]}
              min={8}
              max={72}
              step={1}
              onValueChange={(value) => updateFormat({ fontSize: value[0] })}
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Text Style</label>
            <div className="flex gap-2">
              <Button
                variant={
                  textFormat.fontWeight === "bold" ? "default" : "outline"
                }
                size="icon"
                onClick={toggleBold}
              >
                <Bold size={16} />
              </Button>
              <Button
                variant={
                  textFormat.fontStyle === "italic" ? "default" : "outline"
                }
                size="icon"
                onClick={toggleItalic}
              >
                <Italic size={16} />
              </Button>
              <Button
                variant={
                  textFormat.textDecoration === "underline"
                    ? "default"
                    : "outline"
                }
                size="icon"
                onClick={toggleUnderline}
              >
                <Underline size={16} />
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">Alignment</label>
            <div className="flex gap-2">
              <Button
                variant={
                  textFormat.alignment === "left" ? "default" : "outline"
                }
                size="icon"
                onClick={() => setAlignment("left")}
              >
                <AlignLeft size={16} />
              </Button>
              <Button
                variant={
                  textFormat.alignment === "center" ? "default" : "outline"
                }
                size="icon"
                onClick={() => setAlignment("center")}
              >
                <AlignCenter size={16} />
              </Button>
              <Button
                variant={
                  textFormat.alignment === "right" ? "default" : "outline"
                }
                size="icon"
                onClick={() => setAlignment("right")}
              >
                <AlignRight size={16} />
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">Text Color</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full flex justify-between items-center bg-gray-800 border-gray-700"
                >
                  <div className="flex items-center gap-2">
                    <Palette size={16} />
                    <span>Select Color</span>
                  </div>
                  <div
                    className="w-6 h-6 rounded-full border border-gray-600"
                    style={{ backgroundColor: textFormat.color }}
                  />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 bg-gray-800 border-gray-700">
                <div className="grid grid-cols-5 gap-2">
                  {[
                    "#ffffff",
                    "#ff0000",
                    "#00ff00",
                    "#0000ff",
                    "#ffff00",
                    "#00ffff",
                    "#ff00ff",
                    "#c0c0c0",
                    "#808080",
                    "#800000",
                    "#808000",
                    "#008000",
                    "#800080",
                    "#008080",
                    "#000080",
                    "#ffa500",
                    "#ffc0cb",
                    "#800020",
                    "#9370db",
                    "#40e0d0",
                  ].map((color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full border ${textFormat.color === color ? "border-white border-2" : "border-gray-600"}`}
                      style={{ backgroundColor: color }}
                      onClick={() => updateFormat({ color })}
                    />
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div className="pt-2">
            <div className="p-4 bg-gray-800 rounded-md">
              <p
                style={{
                  fontFamily: textFormat.fontFamily,
                  fontSize: `${textFormat.fontSize}px`,
                  fontWeight: textFormat.fontWeight,
                  fontStyle: textFormat.fontStyle,
                  textDecoration: textFormat.textDecoration,
                  color: textFormat.color,
                  textAlign: textFormat.alignment,
                }}
              >
                {text || "Preview Text"}
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TextPanel;
