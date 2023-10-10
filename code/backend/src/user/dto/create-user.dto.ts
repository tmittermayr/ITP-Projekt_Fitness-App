import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDTO{
    
    @IsNotEmpty()
    firstname:string;

    @IsNotEmpty()
    lastname:string;
    
    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsNotEmpty()
    password:string;
}   