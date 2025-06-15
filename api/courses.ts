"use server"

import { revalidatePath } from "next/cache"
import { axiosInstance } from "./axios"
import { Course } from "@/lib/types"

export async function getSemesterCourses(semesterId: number) {
    try {
        const res = await axiosInstance.get(`/courses/semesters/${semesterId}`)
        if(res.status===200) return res.data
        return []
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function getTeacherSchedule(teacerId: number, semesterId: number) {
    try {
        const res = await axiosInstance.get(`/courses/semesters/${semesterId}/users/${teacerId}`)
        if(res.status===200) return res.data
        return []
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function countTeacherCoursesForToday(teacerId: number) {
    try {
        const res = await axiosInstance.get(`/courses/users/${teacerId}/count`)
        if(res.status===200) return res.data
        return 0
    } catch (error) {
        console.log(error)
        return 0
    }
}

export async function getCurrentSemesterCourses(facultyId: number) {
    try {
        const res = await axiosInstance.get(`/courses/faculties/${facultyId}/semesters/current`)
        if(res.status===200) return res.data
        return []
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function createCourse(data: any) {
    try {
        const res = await axiosInstance.post(`/courses`,data)
        if(res.status===200) {
            revalidatePath('/')
            return { success: true }
        }
        return { success: false }
    } catch (error) {
        console.log(error)
        return { success: false }
    }
}

export async function updateCourse(data: any) {
    try {
        const res = await axiosInstance.patch(`/courses`,data)
        if(res.status===200) {
            revalidatePath('/')
            return { success: true }
        }
        return { success: false }
    } catch (error) {
        console.log(error)
        return { success: false }
    }
}

export async function unassignAll(semesterId:number) {
    try {
        const res = await axiosInstance.patch(`/courses/unassign?semester_id=${semesterId}`)
        if(res.status===200) {
            revalidatePath('/')
            return { success: true, data: res.data }
        }
        return { success: false }
    } catch (error) {
        console.log(error)
        return { success: false }
    }
}

export async function assign(data: Course) {
    try {
        const res = await axiosInstance.patch(`/courses/assign`, data);
        return { success: true, data: res.data };
    } catch (error: any) {
        if (error.response && error.response.status === 409) {
            return { success: false, data: error.response.data };
        }
        throw error;
    }
}

export async function deleteCourse(id: number) {
    try {
        const res = await axiosInstance.delete(`/courses/${id}`)
        if(res.status===200) {
            revalidatePath("/")
            return { success: true }
        }
        return { success: false }
    } catch (error) {
        console.log(error)
        return { success: false }
    }
}

export async function deleteSelectedCourses(ids:number[]) {
    const res = await axiosInstance.delete(`/courses/delete/batch`, {
        data: { ids: ids }
    })
    if(res.status===200){
        revalidatePath("/")
        return { success: true }
    }
    else return { success: false }
}

export async function importCourses(data:any) {
    const formData = new FormData()
    formData.append("file", data.file[0])
    formData.append("facultyId", data.id)
    try{
        const res = await axiosInstance.post(`/courses/import`, formData, {
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

export async function generate(semesterId:number) {
    try{
        const res = await axiosInstance.post(`/timetable/generate?semesterId=${semesterId}`)
        if(res.status===200){
            revalidatePath("/")
            return { success: true, data: res.data.courses }
        }
        return { success: false , error: res.data.error}
    }catch(e){
        return { success: false , error: e}
    }
}