"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userService_1 = require("../../user/application/userService");
const WebRepository_1 = require("./WebRepository");
const mongodb_1 = require("mongodb");
const webService_1 = require("../application/webService");
const router = (0, express_1.Router)();
router.post('/getWebsByUser', (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.split(' ')[1] : null;
    const userService = new userService_1.UserService();
    const user = userService.verifyToken(token ? token : '');
    if (user) {
        const webRepository = new WebRepository_1.WebRepository();
        webRepository.getWebsFromUser(new mongodb_1.ObjectId(user._id)).then((webs) => {
            return res.json({ webs: webs });
        });
    }
    else {
        res.status(401).send('Unauthorized');
    }
});
router.post('/getWebsDomainByUser', (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.split(' ')[1] : null;
    const userService = new userService_1.UserService();
    const user = userService.verifyToken(token ? token : '');
    if (user) {
        const webRepository = new WebRepository_1.WebRepository();
        webRepository.getWebsFromUser(new mongodb_1.ObjectId(user._id)).then((webs) => {
            const webDomains = [];
            if (webs) {
                webs.forEach((web) => {
                    const webService = new webService_1.WebService();
                    webDomains.push(webService.mapWebDomain(web));
                });
            }
            return res.json({ webs: webDomains });
        });
    }
    else {
        res.status(401).send('Unauthorized');
    }
});
router.post('/getWebById', (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.split(' ')[1] : null;
    const userService = new userService_1.UserService();
    const user = userService.verifyToken(token ? token : '');
    if (user && req.body.webId) {
        const webRepository = new WebRepository_1.WebRepository();
        webRepository.getWebById(new mongodb_1.ObjectId(req.body.webId)).then((web) => {
            return res.json({ web });
        });
    }
    else {
        res.status(401).send('Unauthorized');
    }
});
router.post('/updateWeb', (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.split(' ')[1] : null;
    const userService = new userService_1.UserService();
    const user = userService.verifyToken(token ? token : '');
    if (user && req.body.web) {
        const webRepository = new WebRepository_1.WebRepository();
        webRepository.getWebById(new mongodb_1.ObjectId(req.body.web._id)).then((web) => {
            const webService = new webService_1.WebService();
            const mappedWeb = webService.mapWebDomain(web);
            if (user._id == new mongodb_1.ObjectId(mappedWeb.user)) {
                webRepository
                    .updateWeb(new mongodb_1.ObjectId(mappedWeb.id), req.body.web)
                    .then((response) => {
                    return res.json({ response });
                });
            }
            else {
                res.status(401).send('Unauthorized');
            }
        });
    }
    else {
        res.status(401).send('Unauthorized');
    }
});
router.get('/getContentById/:id', (req, res) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    const { id } = req.params;
    const webRepository = new WebRepository_1.WebRepository();
    console.log('Se ha mandado la peticion para la obtencion de content');
    webRepository.getContentById(new mongodb_1.ObjectId(id.trim())).then((web) => {
        if (web) {
            if (web.content && 'mensajes' in web.content) {
                delete web.content.mensajes; // Messages should be accesible only for the web owner
            }
        }
        console.log({ web });
        return res.json({ res: web });
    });
});
exports.default = router;
