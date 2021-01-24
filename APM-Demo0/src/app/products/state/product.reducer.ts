import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import *  as AppState from 'src/app/state/app.state';
import { Product } from '../product';
import * as ProductActions from './product.actions';

export interface State extends AppState.State {
    products: ProductState;
};

export interface ProductState {
    showProductCode: boolean;
    currentProduct: Product;
    products: Product[];
    error: string;
};

const intitialState: ProductState = {
    showProductCode: true,
    currentProduct: null,
    products: [],
    error: ''
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

export const getError = createSelector(
    getProductFeatureState,
    state => state.error
);

export const productReducer = createReducer<ProductState>(
    intitialState,
    on(ProductActions.toggleProductCode, (state: ProductState): ProductState => ({
        ...state,
        showProductCode: !state.showProductCode
    })),
    on(ProductActions.setCurrentProduct, (state: ProductState, action): ProductState => ({
        ...state,
        currentProduct: action.product
    })),
    on(ProductActions.clearCurrentProduct, (state: ProductState): ProductState => ({
        ...state,
        currentProduct: null
    })),
    on(ProductActions.initCurrentProduct, (state: ProductState): ProductState => ({
        ...state,
        currentProduct: {
            id: 0,
            productName: '',
            productCode: 'New',
            description: '',
            starRating: 0
        }
    })),
    on(ProductActions.loadProductsSuccess, (state: ProductState, action): ProductState => ({
        ...state,
        products: action.products,
        error: ''
    })),
    on(ProductActions.loadProductsError, (state: ProductState, action): ProductState => ({
        ...state,
        products: [],
        error: action.error
    }))
);
