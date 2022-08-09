const {
    Router
} = require('express');
const userController = require('../controllers/UserController');
const {
    checkToken
} = require('../middlewares/tokenMiddlewares');

const router = new Router();

router.delete('/user/:userId', checkToken, userController.deleteUser);

// Rotas Publicas
router.post('/register/user', userController.createUser);
router.post('/auth/login', userController.authUser);

// Rotas privadas
router.get('/user/all', checkToken, userController.getOtherUsers);

// O login do usuário deve ser enviado pela URL
router.get('/user/:login', checkToken, userController.getUser);
router.put('/user/edit', checkToken, userController.updateUser);


module.exports = router;