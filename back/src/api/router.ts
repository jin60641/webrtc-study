import Router from 'koa-router';

import userRouter from './user';
import postRouter from './post';

const router = new Router();

router.use(userRouter.routes());
router.use(postRouter.routes());

export default router;
