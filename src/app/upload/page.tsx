"use client";

import { useState } from 'react';
import Link from 'next/link';

interface UploadResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    fileName: string;
    courseNumber: string;
    title: string;
    fileUrl: string;
    thumbnailUrl: string;
  };
  error?: string;
}

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [courseNumber, setCourseNumber] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<UploadResponse | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        alert('Please select a PDF file');
        return;
      }
      if (selectedFile.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file || !courseNumber || !title) {
      alert('Please fill in all required fields');
      return;
    }

    setIsUploading(true);
    setUploadResult(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('courseNumber', courseNumber);
      formData.append('title', title);
      formData.append('description', description);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result: UploadResponse = await response.json();
      setUploadResult(result);

      if (result.success) {
        // Reset form
        setFile(null);
        setCourseNumber('');
        setTitle('');
        setDescription('');
        (document.getElementById('file-input') as HTMLInputElement).value = '';
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadResult({
        success: false,
        message: 'Upload failed',
        error: 'Network error occurred',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-950 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <Link
            href="/"
            className="text-yellow-400 hover:text-yellow-300 underline"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="bg-indigo-900 border-2 border-yellow-400 rounded-lg p-8">
          <h1 className="font-pixel text-2xl text-yellow-400 mb-6">
            Upload Cheat Sheet
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="courseNumber" className="block text-white mb-2">
                Course Number *
              </label>
              <input
                type="text"
                id="courseNumber"
                value={courseNumber}
                onChange={(e) => setCourseNumber(e.target.value)}
                placeholder="e.g., EECS 281"
                className="w-full px-4 py-2 bg-indigo-800 border border-yellow-400 rounded text-white placeholder-indigo-300 focus:outline-none focus:border-yellow-300"
                required
              />
            </div>

            <div>
              <label htmlFor="title" className="block text-white mb-2">
                Title *
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Data Structures Cheat Sheet"
                className="w-full px-4 py-2 bg-indigo-800 border border-yellow-400 rounded text-white placeholder-indigo-300 focus:outline-none focus:border-yellow-300"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-white mb-2">
                Description (Optional)
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of the cheat sheet content..."
                rows={3}
                className="w-full px-4 py-2 bg-indigo-800 border border-yellow-400 rounded text-white placeholder-indigo-300 focus:outline-none focus:border-yellow-300"
              />
            </div>

            <div>
              <label htmlFor="file-input" className="block text-white mb-2">
                PDF File *
              </label>
              <input
                type="file"
                id="file-input"
                accept=".pdf"
                onChange={handleFileChange}
                className="w-full px-4 py-2 bg-indigo-800 border border-yellow-400 rounded text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-yellow-400 file:text-indigo-900 hover:file:bg-yellow-300"
                required
              />
              <p className="text-indigo-300 text-sm mt-1">
                Maximum file size: 10MB. Only PDF files are allowed.
              </p>
            </div>

            <button
              type="submit"
              disabled={isUploading}
              className="w-full py-3 px-6 bg-yellow-400 text-indigo-900 font-bold rounded hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? 'Uploading...' : 'Upload Cheat Sheet'}
            </button>
          </form>

          {uploadResult && (
            <div className={`mt-6 p-4 rounded ${
              uploadResult.success 
                ? 'bg-green-900 border border-green-400 text-green-100' 
                : 'bg-red-900 border border-red-400 text-red-100'
            }`}>
              <h3 className="font-bold mb-2">
                {uploadResult.success ? 'Success!' : 'Error'}
              </h3>
              <p>{uploadResult.message}</p>
              {uploadResult.error && (
                <p className="text-sm mt-1">Details: {uploadResult.error}</p>
              )}
              {uploadResult.success && uploadResult.data && (
                <div className="mt-4 space-y-2">
                  <p><strong>File:</strong> {uploadResult.data.fileName}</p>
                  <p><strong>Course:</strong> {uploadResult.data.courseNumber}</p>
                  <p><strong>Title:</strong> {uploadResult.data.title}</p>
                  <div className="flex gap-4 mt-4">
                    <a
                      href={uploadResult.data.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yellow-400 hover:text-yellow-300 underline"
                    >
                      View PDF
                    </a>
                    <a
                      href={uploadResult.data.thumbnailUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yellow-400 hover:text-yellow-300 underline"
                    >
                      View Thumbnail
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}