import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const AuthForm = ({ submitForm, isRegistering }) => {
  const classes = useStyles();

  const [state, setState] = useState({});

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
        ...state,
        [evt.target.name]: value
    });
  };

  const submit = () => {
    if (state.email && state.password) {
      submitForm(state);
    }
  };

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-12 col-lg-6'>
          <Paper elevation={3}>
            <div className={`${classes.root} d-flex flex-column my-4 w-100`}>
              <h3>{isRegistering ? "Register" : "Login"}</h3>
              <TextField variant='filled' label='Email' name='email' onChange={handleChange} />
              <TextField variant='filled' label='Password' name='password' type="password" onChange={handleChange} />
              <Button className="mt-4" variant="contained" color="primary" onClick={() => submit()} disabled={!state.email || !state.password}>
                {isRegistering ? "Register" : "Login"}
              </Button>
              {
                isRegistering ? "" : (
                    <p>Not register yet? <Link href='/register'>Register</Link></p>
                )
              }
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
};

AuthForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  isRegistering: PropTypes.bool.isRequired
};

export default AuthForm;
