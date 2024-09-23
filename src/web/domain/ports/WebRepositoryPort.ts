/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectId } from 'mongodb';

export interface IWebRepositoryPort {
  getWebsFromUser(userId: ObjectId): Promise<any>;
  getWebById(webId: ObjectId): Promise<any>;
}
