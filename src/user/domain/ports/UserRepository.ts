import { User } from '../User';

export interface IUserRepositoryPort {
  createUser(user: User): Promise<boolean>;
  /*  emailExists(email: string) : Promise<boolean>; */
}
