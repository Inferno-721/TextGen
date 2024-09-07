import React, { useState } from "react";
import axios from "axios";

const UploadSection = ({ onGenerate }) => {
  const [context, setContext] = useState("");
  const [images, setImages] = useState([]);
  const [dragging, setDragging] = useState(false);

  // Handle file selection or drag-and-drop
  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  // Handle files dropped into the DnD area
  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const files = Array.from(e.dataTransfer.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  // Handle drag events
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    images.forEach((image) => formData.append("images", image));
    formData.append("context", context);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/generate-instructions",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      onGenerate(response.data.instructions);
    } catch (error) {
      console.error("Error generating instructions:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* TextArea for context input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Enter Optional Context:
        </label>
        <textarea
          placeholder="Enter optional context here..."
          value={context}
          onChange={(e) => setContext(e.target.value)}
          className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
          rows="4"
        />
      </div>

      {/* Drag-and-drop area or file input */}
      <div
        className={`mt-4 p-6 border-2 border-dashed rounded-md dark:border-gray-600 border-gray-300 transition-all ${
          dragging
            ? "bg-gray-200 dark:bg-gray-700"
            : "bg-white dark:bg-gray-800"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="flex flex-col items-center space-y-2">
          {images.length > 0 ? (
            <div className="space-y-2">
              {Array.from(images).map((file, index) => (
                <p key={index} className="text-gray-700 dark:text-gray-300">
                  {file.name}
                </p>
              ))}
            </div>
          ) : (
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8h-8v12H4v12h12v12h12V32h12V20H28V8z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600 dark:text-gray-400">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 focus-within:outline-none"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="sr-only"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PNG, JPG up to 5MB
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
        >
          Describe Testing Instructions
        </button>
      </div>
    </form>
  );
};

export default UploadSection;
