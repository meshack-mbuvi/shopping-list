import userRoutes from './user';
import itemRoutes from './item';
import {Router} from 'express';

const router = Router ();

router.use ('/users', userRoutes);
router.use ('/items', itemRoutes);

export default router;
