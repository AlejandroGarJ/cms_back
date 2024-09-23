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
exports.ClientRepository = void 0;
const mongodb_1 = require("mongodb");
const mongoConnect_1 = require("../../mongo/mongoConnect");
class ClientRepository {
    saveClient(newClient, webId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoConnect_1.client.connect();
                const database = mongoConnect_1.client.db('cdn');
                const collection = database.collection('web');
                const web = yield collection.findOne({ _id: new mongodb_1.ObjectId(webId) });
                if (web) {
                    web.content.mensajes.push(newClient);
                    yield collection.replaceOne({ _id: new mongodb_1.ObjectId(webId) }, web);
                }
                else {
                    console.error('Could not update document');
                }
            }
            catch (error) {
                console.error('Error al reemplazar el documento:', error);
            }
        });
    }
}
exports.ClientRepository = ClientRepository;
