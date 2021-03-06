import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, concatMap, map, mergeMap } from "rxjs/operators";
import { ProductService } from "../product.service";
import * as ProductActions from './product.actions';

@Injectable()
export class ProductEffects {
    constructor(private actions$: Actions,
                private productService: ProductService) {}

    loadProducts$ = createEffect(() => this.actions$.pipe(
        ofType(ProductActions.loadProducts),
        mergeMap(() => this.productService.getProducts().pipe(
            map(products => ProductActions.loadProductsSuccess({ products })),
            catchError(error => of(ProductActions.loadProductsError({ error })))
        ))
    ));

    updateProduct$ = createEffect(() => this.actions$.pipe(
        ofType(ProductActions.updateProduct),
        concatMap(action => this.productService.updateProduct(action.product).pipe(
            map(product => ProductActions.updateProductSuccess({ product })),
            catchError(error => of(ProductActions.updateProductError({ error })))
        ))
    ));

    addProduct$ = createEffect(() => this.actions$.pipe(
        ofType(ProductActions.createProduct),
        concatMap(action => this.productService.createProduct(action.product).pipe(
            map(product => ProductActions.createProductSuccess({ product })),
            catchError(error => of(ProductActions.createProductError({ error })))
        ))
    ));

    deleteProduct$ = createEffect(() => this.actions$.pipe(
        ofType(ProductActions.deleteProduct),
        concatMap(action => this.productService.deleteProduct(action.productId).pipe(
            map(_ => ProductActions.deleteProductSuccess()),
            catchError(error => of(ProductActions.deleteProductError({ error })))
        ))
    ));
}