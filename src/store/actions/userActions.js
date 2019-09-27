import appConfig from "../../config/appConfig"
import axios from 'axios';
import vkconnect from '@vkontakte/vk-connect';

export const getCurrentUser = () => {
    return (dispatch, getState) => {
        vkconnect.sendPromise('VKWebAppGetUserInfo', {})
        .then(data => {
            console.log("USER", data)
            dispatch({ type: "GET_VK_USER_SUCCESS", user: data });
            dispatch(sendCurrentUserData()); // save user data to backend
        })
        .catch(err => {
            dispatch({ type: "GET_VK_USER_ERROR", error: err });
        });
    }
};

// {
//     "age": null,
//     "sex": "",
//     "city": "",
//     "country": "",
//     "timezone": ""
// }

export const sendCurrentUserData = () => {
    return (dispatch, getState) => {
        const { currentUser } = getState().user;
        const userData = {
            sex: currentUser.sex ? currentUser.sex : undefined,
            city: currentUser.city ? currentUser.city.title : undefined,
            timezone: currentUser.timezone ? currentUser.timezone : undefined,
            country: currentUser.country ? currentUser.country.title : undefined,
        };
        console.log("USER DATA", userData);
        const { vkquery } = getState().validation;
        const url = appConfig.API_URL;
        axios.post(
            url + 'accounts/profile/', 
            userData, 
            {
                params: {
                    ...vkquery.query,
                }
            }
        )
        .then(response => {
            dispatch({
                type: "SEND_USER_DATA_SUCCESS",
            })
        })
        .catch(err => {
            dispatch({
                type: "SEND_USER_DATA_ERROR",
                error: err
            })
        });
    }
};