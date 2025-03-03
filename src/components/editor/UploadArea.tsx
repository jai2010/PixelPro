import React, { useState, useCallback } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Upload, Image, FileImage, Video, File, X } from "lucide-react";
import { motion } from "framer-motion";

interface UploadAreaProps {
  onFileSelect?: (files: File[]) => void;
  acceptedFileTypes?: string[];
  maxFileSize?: number; // in MB
  multiple?: boolean;
}

const UploadArea = ({
  onFileSelect = () => {},
  acceptedFileTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "video/mp4",
    "video/quicktime",
  ],
  maxFileSize = 50, // 50MB default
  multiple = true,
}: UploadAreaProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isDragging) {
        setIsDragging(true);
      }
    },
    [isDragging],
  );

  const validateFile = (file: File): boolean => {
    // Check file type
    if (!acceptedFileTypes.includes(file.type)) {
      setError(
        `File type ${file.type} is not supported. Please upload ${acceptedFileTypes.join(", ")}.`,
      );
      return false;
    }

    // Check file size
    if (file.size > maxFileSize * 1024 * 1024) {
      setError(`File size exceeds ${maxFileSize}MB limit.`);
      return false;
    }

    return true;
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      setError(null);

      const droppedFiles = Array.from(e.dataTransfer.files);

      if (!multiple && droppedFiles.length > 1) {
        setError("Only one file can be uploaded at a time.");
        return;
      }

      const validFiles = droppedFiles.filter(validateFile);

      if (validFiles.length > 0) {
        setFiles(validFiles);
        onFileSelect(validFiles);

        // Simulate upload progress
        setUploadProgress(0);
        const interval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval);
              return 100;
            }
            return prev + 5;
          });
        }, 100);
      }
    },
    [multiple, onFileSelect],
  );

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setError(null);
      if (e.target.files && e.target.files.length > 0) {
        const selectedFiles = Array.from(e.target.files);

        if (!multiple && selectedFiles.length > 1) {
          setError("Only one file can be uploaded at a time.");
          return;
        }

        const validFiles = selectedFiles.filter(validateFile);

        if (validFiles.length > 0) {
          setFiles(validFiles);
          onFileSelect(validFiles);

          // Simulate upload progress
          setUploadProgress(0);
          const interval = setInterval(() => {
            setUploadProgress((prev) => {
              if (prev >= 100) {
                clearInterval(interval);
                return 100;
              }
              return prev + 5;
            });
          }, 100);
        }
      }
    },
    [multiple, onFileSelect],
  );

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    onFileSelect(newFiles);
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) {
      return <Image className="w-6 h-6" />;
    } else if (fileType.startsWith("video/")) {
      return <Video className="w-6 h-6" />;
    } else {
      return <File className="w-6 h-6" />;
    }
  };

  return (
    <div className="w-full h-full bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
      <Card
        className={`w-full h-full flex flex-col items-center justify-center p-8 border-2 border-dashed transition-all ${
          isDragging
            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
            : "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
        }`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {files.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="p-4 rounded-full bg-blue-100 dark:bg-blue-900/30"
            >
              <Upload className="w-12 h-12 text-blue-500" />
            </motion.div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Drag & Drop your files here
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
              Supported formats:{" "}
              {acceptedFileTypes.map((type) => type.split("/")[1]).join(", ")}
              <br />
              Maximum file size: {maxFileSize}MB
            </p>
            <div className="flex items-center justify-center mt-4">
              <Button
                onClick={() => document.getElementById("file-upload")?.click()}
                className="flex items-center space-x-2"
              >
                <FileImage className="w-4 h-4" />
                <span>Browse Files</span>
              </Button>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                multiple={multiple}
                accept={acceptedFileTypes.join(",")}
                onChange={handleFileInputChange}
              />
            </div>
          </div>
        ) : (
          <div className="w-full space-y-4">
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
              Uploaded Files ({files.length})
            </h3>
            <div className="space-y-3 max-h-[300px] overflow-y-auto">
              {files.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    {getFileIcon(file.type)}
                    <div>
                      <p className="text-sm font-medium truncate max-w-[200px]">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(index)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
            {uploadProgress < 100 && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setFiles([]);
                  setUploadProgress(0);
                }}
              >
                Clear All
              </Button>
              <Button
                onClick={() => document.getElementById("file-upload")?.click()}
                className="flex items-center space-x-2"
              >
                <FileImage className="w-4 h-4" />
                <span>Add More Files</span>
              </Button>
            </div>
          </div>
        )}
      </Card>
      {error && (
        <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
};

export default UploadArea;
