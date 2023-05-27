import express from 'express';
import controller from '../controllers/user.js';

const router = express.Router();

router.route('/list')
    .get(controller.getAllUser);

router.route('/create')
    .post(controller.create);

router.route('/:id')
    .delete(controller.delete)
    .put(controller.update);

export default router;
