import { Router } from 'express';

import { upload } from '../services/multer';
import { createNewPost, getAllPosts, getSinglePost, deletePost } from '../controllers/post-controllers';

const router = Router();

router.get('/:emailUser', getAllPosts);
router.post('/', upload.single('postPicture'), createNewPost);
router.get('/single-post/:idPost', getSinglePost);
router.delete('/delete-post/:idPost', deletePost);

export default router;
