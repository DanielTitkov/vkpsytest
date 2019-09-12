const initState = {
    inventories: [],
    error: null
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
        default:
            return state;
    }
}

export default inventoryReducer;