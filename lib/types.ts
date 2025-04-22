export interface MyUser {
    user_id: number,
    full_name: string,
    faculty_id?: number,
    sub: string,
    role: [{  authority: string  }],
    iss: string,
    iat: number,
    exp: number
}

export interface User {
    id: number,
    firstName: string,
    lastName: string,
    fullName: string,
    email: string,
    phone: string,
    isEnabled: boolean
}

export interface Faculty {
    id: number,
    name: string,
    openingTime: string,
    closingTime: string
}

export interface Department {
    id: number,
    name: string
}

export interface Room {
    id: number,
    code: string,
    type: string
}

export interface Subject {
    id: number,
    code: string,
    title: string
}

export interface Section {
    id: number,
    name: string,
    level: string,
    department: Department
}

export interface Group {
    id: number,
    code: string,
    section: Section
}