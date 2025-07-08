# EECS Sheets 📚

A platform for UMich EECS students to share and discover course cheat sheets. Built with a retro aesthetic inspired by Castlevania.

## Tech Stack

- Next.js (Frontend + Backend)
- Supabase (Auth + Database)
- Backblaze B2 (PDF Storage & Thumbnails)
- Tailwind CSS
- Pixel Art/Retro UI Theme

## Features

- User authentication via Supabase
- PDF upload with thumbnail generation
- Course-specific cheat sheet pages
- Voting system
- Retro UI with modern functionality
- File size and type validation (PDF only, max 10MB)
- Automatic thumbnail generation from PDFs

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Install system dependencies (for PDF processing):

```bash
# Ubuntu/Debian
sudo apt-get install poppler-utils

# macOS
brew install poppler
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Fill in your Backblaze B2 credentials:
- `BACKBLAZE_APPLICATION_KEY_ID`
- `BACKBLAZE_APPLICATION_KEY`  
- `BACKBLAZE_BUCKET_ID`
- `BACKBLAZE_BUCKET_NAME`

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## API Endpoints

### Upload PDF
- **POST** `/api/upload`
- Accepts multipart/form-data with:
  - `file`: PDF file (max 10MB)
  - `courseNumber`: Course identifier (e.g., "EECS 281")
  - `title`: Sheet title
  - `description`: Optional description
- Returns file metadata with download URLs for PDF and thumbnail

### Get Upload Info
- **GET** `/api/upload`
- Returns configuration information (file size limits, allowed types)

## File Processing

The application automatically:
1. Validates file type (PDF only) and size (max 10MB)
2. Uploads the original PDF to Backblaze B2
3. Generates a thumbnail (300x400px JPEG) from the first page
4. Uploads the thumbnail to Backblaze B2
5. Returns download URLs for both files

## Contact

Questions? Email: ammarat@umich.edu
