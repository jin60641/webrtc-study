import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import routes from 'constants/routes';
import useSignedIn from 'hooks/useSignedIn';

const useStyles = makeStyles({ main: {} });

const Main: React.FC = () => {
  const signedIn = useSignedIn();
  const classes = useStyles();

  return (
    <div className={classes.main}>
      {routes
        .filter(({ RouteComponent }) => signedIn || !RouteComponent)
        .map(({ key }) => (
          <Link
            key={`main-link-${key}`}
            to={`/${key}`}
          >
            {key}
          </Link>
        ))}
    </div>
  );
};

export default Main;
