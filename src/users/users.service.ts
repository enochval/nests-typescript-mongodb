import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/users.schema';
import { SignUpDTO } from './dto/signup.dto';
import { SignUpRes } from './interfaces/signup.interface';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>
    ) {}

    async create(signUpDTO: SignUpDTO): Promise<SignUpRes> {
        const createUser = new this.userModel(signUpDTO)
        return await createUser.save()
    }
}
