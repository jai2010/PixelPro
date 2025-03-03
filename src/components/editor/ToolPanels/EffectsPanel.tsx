import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Wand2,
  Sparkles,
  Droplets,
  Contrast,
  Palette,
  Layers,
  SunMoon,
} from "lucide-react";

interface EffectsPanelProps {
  onEffectChange?: (effect: string, value: number | boolean | string) => void;
  activeEffects?: Record<string, any>;
}

const EffectsPanel = ({
  onEffectChange = () => {},
  activeEffects = {},
}: EffectsPanelProps) => {
  const [activeTab, setActiveTab] = useState("filters");

  // Default values for effects
  const defaultFilters = {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    blur: 0,
    grayscale: false,
    sepia: false,
    invert: false,
  };

  const defaultAdjustments = {
    hue: 0,
    temperature: 0,
    vignette: 0,
    noise: 0,
  };

  const defaultTransformations = {
    pixelate: 0,
    crystallize: 0,
    glitch: 0,
    style: "none",
  };

  // Combine defaults with any active effects
  const filters = { ...defaultFilters, ...activeEffects.filters };
  const adjustments = { ...defaultAdjustments, ...activeEffects.adjustments };
  const transformations = {
    ...defaultTransformations,
    ...activeEffects.transformations,
  };

  const handleFilterChange = (filter: string, value: number | boolean) => {
    onEffectChange(`filters.${filter}`, value);
  };

  const handleAdjustmentChange = (adjustment: string, value: number) => {
    onEffectChange(`adjustments.${adjustment}`, value);
  };

  const handleTransformationChange = (
    transformation: string,
    value: number | string,
  ) => {
    onEffectChange(`transformations.${transformation}`, value);
  };

  return (
    <div className="w-full h-full bg-gray-800 text-white p-4 rounded-lg overflow-y-auto">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Wand2 className="h-5 w-5" />
        Effects
      </h2>

      <Tabs
        defaultValue="filters"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="w-full grid grid-cols-3 mb-4">
          <TabsTrigger value="filters" className="flex items-center gap-1">
            <Contrast className="h-4 w-4" />
            <span>Filters</span>
          </TabsTrigger>
          <TabsTrigger value="adjustments" className="flex items-center gap-1">
            <Palette className="h-4 w-4" />
            <span>Adjust</span>
          </TabsTrigger>
          <TabsTrigger
            value="transformations"
            className="flex items-center gap-1"
          >
            <Sparkles className="h-4 w-4" />
            <span>Transform</span>
          </TabsTrigger>
        </TabsList>

        {/* Filters Tab */}
        <TabsContent value="filters" className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm">Brightness</label>
                <span className="text-xs">{filters.brightness}%</span>
              </div>
              <Slider
                value={[filters.brightness]}
                min={0}
                max={200}
                step={1}
                onValueChange={(value) =>
                  handleFilterChange("brightness", value[0])
                }
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm">Contrast</label>
                <span className="text-xs">{filters.contrast}%</span>
              </div>
              <Slider
                value={[filters.contrast]}
                min={0}
                max={200}
                step={1}
                onValueChange={(value) =>
                  handleFilterChange("contrast", value[0])
                }
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm">Saturation</label>
                <span className="text-xs">{filters.saturation}%</span>
              </div>
              <Slider
                value={[filters.saturation]}
                min={0}
                max={200}
                step={1}
                onValueChange={(value) =>
                  handleFilterChange("saturation", value[0])
                }
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm">Blur</label>
                <span className="text-xs">{filters.blur}px</span>
              </div>
              <Slider
                value={[filters.blur]}
                min={0}
                max={20}
                step={0.5}
                onValueChange={(value) => handleFilterChange("blur", value[0])}
              />
            </div>

            <div className="pt-2 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm">Grayscale</label>
                <Switch
                  checked={filters.grayscale}
                  onCheckedChange={(checked) =>
                    handleFilterChange("grayscale", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm">Sepia</label>
                <Switch
                  checked={filters.sepia}
                  onCheckedChange={(checked) =>
                    handleFilterChange("sepia", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm">Invert</label>
                <Switch
                  checked={filters.invert}
                  onCheckedChange={(checked) =>
                    handleFilterChange("invert", checked)
                  }
                />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Adjustments Tab */}
        <TabsContent value="adjustments" className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm">Hue Rotate</label>
                <span className="text-xs">{adjustments.hue}°</span>
              </div>
              <Slider
                value={[adjustments.hue]}
                min={0}
                max={360}
                step={1}
                onValueChange={(value) =>
                  handleAdjustmentChange("hue", value[0])
                }
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm">
                  <SunMoon className="h-4 w-4 inline mr-1" />
                  Temperature
                </label>
                <span className="text-xs">{adjustments.temperature}</span>
              </div>
              <Slider
                value={[adjustments.temperature]}
                min={-100}
                max={100}
                step={1}
                onValueChange={(value) =>
                  handleAdjustmentChange("temperature", value[0])
                }
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm">Vignette</label>
                <span className="text-xs">{adjustments.vignette}%</span>
              </div>
              <Slider
                value={[adjustments.vignette]}
                min={0}
                max={100}
                step={1}
                onValueChange={(value) =>
                  handleAdjustmentChange("vignette", value[0])
                }
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm">Noise</label>
                <span className="text-xs">{adjustments.noise}%</span>
              </div>
              <Slider
                value={[adjustments.noise]}
                min={0}
                max={100}
                step={1}
                onValueChange={(value) =>
                  handleAdjustmentChange("noise", value[0])
                }
              />
            </div>
          </div>
        </TabsContent>

        {/* Transformations Tab */}
        <TabsContent value="transformations" className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm">Pixelate</label>
                <span className="text-xs">{transformations.pixelate}%</span>
              </div>
              <Slider
                value={[transformations.pixelate]}
                min={0}
                max={100}
                step={1}
                onValueChange={(value) =>
                  handleTransformationChange("pixelate", value[0])
                }
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm">Crystallize</label>
                <span className="text-xs">{transformations.crystallize}%</span>
              </div>
              <Slider
                value={[transformations.crystallize]}
                min={0}
                max={100}
                step={1}
                onValueChange={(value) =>
                  handleTransformationChange("crystallize", value[0])
                }
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm">Glitch</label>
                <span className="text-xs">{transformations.glitch}%</span>
              </div>
              <Slider
                value={[transformations.glitch]}
                min={0}
                max={100}
                step={1}
                onValueChange={(value) =>
                  handleTransformationChange("glitch", value[0])
                }
              />
            </div>

            <div className="space-y-2 pt-2">
              <label className="text-sm block mb-1">Style Transfer</label>
              <Select
                value={transformations.style}
                onValueChange={(value) =>
                  handleTransformationChange("style", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="painting">Painting</SelectItem>
                  <SelectItem value="sketch">Sketch</SelectItem>
                  <SelectItem value="cartoon">Cartoon</SelectItem>
                  <SelectItem value="neon">Neon</SelectItem>
                  <SelectItem value="vintage">Vintage</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Accordion type="single" collapsible className="mt-4">
            <AccordionItem value="presets">
              <AccordionTrigger className="text-sm">
                Effect Presets
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    className="bg-gray-800 hover:bg-gray-700 p-2 rounded text-xs"
                    onClick={() => {
                      handleTransformationChange("style", "vintage");
                      handleAdjustmentChange("vignette", 40);
                      handleFilterChange("sepia", true);
                    }}
                  >
                    Vintage
                  </button>
                  <button
                    className="bg-gray-800 hover:bg-gray-700 p-2 rounded text-xs"
                    onClick={() => {
                      handleTransformationChange("glitch", 30);
                      handleFilterChange("contrast", 120);
                    }}
                  >
                    Cyberpunk
                  </button>
                  <button
                    className="bg-gray-800 hover:bg-gray-700 p-2 rounded text-xs"
                    onClick={() => {
                      handleFilterChange("grayscale", true);
                      handleFilterChange("contrast", 130);
                    }}
                  >
                    Noir
                  </button>
                  <button
                    className="bg-gray-800 hover:bg-gray-700 p-2 rounded text-xs"
                    onClick={() => {
                      handleTransformationChange("style", "cartoon");
                      handleFilterChange("saturation", 130);
                    }}
                  >
                    Cartoon
                  </button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EffectsPanel;
