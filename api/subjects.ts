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

export async function deleteSelectedSubjects(ids:number[]) {
    const res = await axiosInstance.delete(`/subjects/delete/batch`, {
        data: { ids: ids }
    })
    if(res.status===200){
        revalidatePath("/")
        return { success: true }
    }
    else return { success: false }
}

export async function importSubjects(data:any) {
    const formData = new FormData()
    formData.append("file", data.file[0])
    formData.append("facultyId", data.id)
    try{
        const res = await axiosInstance.post(`/subjects/import`, formData, {
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