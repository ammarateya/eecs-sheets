import { NextRequest, NextResponse } from 'next/server';
import { backblazeService } from '@/lib/backblaze';
import { thumbnailService, ThumbnailService } from '@/lib/thumbnail';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const subject = formData.get('subject') as string;
    const courseNumber = formData.get('courseNumber') as string;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    // Validate file exists
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 });
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ 
        error: `File size exceeds limit. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB` 
      }, { status: 400 });
    }

    // Validate required fields
    if (!subject || !courseNumber || !title) {
      return NextResponse.json({ 
        error: 'Subject, course number, and title are required' 
      }, { status: 400 });
    }

    // Convert file to buffer
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    // Generate unique filename
    const timestamp = Date.now();
    const fileName = `${subject}/${courseNumber}/${timestamp}-${file.name}`;
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
      subject,
      courseNumber,
      title,
      description,
      fileSize: file.size,
      uploadedAt: new Date().toISOString(),
      fileUrl,
      thumbnailUrl,
      thumbnailFileId,
    };

    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      data: metadata,
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Upload endpoint is ready',
    maxFileSize: `${MAX_FILE_SIZE / (1024 * 1024)}MB`,
    allowedTypes: ['application/pdf'],
  });
}