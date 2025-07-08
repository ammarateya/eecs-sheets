import { NextRequest, NextResponse } from 'next/server';
import { backblazeService } from '@/lib/backblaze';
import { thumbnailService, ThumbnailService } from '@/lib/thumbnail';
import { RateLimitService, getClientIP } from '@/lib/rate-limit';
import { FileValidationService } from '@/lib/file-validation';

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = getClientIP(request);
    
    // Check rate limits
    const rateLimitResult = await RateLimitService.checkAllLimits(clientIP, true);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { 
          error: rateLimitResult.error,
          type: 'rate_limit',
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitResult.resetTime?.toISOString() || '',
          },
        }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const subject = formData.get('subject') as string;
    const courseNumber = formData.get('courseNumber') as string;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    // Validate file exists
    if (!file) {
      return NextResponse.json({ error: 'No file provided', type: 'validation' }, { status: 400 });
    }

    // Enhanced file validation
    const validationResult = await FileValidationService.validateFile(file);
    if (!validationResult.isValid) {
      return NextResponse.json({ 
        error: validationResult.error,
        type: 'validation',
      }, { status: 400 });
    }

    // Validate required fields
    if (!subject || !courseNumber || !title) {
      return NextResponse.json({ 
        error: 'Subject, course number, and title are required',
        type: 'validation',
      }, { status: 400 });
    }

    // Validate subject
    const allowedSubjects = ['EECS', 'MATH', 'PHYSICS', 'CHEM', 'ENGR', 'STATS', 'OTHER'];
    if (!allowedSubjects.includes(subject.toUpperCase())) {
      return NextResponse.json({ 
        error: 'Invalid subject selected',
        type: 'validation',
      }, { status: 400 });
    }

    // Validate course number
    if (!/^[A-Z0-9]{1,10}$/i.test(courseNumber)) {
      return NextResponse.json({ 
        error: 'Course number must be alphanumeric and 1-10 characters long',
        type: 'validation',
      }, { status: 400 });
    }

    // Validate title length
    if (title.length > 200) {
      return NextResponse.json({ 
        error: 'Title must be 200 characters or less',
        type: 'validation',
      }, { status: 400 });
    }

    // Validate description length
    if (description && description.length > 1000) {
      return NextResponse.json({ 
        error: 'Description must be 1000 characters or less',
        type: 'validation',
      }, { status: 400 });
    }

    // Convert file to buffer
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    // Generate safe filename
    const safeFileName = FileValidationService.generateSafeFileName(
      file.name, 
      subject, 
      courseNumber
    );
    const fileName = `${subject}/${courseNumber}/${safeFileName}`;
    const thumbnailFileName = ThumbnailService.getThumbnailFileName(fileName);

    // Upload main PDF file
    const fileId = await backblazeService.uploadFile(fileName, fileBuffer, 'application/pdf');

    // Generate and upload thumbnail
    const thumbnailBuffer = await thumbnailService.generateThumbnail(fileBuffer);
    const thumbnailFileId = await backblazeService.uploadFile(
      thumbnailFileName, 
      thumbnailBuffer, 
      'image/jpeg'
    );

    // Get download URLs
    const fileUrl = await backblazeService.getFileUrl(fileName);
    const thumbnailUrl = await backblazeService.getFileUrl(thumbnailFileName);

    // TODO: Save metadata to database (Supabase)
    const metadata = {
      id: fileId,
      fileName: file.name,
      safeFileName,
      subject,
      courseNumber,
      title,
      description,
      fileSize: file.size,
      uploadedAt: new Date().toISOString(),
      fileUrl,
      thumbnailUrl,
      thumbnailFileId,
      clientIP: clientIP, // For audit purposes
      warnings: validationResult.warnings,
    };

    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      data: metadata,
    }, {
      headers: {
        'X-RateLimit-Limit': '5',
        'X-RateLimit-Remaining': (rateLimitResult.remainingPoints || 0).toString(),
      },
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to upload file. Please try again.',
        type: 'server_error',
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = getClientIP(request);
    
    // Check rate limits (non-upload request)
    const rateLimitResult = await RateLimitService.checkAllLimits(clientIP, false);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { 
          error: rateLimitResult.error,
          type: 'rate_limit',
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitResult.resetTime?.toISOString() || '',
          },
        }
      );
    }

    return NextResponse.json({ 
      message: 'Upload endpoint is ready',
      limits: {
        maxFileSize: `${FileValidationService.MAX_FILE_SIZE / (1024 * 1024)}MB`,
        minFileSize: `${FileValidationService.MIN_FILE_SIZE / 1024}KB`,
        allowedTypes: FileValidationService.ALLOWED_MIME_TYPES,
        allowedExtensions: FileValidationService.ALLOWED_EXTENSIONS,
      },
      rateLimits: {
        perIP: '5 requests per minute',
        uploads: '3 uploads per 5 minutes',
        global: '100 requests per minute',
      },
    }, {
      headers: {
        'X-RateLimit-Limit': '5',
        'X-RateLimit-Remaining': (rateLimitResult.remainingPoints || 0).toString(),
      },
    });
  } catch (error) {
    console.error('API info error:', error);
    return NextResponse.json(
      { error: 'Failed to get API information' },
      { status: 500 }
    );
  }
}