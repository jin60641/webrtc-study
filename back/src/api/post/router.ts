import Router from 'koa-router';
import {
  requireAuth,
} from 'utils/jwt';

import * as controller from './controller';

const router = new Router({
  prefix: '/post',
});

router.get('/', controller.getPosts);
router.post('/', requireAuth, controller.postPost);
router.delete('/:id', requireAuth, controller.deletePost);

export default router;
