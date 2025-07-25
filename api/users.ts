"use server"
import { revalidatePath } from "next/cache"
import { axiosInstance } from "./axios"

export async function register(data:any) {
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, {
            method: "POST",
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify(data)
        })
        if(res.ok) {
            revalidatePath("/")
            return { success: true }
        }
        return { success: false }
    }
    catch (e) {
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

export async function deleteSelectedTeachers(ids:number[]) {
    const res = await axiosInstance.delete(`/users/delete/batch`, {
        data: { ids: ids }
    })
    if(res.status===200){
        revalidatePath("/")
        return { success: true }
    }
    else return { success: false }
}

export async function importTeachers(data:any) {
    const formData = new FormData()
    formData.append("file", data.file[0])
    formData.append("facultyId", data.id)
    try{
        const res = await axiosInstance.post(`/users/teachers/import`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        if(res.status===200){
            revalidatePath("/")
            return { success: true }
        }
        return { success: false , error: res.data.error}
    }catch(e){
        return { success: false , error: e}
    }
}