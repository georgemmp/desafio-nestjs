import { Repository, EntityRepository } from "typeorm";
import { User } from "src/entities/user.entity";
import * as bcrypt from 'bcrypt';
import { ConflictException, InternalServerErrorException, BadRequestException } from "@nestjs/common";
import { UserCreateDto } from "src/dtos/user-create.dto";
import { AuthDto } from "src/dtos/auth.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(userData: UserCreateDto): Promise<void> {
        const { email, password, username, passwordConfirmation } = userData;

        if (password !== passwordConfirmation) {
            throw new BadRequestException('Passwords not matches')
        }

        const user = new User();
        user.email = email;
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);

        try {
            await user.save();
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('Username or email already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async validateUserPassword(userData: AuthDto): Promise<string> {
        const { email, password } = userData;
        const user = await this.findOne({ email })

        if (user && await user.validatePassword(password)) {
            return user.email;
        } else {
            return null;
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}