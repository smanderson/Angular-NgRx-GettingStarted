import { createAction, props } from '@ngrx/store';
import { Product } from '../product';

export const toggleProductCode = createAction(
    '[Product] Toggle Product Code'
);

export const setCurrentProduct = createAction(
    '[Product] Set Current Product',
    props<{ currentProductId: number }>()
);

export const clearCurrentProduct = createAction(
    '[Product] Clear Current Product'
);

export const initCurrentProduct = createAction(
    '[Product] Init Current Product'
);

export const loadProducts = createAction(
    '[Product] Load'
);

export const loadProductsSuccess = createAction(
    '[Product] Load Success',
    props<{ products: Product[] }>()
);

export const loadProductsError = createAction(
    '[Product] Load Error',
    props<{ error: string }>()
);

export const updateProduct = createAction(
    '[Product] Update',
    props<{ product: Product }>()
);

export const updateProductSuccess = createAction(
    '[Product] Update Success',
    props<{ product: Product }>()
);

export const updateProductError = createAction(
    '[Product] Update Error',
    props<{ error: string }>()
);

export const createProduct = createAction(
    '[Product] Create',
    props<{ product: Product }>()
);

export const createProductSuccess = createAction(
    '[Product] Create Success',
    props<{ product: Product }>()
);

export const createProductError = createAction(
    '[Product] Create Error',
    props<{ error: string }>()
);

export const deleteProduct = createAction(
    '[Product] Delete',
    props<{ productId: number }>()
);

export const deleteProductSuccess = createAction(
    '[Product] Delete Success'
);

export const deleteProductError = createAction(
    '[Product] Delete Error',
    props<{ error: string }>()
);