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
    console.log(data)
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