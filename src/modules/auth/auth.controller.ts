import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ValidationPipe } from 'src/pipes/validation.pipes';
import { UserCreateDto } from 'src/dtos/user-create.dto';
import { AuthDto } from 'src/dtos/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}

    @Post('/signup')
    @UsePipes(new ValidationPipe())
    signUp(@Body() userData: UserCreateDto): Promise<void> {
        return this.authService.signUp(userData);
    }

    @Post('/signin')
    @UsePipes(new ValidationPipe())
    signIn(@Body() userData: AuthDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(userData);
    }
}
