export const setActiveTest = (test) => {
    return (dispatch, getState) => {
        const { activeTest } = getState().test;
        console.log("test", test)
        console.log("activeTest", activeTest)
        dispatch({
            type: "SET_ACTIVE_TEST", 
            test: activeTest && (activeTest.id === test.id) ? activeTest : test
        })
    }
};

export const updateActiveTestResponse = (response) => {
    return (dispatch, getState) => {
        dispatch({ type: "UPDATE_ACTIVE_TEST_RESPONSE", response: response});
    }
};