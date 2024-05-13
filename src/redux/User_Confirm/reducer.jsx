import { UserConfirmActionTypes } from "./actionType";

const INITIAL_STATE = {
    confirmUserObj: {},
}

const ConfirmUserReducer = (state = INITIAL_STATE, action)=> {
    switch (action.type) {
        case UserConfirmActionTypes.ADD_CONFIRMUSER:
            return { ...state, confirmUserObj: action.payload};
        default:
            return state;    
    }
};

export default ConfirmUserReducer;