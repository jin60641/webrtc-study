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
import {
  useSelector,
} from 'react-redux';
import {
  RootState,
} from 'store/types';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import Alert from 'components/Alert';
import Login from 'pages/Login';
import Main from 'pages/Main';

import 'vendor';

const selector = ({
  user: {
    token,
  },
}: RootState) => ({
  hasToken: !!token,
});

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const App: React.FC = () => {
  const classes = useStyles();
  const {
    hasToken,
  } = useSelector(selector);

  return (
    <>
      <CssBaseline />
      <Router>
        {!hasToken ? (
          <>
            <Header />
            <Sidebar />
            <main className={classes.content}>
              <Switch>
                <Route path='/' exact component={Main} />
                <Redirect to='/' />
              </Switch>
            </main>
          </>
        ) : (
          <Login />
        )}
      </Router>
      <Alert />
    </>
  );
};

export default App;
