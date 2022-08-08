const {
    Router
} = require('express');
const postController = require('../controllers/PostController');
const {
    checkToken
} = require('../middlewares/tokenMiddlewares');

const router = new Router();

router.post('/user/newpost', checkToken, postController.createPost);

router.get('/:login/posts', checkToken, postController.getUserPosts);

router.delete('/user/:postId', checkToken, postController.deletePost);

module.exports = router;