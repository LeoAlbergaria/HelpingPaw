const { Router } = require('express');
const userController = require('../controllers/UserController');

const router = new Router();

router.post('/register/user', userController.createUser);
router.post('/auth/login', userController.authUser);

module.exports = router;
