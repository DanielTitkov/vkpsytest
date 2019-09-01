const initState = {
    activeTest: null
}

const testReducer = (state=initState, action) => {
    switch (action.type) {
        case "SET_ACTIVE_TEST":
            console.log("Setting active panel...", action.test.id);
            return {activeTest: action.test.id};
        default:
            return state;
    }
}

export default testReducer;