"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const databaseUserRepository_1 = require("./adapters/databaseUserRepository");
const userService_1 = require("../application/userService");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    const data = {
        message: 'This is some data from the /user route',
        timestamp: new Date(),
    };
    res.json(data);
});
router.post('/createUser', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    // eslint-disable-next-line no-constant-condition
    if (name && email && password) {
        const userRepository = new databaseUserRepository_1.DatabaseUserRepository();
        let user = { name, email, password, _id: Object() };
        const userService = new userService_1.UserService();
        userService.mapUser(user).then((newUser) => {
            user = newUser;
            userRepository.createUser(user).then((userCreated) => {
                res.json({ response: userCreated });
            });
        });
    }
    else {
        res.json({ response: false });
    }
});
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (email && password) {
        const userRepository = new databaseUserRepository_1.DatabaseUserRepository();
        userRepository.getUserByEmail(email).then((user) => {
            if (user) {
                const userService = new userService_1.UserService();
                userService
                    .compareString(password, user.password)
                    .then((passwordCorrect) => {
                    if (passwordCorrect) {
                        res.json({ response: userService.generateToken(user) });
                    }
                    else {
                        res.json({ response: false });
                    }
                });
            }
            else {
                res.json({ response: false });
            }
        });
    }
    else {
        res.json({ response: false });
    }
});
router.post('/checkToken', (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.split(' ')[1] : null;
    if (token) {
        const userService = new userService_1.UserService();
        const tokenVerify = userService.verifyToken(token);
        if (tokenVerify) {
            res.json({ token: true });
        }
        else {
            res.status(401).send('Unauthorized');
        }
    }
    else {
        res.status(401).send('Unauthorized');
    }
});
exports.default = router;
