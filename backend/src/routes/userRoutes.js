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


// Rotas Publicas
// Registra um usuário, verificando a validade das informações
router.post('/register/user', body('email').isEmail().withMessage("E-mail inválido"), body('telefone').custom(validateTelefone), checkForErrors, userController.createUser);
router.post('/auth/login', userController.authUser);

// Rotas privadas

// Consulta todos os usuários cadastrados no sistema e os retorna, com excessão do usuário enviando a requisição
router.get('/user/all', checkToken, userController.getOtherUsers);
// Consulta um usuário específico. O login do usuário deve ser enviado pela URL
router.get('/user/:login', checkToken, userController.getUser);
// Atualiza um usuário verificando seu token e as informações
router.put('/user/edit', checkToken, userController.matchUserToken, body('email').isEmail().withMessage("E-mail inválido"), body('telefone').custom(validateTelefone), checkForErrors, userController.updateUser);
// Deleta um usuário do banco, verificando se o token do usuário é o mesmo sendo excluído
router.delete('/user/:userId', checkToken, userController.matchUserToken, userController.deleteUser);

module.exports = router;