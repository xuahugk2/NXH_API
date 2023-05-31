import express from 'express';
import controller from '../controllers/userController.js';
import { authUser, authAdmin } from '../middleware/middleware.js';

const router = express.Router();

router.route('/list')
    .get(controller.getAllUser);

router.route('/create')
    .post(authUser, authAdmin, controller.create);

router.route('/:id')
    .delete(authUser, authAdmin, controller.delete)
    .put(authUser, authAdmin, controller.update);

export default router;
