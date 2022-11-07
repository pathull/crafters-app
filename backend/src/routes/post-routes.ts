import { Router } from 'express';

import { upload } from '../services/multer';
import { createNewPost, getAllPosts, getSinglePost } from '../controllers/post-controllers';

const router = Router();

router.get('/:emailUser', getAllPosts);
router.post('/', upload.single('postPicture'), createNewPost);
router.get('/single-post/:idPost', getSinglePost);

export default router;
