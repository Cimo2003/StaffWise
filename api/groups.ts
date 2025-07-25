"use server"

import { revalidatePath } from "next/cache"
import { axiosInstance } from "./axios"

export async function getSectionGroups(sectionId: number) {
    try {
        const res = await axiosInstance.get(`groups/sections/${sectionId}`)
        if(res.status===200) return res.data
        return []
    } catch (error) {
        return []
    }
}

export async function getFacultyGroups(facultyId: number) {
    try {
        const res = await axiosInstance.get(`groups/faculties/${facultyId}`)
        if(res.status===200) return res.data
        return []
    } catch (error) {
        return []
    }
}

export async function createGroup(data:any) {
    try {
        const res = await axiosInstance.post(`/groups`, data)
        if(res.status===200){
            revalidatePath("/")
            return { success: true }
        }
        return { success: false }
    } catch (error) {
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

export async function deleteSelectedGroups(ids:number[]) {
    const res = await axiosInstance.delete(`/groups/delete/batch`, {
        data: { ids: ids }
    })
    if(res.status===200){
        revalidatePath("/")
        return { success: true }
    }
    else return { success: false }
}

export async function importGroups(data:any) {
    const formData = new FormData()
    formData.append("file", data.file[0])
    formData.append("facultyId", data.id)
    try{
        const res = await axiosInstance.post(`/groups/import`, formData, {
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