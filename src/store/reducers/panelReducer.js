const initState = {
    activePanel: 'home'
}

const panelReducer = (state=initState, action) => {
    switch (action.type) {
        case "SET_ACTIVE_PANEL":
            console.log("Setting active panel...", action.panel);
            return {activePanel: action.panel};
        default:
            return state;
    }
}

export default panelReducer;