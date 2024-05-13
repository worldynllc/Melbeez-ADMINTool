import { adminActionTypes } from "./actionType";

export const addAdminData = (adminObj) => {
  return {
    type: adminActionTypes.ADD_ADMIN,
    payload: adminObj,
  };
};
