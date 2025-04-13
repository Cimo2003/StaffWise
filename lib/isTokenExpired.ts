"use server"
import jwt from "jsonwebtoken"

export async function isTokenExpired (token: string|undefined) {
    if (!token) return true;
    const payload = jwt.decode(token) as jwt.JwtPayload
    if(payload.exp){
        const expiration = payload.exp * 1000; // Convert to milliseconds
        return Date.now() > expiration;
    }
}