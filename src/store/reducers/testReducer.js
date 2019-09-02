const initState = {
    activeTest: null
}

const testReducer = (state=initState, action) => {
    switch (action.type) {
        case "SET_ACTIVE_TEST":
            return {
                ...state,
                activeTest: action.test
            };
        case "UPDATE_ACTIVE_TEST_RESPONSE":
            return {
                ...state,
                activeTest: {
                    ...state.activeTest,
                    items: state.activeTest.items.map(item => {
                        return item.id === action.response.itemId ? {...item, response: action.response.value} : {...item}
                    })                   
                }
            }
        default:
            return state;
    }
}

export default testReducer;