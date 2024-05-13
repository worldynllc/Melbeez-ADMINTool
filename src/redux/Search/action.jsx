import { SearchingActionTypes } from "./actionType";

export const SearchingUserdata = (seachUserObj) => {
    return {
        type: SearchingActionTypes.SEARCH_USER,
        payload: seachUserObj
    };
};