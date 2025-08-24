"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface UploadResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    fileName: string;
    subject: string;
    courseNumber: string;
    title: string;
    fileUrl: string;
    thumbnailUrl: string;
    warnings?: string[];
  };
  error?: string;
  type?: string;
}

interface ApiLimits {
  maxFileSize: string;
  minFileSize: string;
  allowedTypes: string[];
  allowedExtensions: string[];
}

interface RateLimits {
  perIP: string;
  uploads: string;
  global: string;
}

interface ApiInfo {
  message: string;
  limits: ApiLimits;
  rateLimits: RateLimits;
}

const SUBJECTS = [
  { code: "EECS", name: "Electrical Engineering & Computer Science" },
  { code: "MATH", name: "Mathematics" },
  { code: "PHYSICS", name: "Physics" },
  { code: "CHEM", name: "Chemistry" },
  { code: "OTHER", name: "Other" },
];

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [subject, setSubject] = useState('');
  const [courseNumber, setCourseNumber] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<UploadResponse | null>(null);
  const [apiInfo, setApiInfo] = useState<ApiInfo | null>(null);

  // Load API information on component mount
  useEffect(() => {
    const fetchApiInfo = async () => {
      try {
        const response = await fetch('/api/upload');
        const info: ApiInfo = await response.json();
        setApiInfo(info);
      } catch (error) {
        console.error('Failed to fetch API info:', error);
      }
    };
    fetchApiInfo();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Enhanced validation with better error messages
      if (selectedFile.type !== 'application/pdf') {
        alert('Please select a PDF file. Other file types are not supported.');
        return;
      }
      
      const maxSize = 10 * 1024 * 1024; // 10MB
      const minSize = 1024; // 1KB
      
      if (selectedFile.size > maxSize) {
        alert(`File size (${formatFileSize(selectedFile.size)}) exceeds the maximum limit of ${formatFileSize(maxSize)}.`);
        return;
      }
      
      if (selectedFile.size < minSize) {
        alert(`File size (${formatFileSize(selectedFile.size)}) is too small. Minimum size is ${formatFileSize(minSize)}.`);
        return;
      }
      
      // Check file name length
      if (selectedFile.name.length > 255) {
        alert('File name is too long. Please rename the file to be 255 characters or less.');
        return;
      }
      
      setFile(selectedFile);
      setUploadResult(null); // Clear previous results
    }
  };

  const formatFileSize = (bytes: number): string => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file || !subject || !courseNumber || !title) {
      alert('Please fill in all required fields');
      return;
    }

    setIsUploading(true);
    setUploadResult(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('subject', subject);
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
        setSubject('');
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

          {apiInfo && (
            <div className="bg-indigo-800 border border-yellow-400 rounded p-4 mb-6">
              <h3 className="text-yellow-400 font-semibold mb-2">Upload Limits</h3>
              <div className="text-indigo-200 text-sm space-y-1">
                <p>• {apiInfo.rateLimits.uploads}</p>
                <p>• {apiInfo.rateLimits.perIP}</p>
                <p>• Global: {apiInfo.rateLimits.global}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="subject" className="block text-white mb-2">
                Subject *
              </label>
              <select
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-2 bg-indigo-800 border border-yellow-400 rounded text-white focus:outline-none focus:border-yellow-300"
                required
              >
                <option value="">Select a subject</option>
                {SUBJECTS.map((subj) => (
                  <option key={subj.code} value={subj.code}>
                    {subj.code} - {subj.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="courseNumber" className="block text-white mb-2">
                Course Number *
              </label>
              <input
                type="text"
                id="courseNumber"
                value={courseNumber}
                onChange={(e) => setCourseNumber(e.target.value)}
                placeholder="e.g., 281"
                className="w-full px-4 py-2 bg-indigo-800 border border-yellow-400 rounded text-white placeholder-indigo-300 focus:outline-none focus:border-yellow-300"
                required
              />
              <p className="text-indigo-300 text-sm mt-1">
                Just the course number (e.g., 281 for EECS 281)
              </p>
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
              <div className="text-indigo-300 text-sm mt-1 space-y-1">
                <p>• Maximum file size: {apiInfo?.limits.maxFileSize || '10MB'}</p>
                <p>• Minimum file size: {apiInfo?.limits.minFileSize || '1KB'}</p>
                <p>• Only PDF files are allowed</p>
                <p>• File name must be 255 characters or less</p>
              </div>
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
                <p className="text-sm mt-1">
                  {uploadResult.type === 'rate_limit' && '⏰ '}
                  {uploadResult.type === 'validation' && '⚠️ '}
                  {uploadResult.type === 'server_error' && '🔧 '}
                  {uploadResult.error}
                </p>
              )}
              {uploadResult.success && uploadResult.data && (
                <div className="mt-4 space-y-2">
                  <p><strong>File:</strong> {uploadResult.data.fileName}</p>
                  <p><strong>Subject:</strong> {uploadResult.data.subject}</p>
                  <p><strong>Course:</strong> {uploadResult.data.subject} {uploadResult.data.courseNumber}</p>
                  <p><strong>Title:</strong> {uploadResult.data.title}</p>
                  {uploadResult.data.warnings && uploadResult.data.warnings.length > 0 && (
                    <div className="mt-3 p-2 bg-yellow-900 border border-yellow-400 rounded">
                      <p className="text-yellow-200 font-semibold">⚠️ Warnings:</p>
                      <ul className="text-yellow-200 text-sm mt-1">
                        {uploadResult.data.warnings.map((warning, index) => (
                          <li key={index}>• {warning}</li>
                        ))}
                      </ul>
                    </div>
                  )}
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