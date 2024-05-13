import { BlockUserActionTypes } from "./actionType";

export const addBlockUserData = (UserObj) => {
    return {
        type: BlockUserActionTypes.ADD_BLOCKUSER,
        payload: UserObj
    };
};