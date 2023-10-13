import { Training } from 'src/schema/training.schema';
export interface UserDetails {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    trainings: Training[];
}
