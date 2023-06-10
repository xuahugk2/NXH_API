import express from 'express';
import controller from '../controllers/codeController.js';
import { authUser, authAdmin } from '../middleware/middleware.js';

const router = express.Router();

router.route('/list')
    .get(authUser, authAdmin, controller.getAll);

router.route('/create')
    .post(authUser, authAdmin, controller.create);

export default router;
