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
const mongoose_1 = __importDefault(require("mongoose"));
const webBdSchema_1 = __importDefault(require("../web/infraestructure/webBdSchema"));
const mongoConnect_1 = require("../mongo/mongoConnect");
const contenido = {
    numeroPropiedades: 0,
    clientesSatisfechos: 0,
    premios: 0,
    puntuacionMedia: 4.9,
    viviendas: [
        {
            ubicacion: 'Chiclana',
            estado: 'Disponible',
            precio: 200000,
            descripcion: 'Piso amueblado...',
            imagenes: [{ imagen: 'archivo' }],
        },
    ],
};
const crearWeb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoConnect_1.client.connect();
        const database = mongoConnect_1.client.db('cdn');
        const nuevaWeb = new webBdSchema_1.default({
            nombre: 'Web prueba',
            dominio: 'Prueba.com',
            contenido: contenido,
            usuario: new mongoose_1.default.Types.ObjectId('66dedbf4a7ab1acec2945e8b'), // Asegúrate de que el ID es válido
        });
        yield nuevaWeb.save(); // Utiliza el método save() para guardar el documento
        console.log('Web creada exitosamente');
        return true;
    }
    catch (error) {
        console.error('Error al crear la web:', error);
        return false;
    }
    finally {
        console.log('Aqui acaba');
        yield mongoConnect_1.client.close();
    }
});
crearWeb();
