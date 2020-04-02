import Router from 'koa-router';

import * as controller from './controller';

const router = new Router({
  prefix: '/user',
});

router.post('/signup', controller.signUp);
router.post('/signin', controller.signIn);

export default router;
