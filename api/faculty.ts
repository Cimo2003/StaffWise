"use server"

import { revalidatePath } from "next/cache"
import { axiosInstance } from "./axios"
import { refreshToken } from "./auth"

export async function getFaculty(facultyId: number) {
    try {
        const res = await axiosInstance.get(`/faculties/${facultyId}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export async function getAdminFaculty(userId: number) {
    try {
        const res = await axiosInstance.get(`/faculties/users/${userId}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export async function countFacultyTeachers(facultyId: number) {
    try {
        const res = await axiosInstance.get(`/faculties/${facultyId}/users/count`)
        return res.data
    } catch (error) {
        console.log(error)
        return 0
    }
}

export async function countFacultyRooms(facultyId: number) {
    try {
        const res = await axiosInstance.get(`/faculties/${facultyId}/rooms/count`)
        return res.data
    } catch (error) {
        console.log(error)
        return 0
    }
}

export async function countFacultyDepartments(facultyId: number) {
    try {
        const res = await axiosInstance.get(`/faculties/${facultyId}/departments/count`)
        return res.data
    } catch (error) {
        console.log(error)
        return 0
    }
}

export async function countFacultySubjects(facultyId: number) {
    try {
        const res = await axiosInstance.get(`/faculties/${facultyId}/subjects/count`)
        return res.data
    } catch (error) {
        console.log(error)
        return 0
    }
}

export async function countFacultySections(facultyId: number) {
    try {
        const res = await axiosInstance.get(`/faculties/${facultyId}/sections/count`)
        return res.data
    } catch (error) {
        console.log(error)
        return 0
    }
}

export async function countFacultyGroups(facultyId: number) {
    try {
        const res = await axiosInstance.get(`/faculties/${facultyId}/groups/count`)
        return res.data
    } catch (error) {
        console.log(error)
        return 0
    }
}

export async function countActiveFacultyCourses(facultyId: number) {
    try {
        const res = await axiosInstance.get(`semesters/faculties/${facultyId}/courses/count`)
        return res.data
    } catch (error) {
        console.log(error)
        return 0
    }
}

export async function createFaculty(formData:FormData) {
    const faculty = {
        name: formData.get("name"),
        openingTime: formData.get("openingTime"),
        closingTime: formData.get("closingTime"),
        user: { id: formData.get("userId") }
    }
    try {
        const res = await axiosInstance.post(`/faculties`, faculty)
        if(res.status===200){
            await refreshToken()
            revalidatePath("/")
        }
    } catch (error) {
        console.log(error)
    }
}

export async function updateFaculty(data:any) {
    try {
        const res = await axiosInstance.patch(`/faculties`, data)
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