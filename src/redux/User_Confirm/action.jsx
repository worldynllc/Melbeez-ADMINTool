import { UserConfirmActionTypes } from "./actionType";

export const addConfirmUserdata = (confirmUserObj) => {
    return {
        type: UserConfirmActionTypes.ADD_CONFIRMUSER,
        payload: confirmUserObj
    };
};

