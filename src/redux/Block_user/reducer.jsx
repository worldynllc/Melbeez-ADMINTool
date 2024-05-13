import { BlockUserActionTypes } from "./actionType";

const INITIAL_STATE = {
    UserObj: {},
}

const blockUserReducer = (state = INITIAL_STATE, action)=> {
    switch (action.type) {
        case BlockUserActionTypes.ADD_BLOCKUSER:
            return { ...state, UserObj: action.payload};
        default:
            return state;    
    }
};

export default blockUserReducer;