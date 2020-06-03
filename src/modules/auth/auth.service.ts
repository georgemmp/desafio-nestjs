import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/repositories/UserRepository';
import { JwtService } from '@nestjs/jwt'
import { UserCreateDto } from 'src/dtos/user-create.dto';
import { AuthDto } from 'src/dtos/auth.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async signUp(userData: UserCreateDto): Promise<void> {
        return this.userRepository.signUp(userData);
    }

    async signIn(userData: AuthDto): Promise<{ accessToken: string }> {
        const email = await this.userRepository.validateUserPassword(userData);

        if (!email) {
            throw new UnauthorizedException('Invalid Credentials');
        }

        const accessToken = this.jwtService.sign({ email });

        return { accessToken };
    }
}
