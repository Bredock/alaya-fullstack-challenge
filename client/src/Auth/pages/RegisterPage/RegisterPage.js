import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import AuthForm from '../../components/AuthForm';
import { registerRequest } from '../../AuthActions';

const LoginPage = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (user) => {
    dispatch(registerRequest(user));
    history.push('/');
  }

  return (
    <AuthForm submitForm={handleSubmit} isRegistering={true}/>
  )
};

export default LoginPage;