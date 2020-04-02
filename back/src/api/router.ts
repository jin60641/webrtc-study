import Router from 'koa-router';

import subRouter from './sub';

const router = new Router();

router.use(subRouter.routes());

export default router;
