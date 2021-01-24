import { createAction, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import *  as AppState from 'src/app/state/app.state';
import { Product } from '../product';

export interface State extends AppState.State {
    products: ProductState;
};

export interface ProductState {
    showProductCode: boolean;
    currentProduct: Product;
    products: Product[];
};

const intitialState: ProductState = {
    showProductCode: true,
    currentProduct: null,
    products: []
};

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
    getProductFeatureState,
    state => state.showProductCode
);

export const getcurrentProduct = createSelector(
    getProductFeatureState,
    state => state.currentProduct
);

export const getproducts = createSelector(
    getProductFeatureState,
    state => state.products
);

export const productReducer = createReducer<ProductState>(
    intitialState,
    on(createAction('[Product] Toggle Product Code'), (state: ProductState): ProductState => ({
        ...state,
        showProductCode: !state.showProductCode
    }))
);
