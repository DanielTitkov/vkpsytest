export const setActivePanel = (panel) => {
    return (dispatch, getState) => {
        dispatch({ type: "SET_ACTIVE_PANEL", panel: panel })
    }
};