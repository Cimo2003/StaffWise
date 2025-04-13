"use server"
import { axiosInstance } from "./axios"

export async function register(formData:FormData) {
    const data = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        phone: formData.get("phone"),
        password: formData.get("password"),
        email: formData.get("email"),
    }
    console.log(data)
    try{
        const res = await fetch("http://localhost:8085/users/register", {
            method: "POST",
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify(data)
        })
        console.log(res.status)
        if(res.ok) return { success: true }
        return { success: false }
    }
    catch (e) {
        console.log(e)
        return { success: false }
    }
}