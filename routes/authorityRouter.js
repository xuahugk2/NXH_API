import express from 'express';
import controller from '../controllers/authorityController.js';
import { authUser, authAdmin } from '../middleware/middleware.js';

const router = express.Router();

router.route('/list')
    .get(authUser, authAdmin, controller.getAll);

router.route('/create')
    .post(authUser, authAdmin, controller.create);

router.route('/:id')
    .delete(authUser, authAdmin, controller.delete);

export default router;
