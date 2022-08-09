const {
  Router
} = require('express');
const userController = require('../controllers/UserController');
const {
  checkToken
} = require('../middlewares/tokenMiddlewares');

const {
  body,
} = require('express-validator');

const {
  checkForErrors,
  validateTelefone
} = require('../middlewares/validationMiddlewares');


const router = new Router();

router.delete('/user/:userId', checkToken, userController.deleteUser);

// Rotas Publicas
router.post('/register/user', body('email').isEmail().withMessage("E-mail inválido"), body('telefone').custom(validateTelefone), checkForErrors, userController.createUser);
router.post('/auth/login', userController.authUser);

// Rotas privadas
router.get('/user/all', checkToken, userController.getOtherUsers);

// O login do usuário deve ser enviado pela URL
router.get('/user/:login', checkToken, userController.getUser);
router.put('/user/edit', checkToken, body('email').isEmail().withMessage("E-mail inválido"), body('telefone').custom(validateTelefone), checkForErrors, userController.updateUser);


module.exports = router;