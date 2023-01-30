import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDokument } from '../schema/user.shema';
import { UserDetails } from '../entities/user-details.interface';

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private readonly userModel: Model < UserDokument > ) {}
  
  _getUserDetails(user: UserDokument): UserDetails{
    return {
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email
    };  
  }

  async findById(id: string): Promise<UserDetails | null> {
    const user = await this.userModel.findById(id).exec();
    if (!user) return null;
    return this._getUserDetails(user);
  }

  async findByMail(email: string): Promise<UserDokument | null>{
    return this.userModel.findOne({email}).exec();
  }

  async create(firstname: string, lastname:string, email:string, hashedPassword: string): Promise<UserDokument>{
    const newUser = new this.userModel({
      firstname,
      lastname,
      email,
      password:hashedPassword,
    });
    return newUser.save();
  }
}
