import React from 'react';
import { Link as RouterLink } from "react-router-dom";

import { AppBar, Toolbar, Typography, makeStyles, Link } from '@material-ui/core';
import { EmojiEmotions } from '@material-ui/icons';

const useStyles = makeStyles(theme =>({
  title: {
    marginLeft: theme.spacing(1.25)
  }
}))

const Nav = () => {
  const classes = useStyles();
  const currentPath = '/'; // router.pathname.replace(/\//g, '') || 'home'

  return (
    <AppBar color='primary' position='fixed'>
      <Toolbar>
        <EmojiEmotions />
        <Typography onClick={() => {}} variant='h6' component='h1' className={classes.title}  style={{ marginRight: '16px', cursor:'pointer' }}>
          PoapMan
        </Typography>
        <nav className={currentPath}>
          <RouterLink to="/">
            <Link style={{ marginRight: '8px' }} color="secondary" underline={currentPath === 'home' ? 'always' : 'hover'}>Dashboard</Link>
          </RouterLink>
          <RouterLink to="/create">
            <Link style={{ marginRight: '8px' }} color="secondary" underline={currentPath === 'create' ? 'always' : 'hover'}>Create</Link>
          </RouterLink>
          <RouterLink to="/manage">
            <Link style={{ marginRight: '8px' }} color="secondary" underline={currentPath === 'manage' ? 'always' : 'hover'}>Manage</Link>
          </RouterLink>
        </nav>
      </Toolbar>
    </AppBar>
  );
}

export default Nav;