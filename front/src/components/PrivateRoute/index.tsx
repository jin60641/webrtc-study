import React, { FC } from 'react';

import { Location } from 'history';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';

import useSignedIn from 'hooks/useSignedIn';

interface Props {
  component: FC<RouteComponentProps<any>>;
  location?: Location;
  path?: string | string[];
  exact?: boolean;
  sensitive?: boolean;
  strict?: boolean;
}

const PrivateRoute: FC<Props> = ({
  component: Component,
  ...props
}) => {
  const signedIn = useSignedIn();
  return (
    <Route
      {...props}
      render={(routeProps) => (signedIn ? <Component {...routeProps} /> : (
        <Redirect
          to={{
            pathname: '/signin',
            state: { from: routeProps.location },
          }}
        />
      ))}
    />
  );
};

export default PrivateRoute;
