import Router from 'koa-router';

import controller from './controller';

const router = new Router({ prefix: '/sub' });

router.get('/test', controller.test);

export default router;
