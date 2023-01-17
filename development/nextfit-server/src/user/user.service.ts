import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { create } from 'domain';
import { Model } from 'mongoose';
import { first } from 'rxjs';
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
      mail: user.mail
    };  
  }

  async findById(id: string): Promise<UserDetails | null> {
    const user = await this.userModel.findById(id).exec();
    if (!user) return null;
    return this._getUserDetails(user);
  }

  async findByMail(mail: string): Promise<UserDokument | null>{
    return this.userModel.findOne({mail}).exec();
  }

  async create(firstname: string, lastname:string, mail:string, hashedpw: string): Promise<UserDokument>{
    const newUser = new this.userModel({
      firstname,
      lastname,
      mail,
      pw:hashedpw,
    });
    return newUser.save();
  }

  /*
    async findOne(mail: string): Promise<UserDokument | undefined> {
      return this.userModel.find(user => user.mail === mail);
    }
  */
}
