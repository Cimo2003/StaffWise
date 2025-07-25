import { handleOAuthCallback } from '@/api/auth'

export async function GET(request: Request) {
  return handleOAuthCallback(request)
}