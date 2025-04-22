"use server"

import { revalidatePath } from "next/cache"
import { axiosInstance } from "./axios"

export async function getDepartmentSections(departmentId: number) {
    try {
        const res = await axiosInstance.get(`/sections/departments/${departmentId}`)
        if(res.status===200) return res.data
        return []
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function getFacultySections(facultyId: number) {
    try {
        const res = await axiosInstance.get(`/sections/faculties/${facultyId}`)
        if(res.status===200) return res.data
        return []
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function createSection(data:any) {
    try {
        const res = await axiosInstance.post(`/sections`, data)
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

export async function updateSection(data:any) {
    const res = await axiosInstance.patch("/sections", data)
    if(res.status===200){
        revalidatePath("/")
        return { success: true }
    }
    else return { success: false }
}

export async function deleteSection(id:number) {
    const res = await axiosInstance.delete(`/sections/${id}`)
    if(res.status===200){
        revalidatePath("/")
        return { success: true }
    }
    else return { success: false }
}