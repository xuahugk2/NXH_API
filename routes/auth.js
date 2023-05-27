import express from 'express';
import controller from '../controllers/auth.js';

const router = express.Router();

router.route('/login')
    .post(controller.login);

router.route('/register')
    .post(controller.register);

router.route('/forgot-password')
    .post(controller.forgotPwd);

export default router;
