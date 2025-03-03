import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EditorLayout from "./editor/EditorLayout";
import UploadArea from "./editor/UploadArea";
import { Button } from "./ui/button";
import { Image, Video, Wand2, Sparkles, Upload } from "lucide-react";

const Home: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFileSelect = (files: File[]) => {
    setUploadedFiles(files);
    if (files.length > 0) {
      // Transition to editor after a short delay
      setTimeout(() => {
        setIsStarted(true);
      }, 500);
    }
  };

  return (
    <div className="w-full h-screen bg-gray-900 text-white overflow-hidden">
      <AnimatePresence mode="wait">
        {!isStarted ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full flex flex-col"
          >
            {/* Header */}
            <header className="w-full py-4 px-6 flex items-center justify-between border-b border-gray-800">
              <div className="flex items-center gap-2">
                <Wand2 className="h-6 w-6 text-blue-500" />
                <h1 className="text-xl font-bold">PixelPro</h1>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  className="text-gray-300 hover:text-white"
                >
                  Sign In
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Get Started
                </Button>
              </div>
            </header>

            {/* Hero section */}
            <div className="flex-1 flex flex-col md:flex-row items-center justify-center px-6 py-12">
              <div className="md:w-1/2 space-y-6 mb-8 md:mb-0 md:pr-8">
                <motion.h2
                  className="text-4xl md:text-5xl font-bold leading-tight"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Transform Your Media with{" "}
                  <span className="text-blue-500">Powerful</span> Editing Tools
                </motion.h2>
                <motion.p
                  className="text-lg text-gray-300"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Upload, edit, and transform images and videos with our
                  intuitive web-based editor. Remove backgrounds, apply special
                  effects, and create stunning visuals in minutes.
                </motion.p>
                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex items-center gap-2">
                    <Image className="h-5 w-5 text-green-500" />
                    <span>Image Editing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Video className="h-5 w-5 text-purple-500" />
                    <span>Video Editing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wand2 className="h-5 w-5 text-yellow-500" />
                    <span>Background Removal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-blue-500" />
                    <span>Special Effects</span>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="md:w-1/2 w-full max-w-xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Upload className="h-5 w-5 text-blue-500" />
                    Get Started with Your Media
                  </h3>
                  <UploadArea
                    onFileSelect={handleFileSelect}
                    acceptedFileTypes={[
                      "image/jpeg",
                      "image/png",
                      "image/gif",
                      "video/mp4",
                      "video/quicktime",
                    ]}
                  />
                </div>
              </motion.div>
            </div>

            {/* Footer */}
            <footer className="w-full py-4 px-6 border-t border-gray-800 text-sm text-gray-400">
              <div className="flex justify-between items-center">
                <p>© 2023 PixelPro. All rights reserved.</p>
                <div className="flex gap-4">
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                  <a href="#" className="hover:text-white">
                    Terms of Service
                  </a>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </div>
              </div>
            </footer>
          </motion.div>
        ) : (
          <motion.div
            key="editor"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            <EditorLayout initialMode="edit" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
