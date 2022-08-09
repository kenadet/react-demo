//equal to function authHeader()
import store from '../redux';
import axios from 'axios';
import { clearCurrentUser } from '../redux/actions/user';
import { history } from '../common/history';
import jwt_decode from "jwt-decode";


export const authHeaders = () => {
  const token= store.getState().user.token;

  const { exp } = jwt_decode(token)
  const expirationTime = (exp * 1000) - 60000
  if (Date.now() >= expirationTime) {
    store.dispatch(clearCurrentUser());
    history.push('/auth');
  }
  
  return {
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + token,
  };
};

// export const authHeaders = () => {
//     const currentUser= store.getState().user;
  
//     return {
//         'Content-Type': 'application/json',
//         'authorization': 'Bearer ' + currentUser.token,
//     };
//   };
  

export function handleResponseWithLoginCheck() {
    axios.interceptors.response.use(
        response => response,
        error => {
            const currentUser = store.getState().user;
            const isLoggedIn =  currentUser?.token;
            const status = error?.response?.status;

            if (isLoggedIn && [401,403].includes(status)) {
                store.dispatch(clearCurrentUser());
                history.push('/auth');
            }

            return Promise.reject(error);
        }
        );
    }