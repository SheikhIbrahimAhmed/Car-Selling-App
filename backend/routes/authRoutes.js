const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/authController');
const loginMiddleware = require('../middleware/loginMiddleware');
const { createPost } = require('../controllers/postController');




router.post('/login', loginUser);
router.post('/create-post', loginMiddleware, createPost);

module.exports = router;
