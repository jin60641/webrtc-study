import React from 'react';
import {
  useSelector, useDispatch,
} from 'react-redux';
import clsx from 'clsx';
import {
  createStyles, makeStyles, Theme,
} from '@material-ui/core/styles';
import {
  AppBar, Toolbar, IconButton, Typography,
} from '@material-ui/core';
import {
  Menu,
} from '@material-ui/icons';
import {
  RootState,
} from 'store/types';
import layoutActions from 'store/layout/actions';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => createStyles({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
}));

const selector = ({
  layout: {
    drawer: {
      isOpen,
    },
  },
}: RootState) => isOpen;

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selector);
  const classes = useStyles();

  const handleClickOpen = () => {
    dispatch(layoutActions.toggleDrawer(true));
  };

  return (
    <AppBar
      position='fixed'
      className={clsx(classes.appBar, {
        [classes.appBarShift]: isOpen,
      })}
    >
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          onClick={handleClickOpen}
          edge='start'
          className={clsx(classes.menuButton, {
            [classes.hide]: isOpen,
          })}
        >
          <Menu />
        </IconButton>
        <Typography variant='h6' noWrap>
          WEBRTC SAMPLE
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
