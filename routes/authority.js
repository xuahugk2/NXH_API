import express from 'express';
import controller from '../controllers/authority.js';

const router = express.Router();

router.route('/create')
    .post(controller.create);

export default router;
