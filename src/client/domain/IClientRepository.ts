import { Client } from './Client';

export interface IClientRepository {
  /* getClientsByWebId(webId: ObjectId): Promise<Client[]>; */
  saveClient(newClient: Client, webId: string): Promise<void>;
}
