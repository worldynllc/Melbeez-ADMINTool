import { ProductCategoryActionTypes } from "./actionType";

const INITIAL_STATE = {
    CategoryObj: {},
}

const product_categoryReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ProductCategoryActionTypes.ADD_PRODUCT:
            return { ...state, CategoryObj: action.payload };
        default:
            return state;
    }
}

export default product_categoryReducer;