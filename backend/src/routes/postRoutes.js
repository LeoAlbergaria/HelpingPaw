const {
    Router
} = require('express');
const postController = require('../controllers/PostController');
const {
    checkToken
} = require('../middlewares/tokenMiddlewares');

// const {
//     handleImage
// } = require('../middlewares/imageMiddlewares');


// const multer = require('multer');
// // Diretório para salvar temporariamente as imagens
// const destTempDir = "temp"
// // Caminho temporário completo
// const destTempPath = `./${destTempDir}`
// const upload = multer({
//     dest: destTempPath
// })

const router = new Router();

router.get('/posts', checkToken, postController.getAllPosts);

router.post('/user/newpost', checkToken, postController.createPost);
// router.post('/user/newpost', checkToken, upload.single('image'), handleImage, postController.createPost);

router.get('/:login/posts', checkToken, postController.getUserPosts);

router.delete('/user/:postId', checkToken, postController.deletePost);

module.exports = router;