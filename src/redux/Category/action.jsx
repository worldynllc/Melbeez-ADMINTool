import { ProductCategoryActionTypes } from "./actionType";

export const addCategoriesData = (CategoryObj) => {
    return {
        type: ProductCategoryActionTypes.ADD_PRODUCT,
        payload: CategoryObj
    }
}