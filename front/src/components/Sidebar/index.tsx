import React from 'react';

import {
  Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core';
import {
  createStyles, makeStyles, Theme, useTheme,
} from '@material-ui/core/styles';
import {
  ChevronLeft, ChevronRight, PeopleAlt, Settings,
} from '@material-ui/icons';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';

import layoutActions from 'store/layout/actions';
import { RootState } from 'store/types';

const drawerWidth = 240;
const list = [{
  name: 'Users',
  icon: <PeopleAlt />,
}, {
  name: 'Constant',
  icon: <Settings />,
}];


const useStyles = makeStyles((theme: Theme) => createStyles({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
  },
}));

const selector = ({ layout: { drawer: isOpen } }: RootState) => isOpen;

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selector);
  const classes = useStyles();
  const theme = useTheme();

  const handleClickClose = () => {
    dispatch(layoutActions.toggleDrawer(false));
  };

  return (
    <Drawer
      variant='permanent'
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: isOpen,
        [classes.drawerClose]: !isOpen,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: isOpen,
          [classes.drawerClose]: !isOpen,
        }),
      }}
      open={isOpen}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleClickClose}>
          {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </div>
      <Divider />
      <List>
        {list.map(({ name, icon }) => (
          <ListItem button key={name}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={name} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
