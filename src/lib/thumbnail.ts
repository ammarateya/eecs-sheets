import sharp from 'sharp';
import pdf2pic from 'pdf2pic';
import { promisify } from 'util';
import { writeFile, unlink } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

const writeFileAsync = promisify(writeFile);
const unlinkAsync = promisify(unlink);

export class ThumbnailService {
  private static readonly THUMBNAIL_WIDTH = 300;
  private static readonly THUMBNAIL_HEIGHT = 400;
  private static readonly THUMBNAIL_QUALITY = 80;

  async generateThumbnail(pdfBuffer: Buffer): Promise<Buffer> {
    const tempPdfPath = join(tmpdir(), `temp-${Date.now()}.pdf`);

    try {
      // Write PDF buffer to temporary file
      await writeFileAsync(tempPdfPath, pdfBuffer);

      // Convert PDF first page to image
      const convert = pdf2pic.fromPath(tempPdfPath, {
        density: 150,
        saveFilename: 'thumbnail',
        savePath: tmpdir(),
        format: 'png',
        width: 600,
        height: 800
      });

      const result = await convert(1, { responseType: 'buffer' });
      
      if (!result.buffer) {
        throw new Error('Failed to convert PDF to image');
      }

      // Resize and optimize the image using Sharp
      const thumbnailBuffer = await sharp(result.buffer)
        .resize(ThumbnailService.THUMBNAIL_WIDTH, ThumbnailService.THUMBNAIL_HEIGHT, {
          fit: 'inside',
          withoutEnlargement: true,
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
        .jpeg({
          quality: ThumbnailService.THUMBNAIL_QUALITY,
          progressive: true
        })
        .toBuffer();

      return thumbnailBuffer;
    } catch (error) {
      console.error('Error generating thumbnail:', error);
      throw new Error('Failed to generate thumbnail');
    } finally {
      // Clean up temporary files
      try {
        await unlinkAsync(tempPdfPath);
      } catch (e) {
        console.warn('Could not delete temporary PDF file:', e);
      }
    }
  }

  static getThumbnailFileName(originalFileName: string): string {
    const nameWithoutExt = originalFileName.replace(/\.pdf$/i, '');
    return `${nameWithoutExt}_thumbnail.jpg`;
  }
}

export const thumbnailService = new ThumbnailService();