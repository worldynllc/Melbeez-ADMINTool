import { SearchingActionTypes } from "./actionType";

const INITIAL_STATE = {
    seachUserObj: {},
}

const SearchingUserReducer = (state = INITIAL_STATE, action)=> {
    switch (action.type) {
        case SearchingActionTypes.SEARCH_USER:
            return { ...state, seachUserObj: action.payload};
        default:
            return state;    
    }
};

export default SearchingUserReducer;