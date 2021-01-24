import { createAction, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store'
import { User } from '../user';

export interface UserState {
    maskUserName: boolean,
    currentUser: User
};

const initialState: UserState = {
    maskUserName: true,
    currentUser: null
};

const userSelector = createFeatureSelector<UserState>('user');

export const UserReducer = createReducer(
    initialState,
    on(createAction('[User] Toggle Mask User Name'), (state: UserState): UserState => ({
        ...state,
        maskUserName: !state.maskUserName
    }))
);

export const getMaskUserName = createSelector(
    userSelector,
    userState => userState.maskUserName
);

export const currentUser = createSelector(
    userSelector,
    userState => userState.currentUser
);