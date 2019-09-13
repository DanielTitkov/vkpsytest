import appConfig from "../../config/appConfig"
import axios from 'axios';

export const getInventories = () => {
    return (dispatch, getState) => {
        const url = appConfig.API_URL;
        const { vkquery } = getState().validation;
        console.log("FROM ACTION", vkquery);
        axios.get(url + "inventories/", {
            params: vkquery.query
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