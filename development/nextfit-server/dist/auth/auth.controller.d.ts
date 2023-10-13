import { HttpException } from '@nestjs/common';
import { UserDetails } from 'src/entities/user-details.interface';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { ExistingUserDto } from 'src/user/dto/existing-user.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(user: CreateUserDTO): Promise<UserDetails | HttpException>;
    login(user: ExistingUserDto): Promise<{
        token: string;
    } | HttpException>;
}
