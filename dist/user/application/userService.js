"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv = __importStar(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserService {
    mapUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            user.password = yield this.hashString(user.password);
            user.email = user.email.toLowerCase();
            return user;
        });
    }
    hashString(string) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hash = yield bcrypt_1.default.hash(string, 10);
                return hash;
            }
            catch (error) {
                console.error('Error hashing string:', error);
                throw error;
            }
        });
    }
    compareString(string, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isMatch = yield bcrypt_1.default.compare(string, hash);
                return isMatch;
            }
            catch (error) {
                console.error('Error comparing string with hash:', error);
                throw error;
            }
        });
    }
    generateToken(user, expiresIn = '1h') {
        dotenv.config();
        const JWT_KEY = process.env.jwt_key;
        try {
            const token = jsonwebtoken_1.default.sign(user, JWT_KEY ? JWT_KEY : '', { expiresIn });
            return token;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    verifyToken(token) {
        const JWT_KEY = process.env.jwt_key;
        try {
            const decoded = jsonwebtoken_1.default.verify(token, JWT_KEY ? JWT_KEY : '');
            if (typeof decoded === 'object' && decoded !== null) {
                return decoded;
            }
            else {
                console.error('Decoded token is not an object');
                return null;
            }
        }
        catch (error) {
            console.error('Error verifying token:', error);
            return null;
        }
    }
}
exports.UserService = UserService;
