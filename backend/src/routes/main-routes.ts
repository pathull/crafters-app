import { Router } from 'express';

import { mainController } from '../controllers/main-controllers';

const router = Router();

router.get('/', mainController);

export default router;
