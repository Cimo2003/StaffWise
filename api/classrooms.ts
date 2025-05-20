"use server"

import { revalidatePath } from "next/cache"
import { axiosInstance } from "./axios"

export async function getFacultyRooms(facultyId: number) {
    try {
        const res = await axiosInstance.get(`/rooms/faculties/${facultyId}`)
        if(res.status===200) return res.data
        return []
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function createRoom(data:any) {
    try {
        const res = await axiosInstance.post(`/rooms`, data)
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

export async function updateRoom(data:any) {
    const res = await axiosInstance.patch("/rooms", data)
    if(res.status===200){
        revalidatePath("/")
        return { success: true }
    }
    else return { success: false }
}

export async function deleteRoom(id:number) {
    const res = await axiosInstance.delete(`/rooms/${id}`)
    if(res.status===200){
        revalidatePath("/")
        return { success: true }
    }
    else return { success: false }
}

export async function deleteSelectedRooms(ids:number[]) {
    const res = await axiosInstance.delete(`/rooms/delete/batch`, {
        data: { ids: ids }
    })
    if(res.status===200){
        revalidatePath("/")
        return { success: true }
    }
    else return { success: false }
}

export async function importRooms(data:any) {
    const formData = new FormData()
    formData.append("file", data.file[0])
    formData.append("facultyId", data.id)
    try{
        const res = await axiosInstance.post(`/rooms/import`, formData, {
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