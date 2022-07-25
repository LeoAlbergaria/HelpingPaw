const { Router } = require('express');
const userController = require('../controllers/UserController');
const jwt = require('jsonwebtoken');


function checkToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) {
        return res.status(401).json({ msg: 'Acesso negado!' });
    }

    try {

        const secret = process.env.SECRET;

        // Caso não passe na verificação, vai pro catch
        jwt.verify(token, secret);

        next();

    } catch(erro) {
        res.status(400).json({ msg: 'Token inválido!' });
    }
    
}

const router = new Router();

router.post('/register/user', userController.createUser);
router.post('/auth/login', userController.authUser);

// O login do usuário deve ser enviado pela URL
router.get('/user/:id', checkToken, userController.privateGetUser);

module.exports = router;
