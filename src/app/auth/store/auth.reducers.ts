import { Action } from "@ngrx/store";
import * as AuthActions from "./auth.actions";


export interface State  {
    token: string,
    authenticated: boolean
}

const initialState: State = { 
    token: null,
    authenticated: false


};

export function AuthReducer(state = initialState, action:AuthActions.AuthAction)
{
    switch(action.type){
        case AuthActions.SIGNUP:
        case AuthActions.SIGNIN:
            return {
                ...state,
                authenticated: true
            };
        case AuthActions.LOGOUT:
            return {
                ...state,
                token: null,
                authenticated: false
            }
        case AuthActions.SET_TOKEN:
            return{
                ...state,
                token: action.payload,
            }
        default:
        return state;
    }
}