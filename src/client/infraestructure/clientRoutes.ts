import { Router } from 'express';
import { ClientRepository } from './ClientRepository';
/* import { UserService } from '../../user/application/userService';
import { ObjectId } from 'mongodb'; */

const router = Router();

router.post('/insertNewClient', async (req, res) => {
  new ClientRepository()
    .saveClient(
      {
        nombre: req.body.nombre,
        email: req.body.email,
        mensaje: req.body.mensaje,
      },
      req.body.webId
    )
    .then(() => {
      return res.json({ inserted: true });
    });
});

export default router;
