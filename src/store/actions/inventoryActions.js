import appConfig from "../../config/appConfig"
import axios from 'axios';

export const getInventories = () => {
    return (dispatch, getState) => {
        const url = appConfig.API_URL;
        const { vkquery } = getState().validation;
        axios.get(url + "inventories/", {
            params: {
                ...vkquery.query,
            }
        })
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

export const setActiveInventory = (inventory) => {
    return (dispatch, getState) => {
        const { activeInventory } = getState().inventory;
        dispatch({
            type: "SET_ACTIVE_INVENTORY", 
            inventory: activeInventory && (activeInventory.id === inventory.id) ? activeInventory : inventory
        })
    }
};

export const updateActiveInventoryResponse = (response) => {
    return (dispatch, getState) => {
        dispatch({ type: "UPDATE_ACTIVE_INVENTORY_RESPONSE", response: response});
    }
};

export const sendActiveInventoryResponse = () => {
    return (dispatch, getState) => {
        const { activeInventory, activeInventoryResponse } = getState().inventory;
        const { vkquery } = getState().validation;
        const url = appConfig.API_URL;
        console.log(Object.values(activeInventoryResponse));
        axios.post(
            url + 'responses/', 
            { foo: "bar" }, 
            // {
            //     // headers: {
            //     //     'Content-Type': 'application/x-www-form-urlencoded',
            //     //     'Accept': 'application/json',
            //     // },
            //     params: {
            //         ...vkquery.query,
            //     }
            // }
        )
        .then(response => {
            dispatch({
                type: "SEND_ACTIVE_INVENTORY_RESPONSE_SUCCESS",
            })
        })
        .catch(err => {
            console.log(err)
            console.log(err.response.data)
            dispatch({
                type: "SEND_ACTIVE_INVENTORY_RESPONSE_ERROR",
                error: err
            })
        });
    }
}