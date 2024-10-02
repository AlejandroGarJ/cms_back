"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./user/infraestructure/userRoutes"));
const webRoutes_1 = __importDefault(require("./web/infraestructure/webRoutes"));
const cors_1 = __importDefault(require("cors"));
const clientRoutes_1 = __importDefault(require("./client/infraestructure/clientRoutes"));
// Crear una instancia de Express
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
// Middleware para parsear JSON
app.use(body_parser_1.default.json({ limit: 'Infinity' }));
app.use(body_parser_1.default.urlencoded({ limit: 'Infinity', extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('Hello, TypeScript server!');
});
app.use('/user', userRoutes_1.default);
app.use('/web', webRoutes_1.default);
app.use('/client', clientRoutes_1.default);
// Ruta para manejar errores 404
app.use((req, res) => {
    res.status(404).send('404 Not Found');
});
// Iniciar el servidor
const PORT = process.env.port;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
exports.default = app;
