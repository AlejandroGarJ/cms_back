import Web from './webBdSchema';
import { client } from '../../mongo/mongoConnect';

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

const crearWeb = async () => {
  try {
    await client.connect();
    const database = client.db('cdn');
    const collection = database.collection('web');
    const nuevaWeb = new Web({
      name: 'Web Insercion loca',
      domain: 'WebLocotrona.com',
      content: contenido,
      user: '66ebfa5ef97c3aa4c19f8c19', // Asegúrate de que el ID es válido
    });
    await collection.insertOne(nuevaWeb);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    await client.close();
  }
};

crearWeb();
