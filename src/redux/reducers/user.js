import { CLEAR_CURRENTUSER, SET_CURRENTUSER } from '../types';

const userReducer = (state = {}, action) => {
  switch (action?.type) {
      case SET_CURRENTUSER :
          localStorage.setItem('user', JSON.stringify(action?.payload));
          return action?.payload;
      case CLEAR_CURRENTUSER:
          localStorage.removeItem('user');
          return null;
      default:
          return JSON.parse(localStorage.getItem('user'));
  };
};

export default userReducer;