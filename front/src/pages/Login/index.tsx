import React, {
  useState, useCallback,
} from 'react';
import {
  useDispatch,
} from 'react-redux';
import {
  Avatar,
  Button,
  TextField,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
} from '@material-ui/core';
import {
  makeStyles,
} from '@material-ui/core/styles';
import {
  Lock,
} from '@material-ui/icons';
import userActions from 'store/user/actions';
import {
  SignInRequestPayload,
} from 'store/user/types';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(0, 4),
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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [payload, setPayload] = useState<SignInRequestPayload>({
    email: '',
    password: '',
  });

  const handleChange = useCallback(({
    target: {
      name, value,
    },
  }) => {
    setPayload({
      ...payload,
      [name]: value,
    });
  }, [payload]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    dispatch(userActions.fetchSignIn.request(payload));
  }, [dispatch, payload]);

  return (
    <Grid container component='main' className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
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
            <Grid container>
              <Grid item xs>
                <Link href='https://jinsang.me' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href='https://jinsang.me' variant='body2'>
                  {'Don\'t have an account? Sign Up'}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Typography variant='body2' color='textSecondary' align='center'>
                {'Copyright © '}
                <Link color='inherit' href='https://jinsang.me'>
                  YOUR WEB
                </Link>
                {` ${new Date().getFullYear()}.`}
              </Typography>
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;
