import { adminActionTypes } from "./actionType";

const INITIAL_STATE = {
  adminObj: {},
};

const adminReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case adminActionTypes.ADD_ADMIN:
      return { ...state, adminObj: action.payload };
    default:
      return state;
  }
};
export default adminReducer;
