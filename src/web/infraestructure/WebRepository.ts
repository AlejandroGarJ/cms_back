import { ObjectId } from 'mongodb';
import { client } from '../../mongo/mongoConnect';
import { IWebRepositoryPort } from '../domain/ports/WebRepositoryPort';

export class WebRepository implements IWebRepositoryPort {
  async getWebsFromUser(userId: ObjectId) {
    try {
      await client.connect();
      const database = client.db('cdn');
      const collection = database.collection('web');

      const webs = await collection.find({ user: userId }).toArray();
      return webs;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      await client.close();
    }
  }

  async getWebById(webId: ObjectId) {
    try {
      await client.connect();
      const database = client.db('cdn');
      const collection = database.collection('web');

      const web = await collection.findOne({ _id: webId });
      return web;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      await client.close();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async updateWeb(webId: ObjectId, newWeb: any) {
    try {
      if ('_id' in newWeb) {
        delete newWeb._id;
      }
      newWeb.user = new ObjectId(newWeb.user); // When user is send from front, his type is passed from objectId to String so it has to be parsed
      await client.connect();
      const database = client.db('cdn');
      const collection = database.collection('web');

      const result = await collection.replaceOne({ _id: webId }, newWeb);
      if (result.matchedCount === 0) return false;
      else return true;
    } catch (error) {
      console.error('Error al reemplazar el documento:', error);
    }
  }

  async getContentById(webId: ObjectId) {
    try {
      await client.connect();
      const database = client.db('cdn');
      const collection = database.collection('web');

      const result = await collection.findOne({ _id: webId });
      if (result) return result;
      else return false;
    } catch (error) {
      console.error('Error al reemplazar el documento:', error);
    }
  }
}
