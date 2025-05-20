import { axiosInstance } from "./axios"

export async function getTimeSlots() {
    try {
        const res = await axiosInstance.get(`/timeslots`)
        if(res.status===200) return res.data
        return []
    } catch (error) {
        console.log(error)
    }
}