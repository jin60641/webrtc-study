import React from 'react';
import {
  CssBaseline,
} from '@material-ui/core';
import {
  createStyles, makeStyles, Theme,
} from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Header from 'components/Header';
import Alert from 'components/Alert';
import Main from 'pages/Main';
import routes from 'constants/routes';

import 'vendor';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <Router>
        <Header />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route
              exact
              path='/'
              component={Main}
            />
            {routes.map(({
              key,
              RouteComponent = Route,
              ...props
            }) => (
              <RouteComponent
                key={`app-route-${key}`}
                path={`/${key}`}
                {...props}
              />
            ))}
            <Redirect to='/' />
          </Switch>
        </main>
      </Router>
      <Alert />
    </>
  );
};

export default App;
