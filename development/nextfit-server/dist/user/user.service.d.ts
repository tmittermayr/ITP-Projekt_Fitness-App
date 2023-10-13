import { Model } from 'mongoose';
import { UserDokument } from '../schema/user.shema';
import { UserDetails } from '../entities/user-details.interface';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<UserDokument>);
    _getUserDetails(user: UserDokument): UserDetails;
    findById(id: string): Promise<UserDetails | null>;
    findByMail(email: string): Promise<UserDokument | null>;
    create(firstname: string, lastname: string, email: string, hashedPassword: string): Promise<UserDokument>;
    addTrainingId(_id: any, userid: any): Promise<void>;
}
