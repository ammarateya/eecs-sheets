import { RateLimiterMemory } from 'rate-limiter-flexible';

// Rate limiter for IP-based requests
const rateLimiterIP = new RateLimiterMemory({
  points: 5, // 5 requests
  duration: 60, // per 60 seconds
  blockDuration: 60, // Block for 60 seconds
});

// Rate limiter for global application limits
const rateLimiterGlobal = new RateLimiterMemory({
  points: 100, // 100 requests total
  duration: 60, // per 60 seconds
  blockDuration: 60, // Block for 60 seconds
});

// Rate limiter for upload-specific actions (more restrictive)
const rateLimiterUpload = new RateLimiterMemory({
  points: 3, // 3 uploads
  duration: 300, // per 5 minutes
  blockDuration: 300, // Block for 5 minutes
});

export interface RateLimitResult {
  success: boolean;
  error?: string;
  remainingPoints?: number;
  resetTime?: Date;
}

export class RateLimitService {
  static async checkIPLimit(ip: string): Promise<RateLimitResult> {
    try {
      const result = await rateLimiterIP.consume(ip);
      return {
        success: true,
        remainingPoints: result.remainingPoints,
        resetTime: new Date(Date.now() + result.msBeforeNext),
      };
    } catch (rejRes: unknown) {
      const rejection = rejRes as { msBeforeNext: number };
      return {
        success: false,
        error: `Too many requests from this IP. Try again in ${Math.round(rejection.msBeforeNext / 1000)} seconds.`,
        resetTime: new Date(Date.now() + rejection.msBeforeNext),
      };
    }
  }

  static async checkGlobalLimit(): Promise<RateLimitResult> {
    try {
      const result = await rateLimiterGlobal.consume('global');
      return {
        success: true,
        remainingPoints: result.remainingPoints,
        resetTime: new Date(Date.now() + result.msBeforeNext),
      };
    } catch (rejRes: unknown) {
      const rejection = rejRes as { msBeforeNext: number };
      return {
        success: false,
        error: `Service is experiencing high load. Try again in ${Math.round(rejection.msBeforeNext / 1000)} seconds.`,
        resetTime: new Date(Date.now() + rejection.msBeforeNext),
      };
    }
  }

  static async checkUploadLimit(ip: string): Promise<RateLimitResult> {
    try {
      const result = await rateLimiterUpload.consume(ip);
      return {
        success: true,
        remainingPoints: result.remainingPoints,
        resetTime: new Date(Date.now() + result.msBeforeNext),
      };
    } catch (rejRes: unknown) {
      const rejection = rejRes as { msBeforeNext: number };
      return {
        success: false,
        error: `Upload limit exceeded. You can upload ${rateLimiterUpload.points} files every ${rateLimiterUpload.duration / 60} minutes. Try again in ${Math.round(rejection.msBeforeNext / 1000)} seconds.`,
        resetTime: new Date(Date.now() + rejection.msBeforeNext),
      };
    }
  }

  static async checkAllLimits(ip: string, isUpload: boolean = false): Promise<RateLimitResult> {
    // Check global limit first
    const globalResult = await this.checkGlobalLimit();
    if (!globalResult.success) {
      return globalResult;
    }

    // Check IP limit
    const ipResult = await this.checkIPLimit(ip);
    if (!ipResult.success) {
      return ipResult;
    }

    // Check upload limit if this is an upload request
    if (isUpload) {
      const uploadResult = await this.checkUploadLimit(ip);
      if (!uploadResult.success) {
        return uploadResult;
      }
    }

    return {
      success: true,
      remainingPoints: Math.min(
        globalResult.remainingPoints || 0,
        ipResult.remainingPoints || 0
      ),
    };
  }
}

// Utility function to get client IP
export function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  // Fallback to a default IP (in development or when IP cannot be determined)
  return '127.0.0.1';
}