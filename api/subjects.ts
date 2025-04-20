"use server"

import { revalidatePath } from "next/cache"
import { axiosInstance } from "./axios"

export async function getFacultySubjects(facultyId: number) {
    try {
        const res = await axiosInstance.get(`/subjects/faculties/${facultyId}`)
        if(res.status===200) return res.data
        return []
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function createSubject(data:any) {
    try {
        const res = await axiosInstance.post(`/subjects`, data)
        if(res.status===200){
            revalidatePath("/")
            return { success: true }
        }
        return { success: false }
    } catch (error) {
        console.log(error)
        return { success: false }
    }
}

export async function updateSubject(data:any) {
    const res = await axiosInstance.patch("/subjects", data)
    if(res.status===200){
        revalidatePath("/")
        return { success: true }
    }
    else return { success: false }
}

export async function deleteSubject(id:number) {
    const res = await axiosInstance.delete(`/subjects/${id}`)
    if(res.status===200){
        revalidatePath("/")
        return { success: true }
    }
    else return { success: false }
}