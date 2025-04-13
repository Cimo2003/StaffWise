"use server"

import { revalidatePath } from "next/cache"
import { axiosInstance } from "./axios"

export async function getUserFaculty(userId: number) {
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
    }
}

export async function countFacultyRooms(facultyId: number) {
    try {
        const res = await axiosInstance.get(`/faculties/${facultyId}/rooms/count`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export async function countFacultyDepartments(facultyId: number) {
    try {
        const res = await axiosInstance.get(`/faculties/${facultyId}/departments/count`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export async function countActiveFacultyCourses(facultyId: number) {
    try {
        const res = await axiosInstance.get(`semesters/faculties/${facultyId}/courses/count`)
        return res.data
    } catch (error) {
        console.log(error)
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
            revalidatePath("/")
        }
    } catch (error) {
        console.log(error)
    }
}