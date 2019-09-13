const initState = {
    inventories: null,
    error: null,
    activeInventory: null,
    activeInventoryResponse: null
}

const inventoryReducer = (state=initState, action) => {
    switch (action.type) {
        case "GET_INVENTORIES_SUCCESS":
            return {
                ...state,
                inventories: action.inventories
            };
        case "GET_INVENTORIES_ERROR":
            return {
                ...state,
                error: action.error
            };
        case "SET_ACTIVE_INVENTORY":
            return {
                ...state,
                activeInventory: action.inventory,
                activeInventoryResponse: state.activeInventory && (action.inventory.id === state.activeInventory.id) ? (
                    state.activeInventoryResponse
                ) : (
                    null
                )
            };
        case "UPDATE_ACTIVE_INVENTORY_RESPONSE":
            return {
                ...state,
                activeInventoryResponse: {
                    ...state.activeInventoryResponse,
                    [action.response.questionId]: {
                        response: action.response.value,
                        itemId: action.response.itemId
                    }
                }
            }
            // return {
            //     ...state,
            //     activeInventory: {
            //         ...state.activeInventory,
            //         items: state.activeInventory.items.map(item => {
            //             return item.id === action.response.itemId ? {...item, response: action.response.value} : {...item}
            //         })                   
            //     }
            // }
        default:
            return state;
    }
}

export default inventoryReducer;