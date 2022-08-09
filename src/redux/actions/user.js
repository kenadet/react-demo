import { CLEAR_CURRENTUSER, SET_CURRENTUSER } from '../types';

export const setCurrentUser = (user) => {
    return {
        type: SET_CURRENTUSER,
        payload: user,
    };
};

export const clearCurrentUser = () => {
    return {
        type: CLEAR_CURRENTUSER,
    };
};