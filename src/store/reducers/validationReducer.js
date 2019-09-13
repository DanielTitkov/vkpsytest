const initState = {
    vkquery: null
}

const validationReducer = (state=initState, action) => {
    switch (action.type) {
        case "GET_VK_QUERY":
            return {
                ...state,
                vkquery: {
                    query: action.query,
                    hash: action.hash
                }
            }
        default:
            return state;
    }
}

export default validationReducer;