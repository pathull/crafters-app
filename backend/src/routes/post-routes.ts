import { Router } from 'express';

import { upload } from '../services/multer';
import { createNewPost } from '../controllers/post-controllers';

const router = Router();

router.post('/', upload.single('postPicture'), createNewPost);

export default router;
