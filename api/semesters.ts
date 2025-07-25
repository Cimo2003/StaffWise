"use server"

import { revalidatePath } from "next/cache"
import { axiosInstance } from "./axios"

export async function getFacultySemesters(facultyId: number) {
    try {
        const res = await axiosInstance.get(`/semesters/faculties/${facultyId}`)
        if(res.status===200) return res.data
        return []
    } catch (error) {
        return []
    }
}

export async function getCurrentSemester(facultyId:number) {
    try {
        const res = await axiosInstance.get(`/semesters/faculties/${facultyId}/current`)
        if(res.status===200) return res.data
    } catch (error) {
        return null
    }
}

export async function createSemester(data:any) {
    try {
        const res = await axiosInstance.post(`/semesters`, data)
        if(res.status===200){
            revalidatePath("/")
            return { success: true }
        }
        return { success: false }
    } catch (error) {
        return { success: false }
    }
}

export async function updateSemester(data:any) {
    const res = await axiosInstance.patch("/semesters", data)
    if(res.status===200){
        revalidatePath("/")
        return { success: true }
    }
    else return { success: false }
}

export async function deleteSemester(id:number) {
    const res = await axiosInstance.delete(`/semesters/${id}`)
    if(res.status===200){
        revalidatePath("/")
        return { success: true }
    }
    else return { success: false }
}