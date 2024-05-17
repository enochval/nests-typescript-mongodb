import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpDTO } from './dto/signup.dto';
import { SignUpRes } from './interfaces/signup.interface';
import { LoginRsp } from './interfaces/user.interface';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Post('signup')
    async signUp(@Body() signUpDTO: SignUpDTO): Promise<SignUpRes> {
        console.log(signUpDTO)
        return await this.userService.create(signUpDTO)
    }

    @Post('login')
    async login(@Body() loginDTO: SignUpDTO): Promise<LoginRsp> {
        return await this.userService.login(loginDTO)
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    async profile(@Req() request): Promise<any> {
        return request.user
    }
}
