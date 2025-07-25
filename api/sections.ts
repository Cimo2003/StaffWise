"use server"

import { revalidatePath } from "next/cache"
import { axiosInstance } from "./axios"

export async function getDepartmentSections(departmentId: number) {
    try {
        const res = await axiosInstance.get(`/sections/departments/${departmentId}`)
        if(res.status===200) return res.data
        return []
    } catch (error) {
        return []
    }
}

export async function getFacultySections(facultyId: number) {
    try {
        const res = await axiosInstance.get(`/sections/faculties/${facultyId}`)
        if(res.status===200) return res.data
        return []
    } catch (error) {
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

export async function deleteSelectedSections(ids:number[]) {
    const res = await axiosInstance.delete(`/sections/delete/batch`, {
        data: { ids: ids }
    })
    if(res.status===200){
        revalidatePath("/")
        return { success: true }
    }
    else return { success: false }
}

export async function importSections(data:any) {
    const formData = new FormData()
    formData.append("file", data.file[0])
    formData.append("facultyId", data.id)
    try{
        const res = await axiosInstance.post(`/sections/import`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        if(res.status===200){
            revalidatePath("/")
            return { success: true }
        }
        return { success: false , error: res.data.error}
    }catch(e:any){
        return { success: false , error: e.response.data}
    }
}