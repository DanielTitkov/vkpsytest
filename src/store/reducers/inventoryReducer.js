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
                        value: action.response.value,
                        item: action.response.itemId,
                        user: 1, // MOCK DATA. maybe not send, extract from login.
                        question: action.response.questionId,
                        inventory: state.activeInventory.id // get from reducer state
                    }
                }
            }
        default:
            return state;
    }
}

export default inventoryReducer;