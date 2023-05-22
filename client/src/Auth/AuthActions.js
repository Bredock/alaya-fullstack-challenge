import { setToken } from '../util/auth';
import callApi from '../util/apiCaller';

// Export Constants
export const LOGIN = 'LOGIN';
export const REGISTER = 'REGISTER';

// Export Actions
export function login(user, token) {
  return {
    type: LOGIN,
    user,
    token,
  };
}

export function loginRequest(user) {
  return (dispatch) => {
    return callApi('users/login', 'post', {
      user: {
        email: user.email,
        password: user.password
      }
    }).then(res => {
      setToken(res.token);
      dispatch(login(res.user, res.token))
    });
  }
}

export function register(user, token) {
  return {
    type: REGISTER,
    user,
    token
  };
}

export function registerRequest(user) {
  return (dispatch) => {
    return callApi('users/register', 'post', {
      user: {
        email: user.email,
        password: user.password
      }
    }).then(res => {
      setToken(res.token);
      dispatch(register(res.user, res.token))
    });
  }
}
