import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { UserDetails } from 'src/entities/user-details.interface';
import { ExistingUserDto } from 'src/user/dto/existing-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  //Hash the password passed into the function
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }
  //register new user and check if email is already in use
  async register(
    user: Readonly<CreateUserDTO>,
  ): Promise<UserDetails | HttpException> {
    const { firstname, lastname, email, password } = user;

    const expression = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const validMail: boolean = expression.test(email);

    if (!validMail)
      return new HttpException('Invalid email', HttpStatus.BAD_REQUEST);

    const existingUser = await this.userService.findByMail(email);
    if (existingUser)
      return new HttpException('Mail already used', HttpStatus.FORBIDDEN);

    const hashedPassword = await this.hashPassword(password);
    const newUser = await this.userService.create(
      firstname,
      lastname,
      email.toLowerCase(),
      hashedPassword,
    );
    return this.userService._getUserDetails(newUser);
  }
  //check if the password is matched to the second password
  async passwordMatch(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
  //check if the user already exists 
  async validateUser(
    email: string,
    password: string,
  ): Promise<UserDetails | null> {
    //find the user by mail
    const user = await this.userService.findByMail(email);
    const userExist = !!user;

    if (!userExist) return null;
    //check if the password matches
    const doespasswordMatch = await this.passwordMatch(password, user.password);
    if (!doespasswordMatch) return null;

    return this.userService._getUserDetails(user);
  }
  //login user and check if user exists
  async login(
    existingUser: ExistingUserDto,
  ): Promise<{ token: string } | HttpException> {
    const { email, password } = existingUser;
    const user = await this.validateUser(email.toLowerCase(), password);

    if (!user)
      //throw exception when user has wrong credentials
      return new HttpException('Wrong credentials', HttpStatus.FORBIDDEN);

    const jwt = await this.jwtService.signAsync({ user });
    return { token: jwt };
  }
}
