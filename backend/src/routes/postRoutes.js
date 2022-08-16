const {
    Router
} = require('express');
const postController = require('../controllers/PostController');
const userController = require('../controllers/UserController');
const {
    checkToken
} = require('../middlewares/tokenMiddlewares');

const router = new Router();

// Consulta um post pelo ID
router.get('/post/:postId', checkToken, postController.getPost);
// Atualiza as informações de um post
router.put('/user/updatePost', checkToken, postController.updatePost);
// Consulta todos os posts cadastrados, filtrados por tags
router.post('/posts', checkToken, postController.getAllPosts);
// Consulta todos os posts cadastrados, sem filtros de tags
router.get('/posts', checkToken, postController.getAllPosts);
// Cadastra um novo post no sistema
router.post('/user/newpost', checkToken, userController.matchUserToken, postController.createPost);
// Consulta os posts de um usuário
router.get('/:login/posts', checkToken, postController.getUserPosts);
// Deleta os posts de um usuário
router.delete('/post/:postId', checkToken, postController.deletePost);

module.exports = router;