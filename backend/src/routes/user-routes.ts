import { Router } from 'express';

import { getSingleUserInfo, postNewUser } from '../controllers/user-controllers';

const router = Router();

router.get('/:userEmail', getSingleUserInfo);
router.post('/', postNewUser);

export default router;
