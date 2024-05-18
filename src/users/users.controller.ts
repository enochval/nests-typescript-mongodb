import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpDTO } from './dto/signup.dto';
import { SignUpRes } from './interfaces/signup.interface';
import { LoginRsp } from './interfaces/user.interface';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Post('signup')
    @ApiCreatedResponse({ description: "The user was successfully created" })
    @ApiForbiddenResponse({ description: 'Forbidden' })
    async signUp(@Body() signUpDTO: SignUpDTO): Promise<SignUpRes> {
        console.log(signUpDTO)
        return await this.userService.create(signUpDTO)
    }

    @Post('login')
    @ApiCreatedResponse({ description: "The user was successfully logged in" })
    @ApiForbiddenResponse({ description: 'Forbidden' })
    async login(@Body() loginDTO: SignUpDTO): Promise<LoginRsp> {
        return await this.userService.login(loginDTO)
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    @ApiCreatedResponse({ description: "The user's profile was accessed" })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiBearerAuth()
    async profile(@Req() request): Promise<any> {
        return request.user
    }
}
