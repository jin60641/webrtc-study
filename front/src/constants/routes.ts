import { FC } from 'react';

import { Route as DefaultRoute, RouteProps } from 'react-router-dom';

import PrivateRoute from 'components/PrivateRoute';
import Call from 'pages/Call';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';

interface Route extends RouteProps {
  key: string;
  component: FC<any>;
  RouteComponent?: typeof DefaultRoute | typeof PrivateRoute;
}

const routes: Route[] = [{
  key: 'call',
  component: Call,
  RouteComponent: PrivateRoute,
}, {
  key: 'signin',
  component: SignIn,
}, {
  key: 'signup',
  component: SignUp,
}];

export default routes;
