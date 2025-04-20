"use server"

import { revalidatePath } from "next/cache"
import { axiosInstance } from "./axios"

export async function getFacultyDepartments(facultyId: number) {
    try {
        const res = await axiosInstance.get(`/departments/faculties/${facultyId}`)
        if(res.status===200) return res.data
        return []
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function createDepartment(data:any) {
    try {
        const res = await axiosInstance.post(`/departments`, data)
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

export async function updateDepartment(data:any) {
    const res = await axiosInstance.patch("/departments", data)
    if(res.status===200){
        revalidatePath("/")
        return { success: true }
    }
    else return { success: false }
}

export async function deleteDepartment(id:number) {
    const res = await axiosInstance.delete(`/departments/${id}`)
    if(res.status===200){
        revalidatePath("/")
        return { success: true }
    }
    else return { success: false }
}