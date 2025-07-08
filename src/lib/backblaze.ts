import B2 from 'backblaze-b2';

export class BackblazeService {
  private b2: B2;
  private bucketId: string;
  private bucketName: string;
  private authorized: boolean = false;

  constructor() {
    this.b2 = new B2({
      applicationKeyId: process.env.BACKBLAZE_APPLICATION_KEY_ID!,
      applicationKey: process.env.BACKBLAZE_APPLICATION_KEY!,
    });
    this.bucketId = process.env.BACKBLAZE_BUCKET_ID!;
    this.bucketName = process.env.BACKBLAZE_BUCKET_NAME!;
  }

  async authorize(): Promise<void> {
    if (!this.authorized) {
      await this.b2.authorize();
      this.authorized = true;
    }
  }

  async uploadFile(fileName: string, fileBuffer: Buffer, contentType: string = 'application/pdf'): Promise<string> {
    await this.authorize();
    
    const uploadUrl = await this.b2.getUploadUrl({
      bucketId: this.bucketId,
    });

    const response = await this.b2.uploadFile({
      uploadUrl: uploadUrl.data.uploadUrl,
      uploadAuthToken: uploadUrl.data.authorizationToken,
      fileName,
      data: fileBuffer,
      contentType,
    });

    return response.data.fileId;
  }

  async getFileUrl(fileName: string): Promise<string> {
    await this.authorize();
    
    const downloadUrl = await this.b2.getDownloadAuthorization({
      bucketId: this.bucketId,
      fileNamePrefix: fileName,
      validDurationInSeconds: 3600, // 1 hour
    });

    return `${this.b2.downloadUrl}/file/${this.bucketName}/${fileName}?Authorization=${downloadUrl.data.authorizationToken}`;
  }

  async deleteFile(fileId: string, fileName: string): Promise<void> {
    await this.authorize();
    
    await this.b2.deleteFileVersion({
      fileId,
      fileName,
    });
  }
}

export const backblazeService = new BackblazeService();