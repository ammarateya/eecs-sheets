export interface FileValidationResult {
  isValid: boolean;
  error?: string;
  warnings?: string[];
}

export class FileValidationService {
  // File size limits (in bytes)
  static readonly MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  static readonly MIN_FILE_SIZE = 1024; // 1KB

  // Allowed file types
  static readonly ALLOWED_MIME_TYPES = [
    'application/pdf',
  ];

  // Allowed file extensions
  static readonly ALLOWED_EXTENSIONS = [
    '.pdf',
  ];

  // Suspicious file name patterns
  static readonly SUSPICIOUS_PATTERNS = [
    /\.exe$/i,
    /\.bat$/i,
    /\.cmd$/i,
    /\.scr$/i,
    /\.vbs$/i,
    /\.js$/i,
    /\.jar$/i,
    /\.zip$/i,
    /\.rar$/i,
    /script/i,
    /malware/i,
    /virus/i,
  ];

  static async validateFile(file: File): Promise<FileValidationResult> {
    const warnings: string[] = [];

    // Check file size
    if (file.size > this.MAX_FILE_SIZE) {
      return {
        isValid: false,
        error: `File size (${this.formatFileSize(file.size)}) exceeds maximum limit of ${this.formatFileSize(this.MAX_FILE_SIZE)}`,
      };
    }

    if (file.size < this.MIN_FILE_SIZE) {
      return {
        isValid: false,
        error: `File size (${this.formatFileSize(file.size)}) is too small. Minimum size is ${this.formatFileSize(this.MIN_FILE_SIZE)}`,
      };
    }

    // Check MIME type
    if (!this.ALLOWED_MIME_TYPES.includes(file.type)) {
      return {
        isValid: false,
        error: `File type "${file.type}" is not allowed. Only PDF files are permitted.`,
      };
    }

    // Check file extension
    const extension = this.getFileExtension(file.name);
    if (!this.ALLOWED_EXTENSIONS.includes(extension.toLowerCase())) {
      return {
        isValid: false,
        error: `File extension "${extension}" is not allowed. Only PDF files are permitted.`,
      };
    }

    // Check for suspicious file names
    for (const pattern of this.SUSPICIOUS_PATTERNS) {
      if (pattern.test(file.name)) {
        return {
          isValid: false,
          error: `File name contains suspicious patterns and cannot be uploaded.`,
        };
      }
    }

    // Check file name length
    if (file.name.length > 255) {
      return {
        isValid: false,
        error: `File name is too long. Maximum length is 255 characters.`,
      };
    }

    // Check for non-ASCII characters (warning only)
    if (!/^[\x00-\x7F]*$/.test(file.name)) {
      warnings.push('File name contains non-ASCII characters which may cause issues.');
    }

    // Additional PDF-specific validation
    const pdfValidation = await this.validatePDFContent(file);
    if (!pdfValidation.isValid) {
      return pdfValidation;
    }

    return {
      isValid: true,
      warnings: warnings.length > 0 ? warnings : undefined,
    };
  }

  private static async validatePDFContent(file: File): Promise<FileValidationResult> {
    try {
      // Read the first few bytes to check PDF header
      const buffer = await file.slice(0, 8).arrayBuffer();
      const bytes = new Uint8Array(buffer);
      
      // Check PDF magic number (%PDF)
      const pdfHeader = [0x25, 0x50, 0x44, 0x46]; // %PDF
      const headerMatch = pdfHeader.every((byte, index) => bytes[index] === byte);
      
      if (!headerMatch) {
        return {
          isValid: false,
          error: 'File does not appear to be a valid PDF document.',
        };
      }

      return { isValid: true };
    } catch {
      return {
        isValid: false,
        error: 'Unable to validate PDF content. Please try again.',
      };
    }
  }

  private static getFileExtension(fileName: string): string {
    const lastDotIndex = fileName.lastIndexOf('.');
    return lastDotIndex !== -1 ? fileName.substring(lastDotIndex) : '';
  }

  private static formatFileSize(bytes: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  }

  // Sanitize file name for safe storage
  static sanitizeFileName(fileName: string): string {
    // Remove or replace unsafe characters
    return fileName
      .replace(/[<>:"/\\|?*\x00-\x1f]/g, '_') // Replace unsafe chars with underscore
      .replace(/\s+/g, '_') // Replace spaces with underscore
      .replace(/_{2,}/g, '_') // Replace multiple underscores with single
      .replace(/^_+|_+$/g, '') // Remove leading/trailing underscores
      .toLowerCase();
  }

  // Generate a safe, unique filename
  static generateSafeFileName(originalName: string, subject: string, courseNumber: string): string {
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 8);
    const sanitizedName = this.sanitizeFileName(originalName);
    const extension = this.getFileExtension(originalName);
    
    // Remove extension from sanitized name
    const nameWithoutExt = sanitizedName.replace(extension.toLowerCase(), '');
    
    return `${subject}_${courseNumber}_${timestamp}_${randomId}_${nameWithoutExt}${extension.toLowerCase()}`;
  }
}