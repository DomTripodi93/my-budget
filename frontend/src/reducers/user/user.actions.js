import UserActionTypes from './user.types';
import axios from 'axios';
import helpers from '../../shared/helpers';

const helper = new helpers();
const ROOT_URL = 'http://localhost:5000/api';

export const registerUser = (user, callback) => {
    user.name = helper.capitalizeAll(user.name);

    axios.post(`${ROOT_URL}/auth/register`, user).then(() => callback());
    return {
        type: UserActionTypes.REGISTER_USER
    }
};

export const signInUser = (user, callback) => {
    return dispatch => {
        axios.post(`${ROOT_URL}/auth/login`, user)
            .then(response => {
                dispatch(setUserData(response.data));
                callback();
            })
    }
};

export const setUserData = (user) => {
    if (user.access_token){
        user.accessToken = user.access_token;
    }
    localStorage.setItem('accessToken', user.accessToken);

    if (user.refresh_token){
        user.refreshToken = user.refresh_token;
    } else {
        user.refreshToken = localStorage.getItem('refreshToken');
    }
    localStorage.setItem('refreshToken', user.refreshToken);

    localStorage.setItem('id', user.id);

    return {
        type: UserActionTypes.SIGNIN_USER,
        payload: {
            token: user.accessToken,
            refresh: user.refreshToken,
            id: user.id
        }
    };
};

export const signOutUser = (callback) => {
    localStorage.setItem('accessToken', "");
    localStorage.setItem('refreshToken', "");
    localStorage.setItem('id', "");
    callback();

    return {
        type: UserActionTypes.SIGNOUT_USER
    };
};

export const checkUser = (id, token) => {
    return dispatch => {
        axios.get(`${ROOT_URL}/user/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(() => {
                dispatch(
                    setUserData({
                        accessToken: token,
                        id: id
                    })
                )
            })
            .catch(() => {
                dispatch(
                    signOutUser(() => { })
                )
            });
    }
}