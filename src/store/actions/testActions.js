export const setActiveTest = (test) => {
    return (dispatch, getState) => {
        dispatch({ type: "SET_ACTIVE_TEST", test: test })
    }
};