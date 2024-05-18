import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/users.schema';
import { SignUpDTO } from './dto/signup.dto';
import { SignUpRes } from './interfaces/signup.interface';
import { HasherService } from './auth/hasher/hasher.service';
import { LoginRsp } from './interfaces/user.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
        private readonly hasherService: HasherService,
        private readonly jwtService: JwtService
    ) {}

    async create(signUpDTO: SignUpDTO): Promise<SignUpRes> {
        const user = await this.userModel.findOne({ email: signUpDTO.email })
        if (user) {
            throw new UnauthorizedException(`User with email ${signUpDTO.email} aleady exists.`)
        }

        Object.assign(
            signUpDTO, 
            { password: await this.hasherService.passwordHasher(signUpDTO.password) }
        )

        console.log(signUpDTO.email)

        const { email } = await new this.userModel(signUpDTO).save()
        return { email }
    }

    async login(signUpDTO: SignUpDTO): Promise<LoginRsp> {
        const user = await this.userModel.findOne({ email: signUpDTO.email })
        if (!user) {
            throw new UnauthorizedException("Could not find any user.")
        }

        const matchPassword = await this.hasherService.comparePassword(
            signUpDTO.password, user.password
        )

        if(!matchPassword){
            throw new UnauthorizedException("Invalid credentials.")
        }

        const payload = { sub: user.id, email: user.email }
        return {
            accessToken: await this.jwtService.signAsync(payload)
        }
    }
}
