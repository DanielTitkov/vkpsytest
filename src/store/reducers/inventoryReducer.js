const initState = {
    inventories: null,
    error: null,
    activeInventory: null,
    activeInventoryResponse: null,
    activeInventoryStatus: null,
    activeInventoryResult: null,
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
            if (action.inventory === null) {
                return {
                    ...state,
                    activeInventory: null,
                    activeInventoryStatus: null, 
                    activeInventoryResponse: null,
                    activeInventoryResult: null
                }
            }
            return {
                ...state,
                activeInventory: action.inventory,
                activeInventoryStatus: action.inventory.status ? action.inventory.status : "started",
                activeInventoryResponse: state.activeInventory && (action.inventory.id === state.activeInventory.id) ? (
                    state.activeInventoryResponse
                ) : (
                    null
                )
            };
        case "UPDATE_ACTIVE_INVENTORY_RESPONSE":
            return {
                ...state,
                activeInventoryStatus: "progress",
                activeInventoryResponse: {
                    ...state.activeInventoryResponse,
                    [action.response.questionId]: {
                        value: action.response.value,
                        item: action.response.itemId,
                        question: action.response.questionId,
                        inventory: state.activeInventory.id // get from reducer state
                        // user is set on backend via auth query
                    }
                }
            }
        case "SEND_ACTIVE_INVENTORY_RESPONSE_SUCCESS":
            return {
                ...state,
                activeInventoryStatus: "done"
            }
        case "SEND_ACTIVE_INVENTORY_RESPONSE_ERROR":
            return {
                ...state,
                error: action.error
            }
        case "GET_ACTIVE_INVENTORY_RESULT_SUCCESS":
            return {
                ...state,
                activeInventoryResult: action.result
            }
        case "GET_ACTIVE_INVENTORY_RESULT_ERROR":
            return {
                ...state,
                error: action.error
            }
        default:
            return state;
    }
}

export default inventoryReducer;