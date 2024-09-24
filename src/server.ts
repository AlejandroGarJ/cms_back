import express, { Request, Response } from 'express';
import userRoutes from './user/infraestructure/userRoutes';
import webRoutes from './web/infraestructure/webRoutes';
import cors from 'cors';
import clientRoutes from './client/infraestructure/clientRoutes';
// Crear una instancia de Express
const app = express();

// Middleware para parsear JSON
app.use(express.json());
app.use(
  cors({
    origin: 'https://cms-front-rust.vercel.app/', // Replace with your frontend origin
  })
);
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript server!');
});

app.use('/user', userRoutes);
app.use('/web', webRoutes);
app.use('/client', clientRoutes);

// Ruta para manejar errores 404
app.use((req: Request, res: Response) => {
  res.status(404).send('404 Not Found');
});

// Iniciar el servidor
const PORT = process.env.port;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
