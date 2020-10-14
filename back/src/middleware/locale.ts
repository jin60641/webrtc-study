import {
  Context,
} from 'koa';
import {
  initializeI18n,
} from 'utils/i18next';

export default async (ctx: Context, next: () => Promise<any>) => {
  const locale = ctx.header['x-user-locale'];
  initializeI18n(locale);
  await next();
};
