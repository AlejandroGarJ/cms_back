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
const express_1 = require("express");
const ClientRepository_1 = require("./ClientRepository");
/* import { UserService } from '../../user/application/userService';
import { ObjectId } from 'mongodb'; */
const router = (0, express_1.Router)();
router.post('/insertNewClient', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    new ClientRepository_1.ClientRepository()
        .saveClient({
        nombre: req.body.nombre,
        email: req.body.email,
        mensaje: req.body.mensaje,
    }, req.body.webId)
        .then(() => {
        return res.json({ inserted: true });
    });
}));
exports.default = router;
