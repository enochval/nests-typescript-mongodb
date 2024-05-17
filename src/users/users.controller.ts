import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpDTO } from './dto/signup.dto';
import { SignUpRes } from './interfaces/signup.interface';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Post()
    async signUp(@Body() signUpDTO: SignUpDTO): Promise<SignUpRes> {
        return await this.userService.create(signUpDTO)
    }
}
