"use server"
import jwt from "jsonwebtoken"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { axiosInstance } from "./axios"
import axios from "axios"


export async function decrypt(input: string): Promise<any> {
  const payload  = jwt.decode(input)
  return payload;
}

export async function login(formData: FormData):Promise<any> {
  const data = {
    username: formData.get("username"),
    password: formData.get("password")
  }
  const res = await fetch('http://localhost:8085/auth/login', {
    method: "POST",
    headers: { 'Content-Type' : 'application/json' },
    body: JSON.stringify(data)
  })
  const user = await res.json()

  // Save the token in a cookie
  if (res.ok) {
    const cookieStore = await cookies();

    // Store access-token and refresh-token in cookies
    cookieStore.set('access-token', user['access-token'], {
      path: '/',
      httpOnly: true
    });
    cookieStore.set('refresh-token', user['refresh-token'], {
      path: '/',
      httpOnly: true
    })

    return { success: true }
  } else {
    return { success: false, error: user['error message']}
  }
}

export async function logout() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access-token')?.value
  const refreshToken = cookieStore.get('refresh-token')?.value
  await fetch(`http://localhost:8085/auth/logout?accessToken=${accessToken}&refreshToken=${refreshToken}`)
  cookieStore.delete("access-token")
  cookieStore.delete("refresh-token")
}

export async function getToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access-token')?.value;
  if (!token) return null;
  return await decrypt(token);
}

export async function updatePassword(formData:FormData) {
  const prevPassword = formData.get('prevPassword')
  const newPassword = formData.get('newPassword')
  const token = (await cookies()).get('access-token')?.value
  
  const res = await axiosInstance.post(`/password/update-password?prevPassword=${prevPassword}&newPassword=${newPassword}`)
  if(res.status===200){
    revalidatePath('/profile')
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