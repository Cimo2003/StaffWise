export type MyUser = {
    user_id: number,
    full_name: string,
    sub: string,
    role: [{  authority: string  }],
    iss: string,
    iat: number,
    exp: number
}

export type Faculty = {
    id: number,
    name: string,
    openingTime: string,
    closingTime: string
}