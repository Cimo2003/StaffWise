"use server"

import { logout } from "@/api/auth"
import { redirect } from "next/navigation"

export async function logoutAction() {
  await logout()
  redirect("/login")
}