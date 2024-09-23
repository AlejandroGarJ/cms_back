import { ObjectId } from 'mongodb';
import { client } from '../../../mongo/mongoConnect';
import { IUserRepositoryPort } from '../../domain/ports/UserRepository';
import { User } from '../../domain/User';

export class DatabaseUserRepository implements IUserRepositoryPort {
  async createUser(user: User): Promise<boolean> {
    if (!(await this.emailExists(user.email))) {
      try {
        await client.connect();
        const database = client.db('cdn');
        const collection = database.collection('user');
        user._id = new ObjectId();
        await collection.insertOne(user);
        return true;
      } catch (error) {
        console.error(error);
        return false;
      } finally {
        await client.close();
      }
    } else {
      return false;
    }
  }

  async emailExists(email: string): Promise<boolean> {
    try {
      await client.connect();
      const database = client.db('cdn');
      const collection = database.collection('user');
      const emailExists = await collection.findOne({ email });
      return !!emailExists;
    } catch (error) {
      console.error(error);

      return true;
    } finally {
      await client.close();
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      await client.connect();
      const database = client.db('cdn');
      const collection = database.collection('user');
      const result = await collection.findOne({ email });
      if (result) {
        const user: User = {
          _id: result._id,
          email: result.email,
          name: result.name,
          password: result.password,
        };
        return user;
      } else return null;
    } catch (error) {
      console.error('Error fetching user by email:', error);
      throw new Error('Error fetching user');
    } finally {
      await client.close();
    }
  }
}
