import { Router } from 'express';
import { UserService } from '../../user/application/userService';
import { WebRepository } from './WebRepository';
import { ObjectId } from 'mongodb';
import { WebDomain, WebService } from '../application/webService';

const router = Router();

router.post('/getWebsByUser', (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader ? authHeader.split(' ')[1] : null;
  const userService = new UserService();
  const user = userService.verifyToken(token ? token : '');
  if (user) {
    const webRepository = new WebRepository();
    webRepository.getWebsFromUser(new ObjectId(user._id)).then((webs) => {
      return res.json({ webs: webs });
    });
  } else {
    res.status(401).send('Unauthorized');
  }
});

router.post('/getWebsDomainByUser', (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader ? authHeader.split(' ')[1] : null;
  const userService = new UserService();
  const user = userService.verifyToken(token ? token : '');
  if (user) {
    const webRepository = new WebRepository();
    webRepository.getWebsFromUser(new ObjectId(user._id)).then((webs) => {
      const webDomains: WebDomain[] = [];
      if (webs) {
        webs.forEach((web) => {
          const webService = new WebService();
          webDomains.push(webService.mapWebDomain(web));
        });
      }
      return res.json({ webs: webDomains });
    });
  } else {
    res.status(401).send('Unauthorized');
  }
});

router.post('/getWebById', (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader ? authHeader.split(' ')[1] : null;
  const userService = new UserService();
  const user = userService.verifyToken(token ? token : '');
  if (user && req.body.webId) {
    const webRepository = new WebRepository();
    webRepository.getWebById(new ObjectId(req.body.webId)).then((web) => {
      return res.json({ web });
    });
  } else {
    res.status(401).send('Unauthorized');
  }
});

router.post('/updateWeb', (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader ? authHeader.split(' ')[1] : null;
  const userService = new UserService();
  const user = userService.verifyToken(token ? token : '');

  if (user && req.body.web) {
    const webRepository = new WebRepository();
    webRepository.getWebById(new ObjectId(req.body.web._id)).then((web) => {
      const webService = new WebService();
      const mappedWeb = webService.mapWebDomain(web);
      if (user._id == new ObjectId(mappedWeb.user)) {
        webRepository
          .updateWeb(new ObjectId(mappedWeb.id), req.body.web)
          .then((response) => {
            return res.json({ response });
          });
      } else {
        res.status(401).send('Unauthorized');
      }
    });
  } else {
    res.status(401).send('Unauthorized');
  }
});

router.get('/getContentById/:id', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  const { id } = req.params;
  const webRepository = new WebRepository();
  console.log('Se ha mandado la peticion para la obtencion de content');
  webRepository.getContentById(new ObjectId(id.trim())).then((web) => {
    if (web) {
      if (web.content && 'mensajes' in web.content) {
        delete web.content.mensajes; // Messages should be accesible only for the web owner
      }
    }
    console.log({ web });
    return res.json({ res: web });
  });
});

export default router;
