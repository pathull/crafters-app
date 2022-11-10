import { Router } from 'express';

import { createNewComment, retrieveCommentsByPost } from '../controllers/comment-controllers';

const router = Router();

router.post('/', createNewComment);
router.get('/:idPost', retrieveCommentsByPost);

export default router;
