import { ObjectId } from 'mongodb';
import { client } from '../../mongo/mongoConnect';
import { Client } from '../domain/Client';
import { IClientRepository } from '../domain/IClientRepository';

export class ClientRepository implements IClientRepository {
  async saveClient(newClient: Client, webId: string): Promise<void> {
    try {
      await client.connect();
      const database = client.db('cdn');
      const collection = database.collection('web');
      const web = await collection.findOne({ _id: new ObjectId(webId) });

      if (web) {
        web.content.mensajes.push(newClient);
        await collection.replaceOne({ _id: new ObjectId(webId) }, web);
      } else {
        console.error('Could not update document');
      }
    } catch (error) {
      console.error('Error al reemplazar el documento:', error);
    }
  }
}
