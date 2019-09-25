import appConfig from "../../config/appConfig"
import axios from 'axios';
import vkconnect from '@vkontakte/vk-connect';

export const getCurrentUser = () => {
    return (dispatch, getState) => {
        vkconnect.sendPromise('VKWebAppGetUserInfo', {})
        .then(data => {
            dispatch({ type: "GET_VK_USER_SUCCESS", user: data });
        })
        .catch(err => {
            dispatch({ type: "GET_VK_USER_ERROR", error: err });
        });
    }
};

export const sendCurrentUserData = () => {
    return (dispatch, getState) => {
        dispatch({ type: "SET_ACTIVE_PANEL" })
    }
};