import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';

import {
  Avatar,
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Lock } from '@material-ui/icons';
import Location from 'history';
import { useDispatch } from 'react-redux';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';

import useSignedIn from 'hooks/useSignedIn';
import userActions from 'store/user/actions';
import { SignInRequestPayload } from 'store/user/types';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    width: '100vw',
    height: '100vh',
    textAlign: 'center',
    top: 0,
    left: 0,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: { margin: theme.spacing(3, 0, 2) },
}));

const SignIn: React.FC<RouteComponentProps<{}, StaticContext, { from: Location }>> = (
  { location, history },
) => {
  const signedIn = useSignedIn();
  const classes = useStyles();
  const dispatch = useDispatch();
  const from = useMemo<Location | undefined>(() => location.state?.from, [location.state]);
  const [payload, setPayload] = useState<SignInRequestPayload>({
    email: '',
    password: '',
  });

  const handleChange = useCallback(({ target: { name, value } }) => {
    setPayload({
      ...payload,
      [name]: value,
    });
  }, [payload]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    dispatch(userActions.fetchSignIn.request(payload));
  }, [dispatch, payload]);

  useEffect(() => {
    if (signedIn) {
      history.replace(from || { pathname: '/' });
    }
  }, [signedIn, from, history]);

  return (
    <div className={classes.root}>
      <Container className={classes.content} component='main' maxWidth='xs'>
        <Avatar className={classes.avatar}>
          <Lock />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit}
        >
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            value={payload.email}
            onChange={handleChange}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            value={payload.password}
            onChange={handleChange}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign In
          </Button>
          <Box mt={5}>
            <Typography variant='body2' color='textSecondary' align='center'>
              {'Copyright © '}
              <Link color='inherit' href={process.env.REACT_APP_DOMAIN}>
                {process.env.REACT_APP_DOMAIN}
              </Link>
              {` ${new Date().getFullYear()}.`}
            </Typography>
          </Box>
        </form>
      </Container>
    </div>
  );
};

export default SignIn;
