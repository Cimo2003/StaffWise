"use server"

import { revalidatePath } from "next/cache"
import { axiosInstance } from "./axios"

export async function getSectionGroups(sectionId: number) {
    try {
        const res = await axiosInstance.get(`groups/sections/${sectionId}`)
        if(res.status===200) return res.data
        return []
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function getFacultyGroups(facultyId: number) {
    try {
        const res = await axiosInstance.get(`groups/faculties/${facultyId}`)
        if(res.status===200) return res.data
        return []
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function createGroup(data:any) {
    console.log(data)
    try {
        const res = await axiosInstance.post(`/groups`, data)
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

export async function updateGroup(data:any) {
    const res = await axiosInstance.patch("/groups", data)
    if(res.status===200){
        revalidatePath("/")
        return { success: true }
    }
    else return { success: false }
}

export async function deleteGroup(id:number) {
    const res = await axiosInstance.delete(`/groups/${id}`)
    if(res.status===200){
        revalidatePath("/")
        return { success: true }
    }
    else return { success: false }
}