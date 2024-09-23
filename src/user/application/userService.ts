import bcrypt from 'bcrypt';
import { User } from '../domain/User';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

export class UserService {
  async mapUser(user: User) {
    user.password = await this.hashString(user.password);
    user.email = user.email.toLowerCase();
    return user;
  }

  async hashString(string: string): Promise<string> {
    try {
      const hash = await bcrypt.hash(string, 10);
      return hash;
    } catch (error) {
      console.error('Error hashing string:', error);
      throw error;
    }
  }

  async compareString(string: string, hash: string): Promise<boolean> {
    try {
      const isMatch = await bcrypt.compare(string, hash);
      return isMatch;
    } catch (error) {
      console.error('Error comparing string with hash:', error);
      throw error;
    }
  }

  generateToken(user: User, expiresIn: string = '1h'): string {
    dotenv.config();
    const JWT_KEY = process.env.jwt_key;
    try {
      const token = jwt.sign(user, JWT_KEY ? JWT_KEY : '', { expiresIn });
      return token;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  verifyToken(token: string): User | null {
    const JWT_KEY = process.env.jwt_key;
    try {
      const decoded = jwt.verify(token, JWT_KEY ? JWT_KEY : '') as User;
      if (typeof decoded === 'object' && decoded !== null) {
        return decoded;
      } else {
        console.error('Decoded token is not an object');
        return null;
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      return null;
    }
  }
}
