import React from 'react';

import { CssBaseline } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';

import Alert from 'components/Alert';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import routes from 'constants/routes';
import Main from 'pages/Main';
import 'utils/socket';

import 'vendor';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: { display: 'flex' },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Router>
        <Header />
        <Sidebar />
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
    </div>
  );
};

export default App;
