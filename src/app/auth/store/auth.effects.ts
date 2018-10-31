import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as AuthActions from './auth.actions'; 
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import { fromPromise } from 'rxjs/observable/fromPromise';
import * as firebase from 'firebase';

//all actions in our app: authAction & shoppingListAction
@Injectable()
export class AuthEffects {

    @Effect()
    authSignup = this.actions$// dispatch a new effect; emit action at the end of chain;;; if we want to dispatch new action to change the value of state in the store in the end
        .ofType(AuthActions.TRY_SIGNUP) //check if a certain action is accured
        .map(
            (action: AuthActions.TrySignup) => {
                return action.payload;
            }
        )
        .switchMap( // switch to a new observable
            (authData: {username:string, password:string})=>{
                return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.username,authData.password)); //automatically coverts this promise to Observable
            }
        )
        .switchMap(
            ()=>{
                return fromPromise(firebase.auth().currentUser.getIdToken());
            }
        )
        .mergeMap( //merge multiple observables into 1;;;; return multiple actions
            (token: string)=>{
                return [
                    {
                        type: AuthActions.SIGNUP
                    },
                    {
                        type: AuthActions.SET_TOKEN,
                        payload: token
                    }
                ];
            }
        );

    @Effect()
    authSignin = this.actions$
        .ofType(AuthActions.TRY_SIGNIN)
        .map(
            (action: AuthActions.TrySignup) => {
                return action.payload;
            }
        )
        .switchMap( // switch to a new observable
            (authData: {username:string, password:string})=>{
                return fromPromise(firebase.auth().signInWithEmailAndPassword(authData.username,authData.password)); //automatically coverts this promise to Observable
            }
        )
        .switchMap(
            ()=>{
                return fromPromise(firebase.auth().currentUser.getIdToken());
            }
        )
        .mergeMap( //merge multiple observables into 1;;;; return multiple actions
            (token: string)=>{
                this.router.navigate(['/']);
                return [
                    {
                        type: AuthActions.SIGNIN
                    },
                    {
                        type: AuthActions.SET_TOKEN,
                        payload: token
                    }
                ];
            }
        );

    @Effect({dispatch: false})
    authLogout = this.actions$
        .ofType(AuthActions.LOGOUT)
        .do(
            ()=>{
                this.router.navigate(['/']);
                firebase.auth().signOut();
            }
        )

    constructor(private actions$: Actions, private router: Router){}
}