"use server"
import { revalidatePath } from "next/cache"
import { axiosInstance } from "./axios"

export async function register(data:any) {
    console.log(data)
    try{
        const res = await fetch("http://localhost:8085/users/register", {
            method: "POST",
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify(data)
        })
        console.log(res.status)
        if(res.ok) {
            revalidatePath("/")
            return { success: true }
        }
        return { success: false }
    }
    catch (e) {
        console.log(e)
        return { success: false }
    }
}

export async function updateUser(data:any) {
    const res = await axiosInstance.patch("/users", data)
    if(res.status===200){
        revalidatePath("/")
        return { success: true }
    }
    else return { success: false }
}

export async function deleteUser(userId:number) {
    const res = await axiosInstance.delete(`/users/${userId}`)
    if(res.status===200){
        revalidatePath("/")
        return { success: true }
    }
    else return { success: false }
}

export async function getFacultyTeachers(facultyId:number) {
    const res = await axiosInstance.get(`/faculties/${facultyId}/users`)
    if(res.status===200){
        return res.data
    }
    else return []
}