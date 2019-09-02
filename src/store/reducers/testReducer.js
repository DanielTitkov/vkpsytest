const initState = {
    activeTest: null
}

const testReducer = (state=initState, action) => {
    switch (action.type) {
        case "SET_ACTIVE_TEST":
            return {activeTest: action.test};
        default:
            return state;
    }
}

export default testReducer;