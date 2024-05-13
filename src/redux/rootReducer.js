import {all} from "redux-saga/effects";
import {combineReducers} from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
// import {customersSlice} from "../app/modules/ECommerce/_redux/customers/customersSlice";
// import {productsSlice} from "../app/modules/ECommerce/_redux/products/productsSlice";
// import {remarksSlice} from "../app/modules/ECommerce/_redux/remarks/remarksSlice";
// import {specificationsSlice} from "../app/modules/ECommerce/_redux/specifications/specificationsSlice";
import profileReducer from "./slice/myProfile"
import adminReducer from "./Admin/reducer";
import blockUserReducer from "./Block_user/reducer";
import product_categoryReducer from "./Category/reducer";
import ConfirmUserReducer from "./User_Confirm/reducer";
import SearchingUserReducer from "./Search/reducer";
export const rootReducer = combineReducers({
  auth: auth.reducer,
  // customers: customersSlice.reducer,
  // products: productsSlice.reducer,
  // remarks: remarksSlice.reducer,
  // specifications: specificationsSlice.reducer,
  profile: profileReducer, 
  adminDataObj: adminReducer,
  blockUserDataObj: blockUserReducer,
  CategoryProductObj: product_categoryReducer,
  ConfirmUserObjred :ConfirmUserReducer,
  SearchingUserRed : SearchingUserReducer
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
