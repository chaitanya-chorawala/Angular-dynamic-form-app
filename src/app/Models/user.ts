export interface Login {
    email: string,
    password: string
}

export interface UserDetail {
    uid?: string,
    email?: string | null,
    accessToken?: string,
    refreshToken?: string
}