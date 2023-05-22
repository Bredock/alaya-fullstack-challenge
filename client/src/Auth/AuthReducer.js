import { LOGIN, REGISTER } from './AuthActions';
// Initial State
const initialState = { user: {}, token: '' };

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        user: action.user,
        token: action.token,
      };

    case REGISTER:
      return {
        user: action.user,
        token: action.token,
      };

    default:
      return state;
  }
};


// Export Reducer
export default AuthReducer;