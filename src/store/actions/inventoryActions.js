import appConfig from "../../config/appConfig"
import axios from 'axios';

export const getInventories = () => {
    return (dispatch, getState) => {
        const url = appConfig.API_URL;
        axios.get(url + "inventories/")
        .then(response => {
            dispatch({
                type: "GET_INVENTORIES_SUCCESS",
                inventories: response.data
            })
        })
        .catch(err => {
            dispatch({
                type: "GET_INVENTORIES_ERROR",
                error: err
            })
        });
    }
}