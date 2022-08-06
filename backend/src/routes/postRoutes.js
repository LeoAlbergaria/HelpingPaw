const {
    Router
} = require('express');
const postController = require('../controllers/PostController');
const {
    checkToken
} = require('../middlewares/tokenMiddlewares');

const router = new Router();

router.post('/user/newpost', checkToken, postController.createPost);

module.exports = router;