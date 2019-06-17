import {Router} from 'express';
import {ItemsController} from '../controllers/item';

const router = Router ();

router.post ('/', ItemsController.createItem);

export default router;
