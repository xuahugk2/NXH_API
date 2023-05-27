import express from 'express';
import controller from '../controllers/user.js';

const router = express.Router();

router.route('/auth/login')
    .post(controller.login);

router.route('/auth/register')
    .post(controller.register);

router.route('/auth/forgot-password')
    .post(controller.forgotPwd);

router.route('/users/list')
    .get(controller.getAllUser);

router.route('/users/create')
    .post(controller.create);

router.route('/users/:id')
    .delete(controller.delete)
    .put(controller.update);

export default router;
