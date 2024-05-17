import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator"

export class SignUpDTO {

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    readonly email: string

    @IsNotEmpty()
    @IsStrongPassword()
    readonly password: string
}