"use server"
import jwt from "jsonwebtoken"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { axiosInstance } from "./axios"
import axios from "axios"
import { redirect } from "next/navigation"


export async function decrypt(input: string): Promise<any> {
  const payload  = jwt.decode(input)
  return payload;
}

export async function login(formData: FormData): Promise<any> {
  const data = {
    username: formData.get("username"),
    password: formData.get("password")
  }
  
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      const error = await res.json()
      return { success: false, error: error['error message'] || 'Login failed' }
    }

    const user = await res.json()
    setAuthCookies(user)
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Network error' }
  }
}

export async function oauthLogin(provider: string): Promise<void> {
  // Redirect to backend OAuth endpoint
  redirect(`${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/${provider}`)
}

async function setAuthCookies(tokens: { [key: string]: string }) {
  const cookieStore = await cookies()
  const { 'access-token': accessToken, 'refresh-token': refreshToken } = tokens

  if (accessToken) {
    cookieStore.set('access-token', accessToken, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    })
  }

  if (refreshToken) {
    cookieStore.set('refresh-token', refreshToken, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    })
  }
}

export async function logout() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access-token')?.value
  const refreshToken = cookieStore.get('refresh-token')?.value
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout?accessToken=${accessToken}&refreshToken=${refreshToken}`)
  cookieStore.delete("access-token")
  cookieStore.delete("refresh-token")
}

export async function getToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access-token')?.value;
  if (!token) return null;
  return await decrypt(token);
}

export async function updatePassword(data:any) {
  
  const res = await axiosInstance.post(`/password/update-password?prevPassword=${data.currentPassword}&newPassword=${data.newPassword}`)
  if(res.status===200){
    revalidatePath('/')
    return {success: true}
  }
}

export async function forgotPassword(formData:FormData) {
  const email = formData.get("email")
  const res = await axiosInstance.post(`/password/forgot-password?email=${email}`)
  if(res.status===200){
    return {success: true}
  }
}

export async function resetPassword(formData:FormData) {
  const email = formData.get("email")
  const code = formData.get("code")
  const newPassword = formData.get("newPassword") 
  const res = await axiosInstance.post(`/password/reset-password?email=${email}&code=${code}&newPassword=${newPassword}`)
  if(res.status===200){
    return {success: true}
  }
}

export async function refreshToken() {
  const refreshToken = (await cookies()).get('refresh-token')?.value
  try {
    const res = await axiosInstance.post(`/auth/refresh-token`, { refreshToken: refreshToken });
    if(res.status===200){
      const accessToken = res.data['access-token'];
      (await cookies()).set("access-token", accessToken, { httpOnly: true });
    }
  } catch {
      await logout()
      redirect("login")
  }
}

export async function handleOAuthCallback(request: Request) {
  const url = new URL(request.url)
  const token = url.searchParams.get('token')
  
  if (token) {
    try {
      const decoded = await decrypt(token)
      await setAuthCookies({
        'access-token': token,
        'refresh-token': '' // You might get refresh token differently
      })
      return redirect('/dashboard')
    } catch (error) {
      console.error('Token decoding failed:', error)
      return redirect('/login?error=invalid_token')
    }
  }
  return redirect('/login')
}