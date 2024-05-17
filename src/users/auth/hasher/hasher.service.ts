import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HasherService {

    async passwordHasher(password: string): Promise<String> {
        return await bcrypt.hash(password, 10)
    }

    async comparePassword(plainPassword: string, encryptedPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainPassword, encryptedPassword);
    }
}
