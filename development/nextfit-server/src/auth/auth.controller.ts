import { Body, Controller, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common';
import { UserDetails } from 'src/entities/user-details.interface';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { ExistingUserDto } from 'src/user/dto/existing-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    register(@Body() user: CreateUserDTO): Promise<UserDetails | HttpException>{
        return this.authService.register(user)
    }

    @Post('login')
    @HttpCode(HttpStatus.ACCEPTED)
    login(@Body() user: ExistingUserDto): Promise<{token:string} | HttpException>{
        return this.authService.login(user)
    }

}
