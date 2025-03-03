import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Progress } from "../ui/progress";
import {
  Download,
  Share2,
  Save,
  FileImage,
  FileVideo,
  FileText,
} from "lucide-react";

interface SaveOptionsDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSave?: (type: string) => void;
  onExport?: (format: string) => void;
  onShare?: (platform: string) => void;
  usageCounter?: number;
  maxUsage?: number;
  isPremium?: boolean;
}

const SaveOptionsDialog = ({
  open = true,
  onOpenChange,
  onSave = () => {},
  onExport = () => {},
  onShare = () => {},
  usageCounter = 3,
  maxUsage = 5,
  isPremium = false,
}: SaveOptionsDialogProps) => {
  const [selectedTab, setSelectedTab] = useState("save");
  const [exportFormat, setExportFormat] = useState("png");
  const [sharePlatform, setSharePlatform] = useState("email");

  const handleExport = () => {
    onExport(exportFormat);
    onOpenChange?.(false);
  };

  const handleShare = () => {
    onShare(sharePlatform);
    onOpenChange?.(false);
  };

  const handleSave = (type: string) => {
    onSave(type);
    onOpenChange?.(false);
  };

  const usagePercentage = (usageCounter / maxUsage) * 100;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 text-white border-gray-700 max-w-md w-full">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            Save Options
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-center">
            Choose how you want to save or share your creation
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 w-full bg-gray-800">
            <TabsTrigger
              value="save"
              className="data-[state=active]:bg-gray-700"
            >
              <Save className="mr-2 h-4 w-4" />
              Save
            </TabsTrigger>
            <TabsTrigger
              value="export"
              className="data-[state=active]:bg-gray-700"
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </TabsTrigger>
            <TabsTrigger
              value="share"
              className="data-[state=active]:bg-gray-700"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </TabsTrigger>
          </TabsList>

          <TabsContent value="save" className="mt-4">
            <div className="space-y-4">
              <p className="text-sm text-gray-400">
                Save your project to access it later
              </p>
              <div className="grid grid-cols-1 gap-3">
                <Button
                  variant="outline"
                  className="bg-gray-800 border-gray-700 hover:bg-gray-700 justify-start text-left h-auto py-3"
                  onClick={() => handleSave("draft")}
                >
                  <div className="flex items-center">
                    <div className="bg-blue-600 p-2 rounded-md mr-3">
                      <Save className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Save as Draft</h3>
                      <p className="text-xs text-gray-400">
                        Continue editing later
                      </p>
                    </div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="bg-gray-800 border-gray-700 hover:bg-gray-700 justify-start text-left h-auto py-3"
                  onClick={() => handleSave("project")}
                >
                  <div className="flex items-center">
                    <div className="bg-purple-600 p-2 rounded-md mr-3">
                      <Save className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Save as Project</h3>
                      <p className="text-xs text-gray-400">
                        Save with all layers and history
                      </p>
                    </div>
                  </div>
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="export" className="mt-4">
            <div className="space-y-4">
              <p className="text-sm text-gray-400">
                Export your creation in various formats
              </p>

              <div className="space-y-3">
                <p className="text-sm font-medium">Select Format</p>
                <RadioGroup
                  value={exportFormat}
                  onValueChange={setExportFormat}
                  className="grid grid-cols-1 gap-2"
                >
                  <div className="flex items-center space-x-2 bg-gray-800 p-3 rounded-md">
                    <RadioGroupItem value="png" id="png" />
                    <div className="flex items-center">
                      <FileImage className="h-5 w-5 mr-2 text-green-500" />
                      <label
                        htmlFor="png"
                        className="text-sm font-medium cursor-pointer"
                      >
                        PNG Image
                      </label>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 bg-gray-800 p-3 rounded-md">
                    <RadioGroupItem value="jpg" id="jpg" />
                    <div className="flex items-center">
                      <FileImage className="h-5 w-5 mr-2 text-blue-500" />
                      <label
                        htmlFor="jpg"
                        className="text-sm font-medium cursor-pointer"
                      >
                        JPG Image
                      </label>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 bg-gray-800 p-3 rounded-md">
                    <RadioGroupItem value="mp4" id="mp4" />
                    <div className="flex items-center">
                      <FileVideo className="h-5 w-5 mr-2 text-red-500" />
                      <label
                        htmlFor="mp4"
                        className="text-sm font-medium cursor-pointer"
                      >
                        MP4 Video
                      </label>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 bg-gray-800 p-3 rounded-md">
                    <RadioGroupItem value="gif" id="gif" />
                    <div className="flex items-center">
                      <FileVideo className="h-5 w-5 mr-2 text-purple-500" />
                      <label
                        htmlFor="gif"
                        className="text-sm font-medium cursor-pointer"
                      >
                        GIF Animation
                      </label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <Button className="w-full" onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" /> Export{" "}
                {exportFormat.toUpperCase()}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="share" className="mt-4">
            <div className="space-y-4">
              <div className="bg-gray-800 p-3 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium">Premium Feature Usage</p>
                  <span className="text-xs bg-blue-600 px-2 py-1 rounded-full">
                    {isPremium ? "Premium" : `${usageCounter}/${maxUsage}`}
                  </span>
                </div>
                <Progress value={usagePercentage} className="h-2" />
                {!isPremium && usageCounter >= maxUsage && (
                  <p className="text-xs text-amber-400 mt-2">
                    You've reached your sharing limit. Upgrade to Premium for
                    unlimited sharing.
                  </p>
                )}
              </div>

              {isPremium || usageCounter < maxUsage ? (
                <>
                  <p className="text-sm text-gray-400">
                    Share your creation with others
                  </p>
                  <RadioGroup
                    value={sharePlatform}
                    onValueChange={setSharePlatform}
                    className="grid grid-cols-1 gap-2"
                  >
                    <div className="flex items-center space-x-2 bg-gray-800 p-3 rounded-md">
                      <RadioGroupItem value="email" id="email" />
                      <label
                        htmlFor="email"
                        className="text-sm font-medium cursor-pointer"
                      >
                        Email
                      </label>
                    </div>
                    <div className="flex items-center space-x-2 bg-gray-800 p-3 rounded-md">
                      <RadioGroupItem value="social" id="social" />
                      <label
                        htmlFor="social"
                        className="text-sm font-medium cursor-pointer"
                      >
                        Social Media
                      </label>
                    </div>
                    <div className="flex items-center space-x-2 bg-gray-800 p-3 rounded-md">
                      <RadioGroupItem value="link" id="link" />
                      <label
                        htmlFor="link"
                        className="text-sm font-medium cursor-pointer"
                      >
                        Generate Link
                      </label>
                    </div>
                  </RadioGroup>
                  <Button
                    className="w-full"
                    onClick={handleShare}
                    disabled={!isPremium && usageCounter >= maxUsage}
                  >
                    <Share2 className="mr-2 h-4 w-4" /> Share Now
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  className="w-full bg-amber-600 hover:bg-amber-700 border-amber-700"
                >
                  Upgrade to Premium
                </Button>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex justify-between mt-4 pt-4 border-t border-gray-800">
          <Button variant="ghost" onClick={() => onOpenChange?.(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SaveOptionsDialog;
