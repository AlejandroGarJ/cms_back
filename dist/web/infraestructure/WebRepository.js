"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebRepository = void 0;
const mongodb_1 = require("mongodb");
const mongoConnect_1 = require("../../mongo/mongoConnect");
class WebRepository {
    getWebsFromUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoConnect_1.client.connect();
                const database = mongoConnect_1.client.db('cdn');
                const collection = database.collection('web');
                const webs = yield collection.find({ user: userId }).toArray();
                return webs;
            }
            catch (error) {
                console.error(error);
                return false;
            }
            finally {
                yield mongoConnect_1.client.close();
            }
        });
    }
    getWebById(webId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoConnect_1.client.connect();
                const database = mongoConnect_1.client.db('cdn');
                const collection = database.collection('web');
                const web = yield collection.findOne({ _id: webId });
                return web;
            }
            catch (error) {
                console.error(error);
                return false;
            }
            finally {
                yield mongoConnect_1.client.close();
            }
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateWeb(webId, newWeb) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if ('_id' in newWeb) {
                    delete newWeb._id;
                }
                newWeb.user = new mongodb_1.ObjectId(newWeb.user); // When user is send from front, his type is passed from objectId to String so it has to be parsed
                yield mongoConnect_1.client.connect();
                const database = mongoConnect_1.client.db('cdn');
                const collection = database.collection('web');
                const result = yield collection.replaceOne({ _id: webId }, newWeb);
                if (result.matchedCount === 0)
                    return false;
                else
                    return true;
            }
            catch (error) {
                console.error('Error al reemplazar el documento:', error);
            }
        });
    }
    getContentById(webId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoConnect_1.client.connect();
                const database = mongoConnect_1.client.db('cdn');
                const collection = database.collection('web');
                const result = yield collection.findOne({ _id: webId });
                if (result)
                    return result;
                else
                    return false;
            }
            catch (error) {
                console.error('Error al reemplazar el documento:', error);
            }
        });
    }
}
exports.WebRepository = WebRepository;
