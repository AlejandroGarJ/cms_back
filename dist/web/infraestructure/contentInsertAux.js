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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webBdSchema_1 = __importDefault(require("./webBdSchema"));
const mongoConnect_1 = require("../../mongo/mongoConnect");
const contenido = {
    numeroPropiedades: 12,
    clientesSatisfechos: 150,
    premios: 3,
    puntuacionMedia: 4.9,
    viviendas: [
        {
            ubicacion: 'Chiclana',
            descripcion: 'Piso amueblado de 3 habitaciones con vistas al mar.',
            estado: 'Disponible',
            habitaciones: 3,
            baños: 2,
            metrosCuadrados: 1500,
            precio: 200000,
            imagenes: [
                { imagen: 'chiclana-piso1.jpg' },
                { imagen: 'chiclana-piso2.jpg' },
            ],
        },
    ],
    mensajes: [
        {
            nombre: '',
            email: '',
            mensaje: '',
        },
    ],
};
const crearWeb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoConnect_1.client.connect();
        const database = mongoConnect_1.client.db('cdn');
        const collection = database.collection('web');
        const nuevaWeb = new webBdSchema_1.default({
            name: 'Web Insercion loca',
            domain: 'WebLocotrona.com',
            content: contenido,
            user: '66ebfa5ef97c3aa4c19f8c19', // Asegúrate de que el ID es válido
        });
        yield collection.insertOne(nuevaWeb);
        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
    finally {
        yield mongoConnect_1.client.close();
    }
});
crearWeb();
