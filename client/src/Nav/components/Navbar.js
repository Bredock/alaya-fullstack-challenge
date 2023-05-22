import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";

function Navbar({ logout }) {
  const isLoged = useSelector(state => state.auth.token);
  const history = useHistory();

  const goHome = () => {
    history.push('/');
  }

  return (
    <AppBar position='fixed'>
      <Toolbar>
        <Typography variant='h6' className='flex-grow-1'>
          <Link className='text-white' href='#' onClick={goHome}>
            Home
          </Link>
        </Typography>
        <Typography variant='h6'>
          {isLoged ? (
              <Link href='/login' className='text-white' onClick={logout} >Logout</Link>
            ) : (
              <Link href='/login' className='text-white'>Login</Link>
          )}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
};

export default Navbar;
