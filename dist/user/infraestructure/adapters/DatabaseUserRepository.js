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
exports.DatabaseUserRepository = void 0;
const mongodb_1 = require("mongodb");
const mongoConnect_1 = require("../../../mongo/mongoConnect");
class DatabaseUserRepository {
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.emailExists(user.email))) {
                try {
                    yield mongoConnect_1.client.connect();
                    const database = mongoConnect_1.client.db('cdn');
                    const collection = database.collection('user');
                    user._id = new mongodb_1.ObjectId();
                    yield collection.insertOne(user);
                    return true;
                }
                catch (error) {
                    console.error(error);
                    return false;
                }
                finally {
                    yield mongoConnect_1.client.close();
                }
            }
            else {
                return false;
            }
        });
    }
    emailExists(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoConnect_1.client.connect();
                const database = mongoConnect_1.client.db('cdn');
                const collection = database.collection('user');
                const emailExists = yield collection.findOne({ email });
                return !!emailExists;
            }
            catch (error) {
                console.error(error);
                return true;
            }
            finally {
                yield mongoConnect_1.client.close();
            }
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoConnect_1.client.connect();
                const database = mongoConnect_1.client.db('cdn');
                const collection = database.collection('user');
                const result = yield collection.findOne({ email });
                if (result) {
                    const user = {
                        _id: result._id,
                        email: result.email,
                        name: result.name,
                        password: result.password,
                    };
                    return user;
                }
                else
                    return null;
            }
            catch (error) {
                console.error('Error fetching user by email:', error);
                throw new Error('Error fetching user');
            }
            finally {
                yield mongoConnect_1.client.close();
            }
        });
    }
}
exports.DatabaseUserRepository = DatabaseUserRepository;
