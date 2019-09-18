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
        const { 
            // activeInventory, 
            activeInventoryResponse 
        } = getState().inventory;
        // check response consistency?
        const { vkquery } = getState().validation;
        const url = appConfig.API_URL;
        axios.post(
            url + 'responses/', 
            Object.values(activeInventoryResponse), 
            {
                params: {
                    ...vkquery.query,
                }
            }
        )
        .then(response => {
            dispatch({
                type: "SEND_ACTIVE_INVENTORY_RESPONSE_SUCCESS",
            })
            dispatch(getActiveInventoryResult()) // asking server to get/create result for the test
        })
        .catch(err => {
            dispatch({
                type: "SEND_ACTIVE_INVENTORY_RESPONSE_ERROR",
                error: err
            })
        });
    }
}

export const getActiveInventoryResult = () => {
    return (dispatch, getState) => {
        const { activeInventory } = getState().inventory;
        const { vkquery } = getState().validation;
        const url = appConfig.API_URL;  
        axios.post(
            url + 'results/', 
            {
                inventory: activeInventory.id
            }, 
            {
                params: {
                    ...vkquery.query,
                }
            }           
        ) 
        .then(response => {
            dispatch({
                type: "GET_ACTIVE_INVENTORY_RESULT_SUCCESS",
                result: response.data
            })
        })
        .catch(err => {
            dispatch({
                type: "GET_ACTIVE_INVENTORY_RESULT_ERROR",
                error: err
            })
        })
    }
}