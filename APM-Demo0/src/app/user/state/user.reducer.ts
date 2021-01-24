import { createAction, createReducer, on } from "@ngrx/store"

export const UserReducer = createReducer(
    {
        maskUserName: true
    },
    on(createAction('[User] Toggle Mask User Name'), state => ({
        ...state,
        maskUserName: !state.maskUserName
    }))
);