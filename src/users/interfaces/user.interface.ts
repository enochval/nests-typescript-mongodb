
export interface User {

    readonly id: string

    readonly email: string

    readonly password: string
}

export interface LoginRsp {

    readonly accessToken: string
}