import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import *  as AppState from 'src/app/state/app.state';
import { Product } from '../product';
import * as ProductActions from './product.actions';

export interface State extends AppState.State {
    products: ProductState;
};

export interface ProductState {
    showProductCode: boolean;
    currentProductId: number | null;
    products: Product[];
    error: string;
};

const intitialState: ProductState = {
    showProductCode: true,
    currentProductId: null,
    products: [],
    error: ''
};

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
    getProductFeatureState,
    state => state.showProductCode
);

export const getCurrentProductId = createSelector(
    getProductFeatureState,
    state => state.currentProductId
);

export const getCurrentProduct = createSelector(
    getProductFeatureState,
    getCurrentProductId,
    (state, currentProductId) => {
        if (currentProductId === 0) {
            return {
                id: 0,
                productName: '',
                productCode: 'New',
                description: '',
                starRating: 0
            };
        } else {
            return currentProductId ? state.products.find(x => x.id === state.currentProductId) : null;
        }
    }
);

export const getProducts = createSelector(
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
        currentProductId: action.currentProductId
    })),
    on(ProductActions.clearCurrentProduct, (state: ProductState): ProductState => ({
        ...state,
        currentProductId: null
    })),
    on(ProductActions.initCurrentProduct, (state: ProductState): ProductState => ({
        ...state,
        currentProductId: 0
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
    })),
    on(ProductActions.updateProductSuccess, (state: ProductState, action): ProductState => ({
        ...state,
        products: state.products.map(x => x.id === action.product.id ? action.product : x),
        currentProductId: action.product.id,
        error: ''
    })),
    on(ProductActions.updateProductError, (state: ProductState, action): ProductState => ({
        ...state,
        error: action.error
    })),
    on(ProductActions.createProductSuccess, (state: ProductState, action): ProductState => ({
        ...state,
        products: state.products.concat(action.product),
        currentProductId: action.product.id,
        error: ''
    })),
    on(ProductActions.createProductError, (state: ProductState, action): ProductState => ({
        ...state,
        error: action.error
    }))
);
