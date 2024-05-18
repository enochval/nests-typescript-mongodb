import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator"

export class SignUpDTO {

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty({
        description: "The email of the user",
        required: true,
        type: String
    })
    readonly email: string

    @IsNotEmpty()
    @IsStrongPassword()
    @ApiProperty({
        description: "The password of the user",
        required: true,
        type: String
    })
    readonly password: string
}