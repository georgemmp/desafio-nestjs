import { Matches, IsEmail, IsString, MinLength } from "class-validator";

export class UserCreateDto {
    @IsEmail()
    email: string;

    @IsString()
    username: string;

    @IsString()
    @MinLength(6)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'Password must be at least one capital letter and must be alpha numeric'})
    password: string;

    @IsString()
    @MinLength(6)
    passwordConfirmation: string;
}