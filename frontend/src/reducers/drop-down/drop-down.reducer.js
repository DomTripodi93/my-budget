const INITIAL_STATE = {
    hidden: true
};

const DropDownAction = { TOGGLE_DROP_DOWN: 'TOGGLE_DROP_DOWN' };

export const toggleDropDown = () => {
    return { type: DropDownAction.TOGGLE_DROP_DOWN }
}

export const dropDownReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DropDownAction.TOGGLE_DROP_DOWN:
            return {
                ...state,
                hidden: !state.hidden
            }
        default:
            return state;
    }
}