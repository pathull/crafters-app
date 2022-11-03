import { Router } from 'express';

import { upload } from '../services/multer';
import { createNewPost, getAllPosts } from '../controllers/post-controllers';

const router = Router();

router.get('/:emailUser', getAllPosts);
router.post('/', upload.single('postPicture'), createNewPost);

export default router;
