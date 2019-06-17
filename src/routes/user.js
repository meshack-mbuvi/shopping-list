import {Router} from 'express';
import {UsersController} from '../controllers/user';

const router = Router ();

router.post ('/signup', UsersController.createUser);

export default router;
