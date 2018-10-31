import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';

import { HttpClient, HttpParams, HttpRequest } from "@angular/common/http";
import { Recipe } from "../recipe.model";

import * as RecipeActions from './recipes.actions';
import * as fromRecipe from './recipe.reducers';
import { Store } from "@ngrx/store";


@Injectable()
export class RecipeEffects {

    @Effect()
    recipeFetch = this.actions$
        .ofType(RecipeActions.FETCH_RECIPES)
        .switchMap((action: RecipeActions.FetchRecipes)=>{
            return this.httpClient.get<Recipe[]>('https://ng-shopping-app-2f2ea.firebaseio.com/recipes.json', {
                observe: 'body',
                responseType: 'json',
            })         
        }
        )
        .map(
            (recipes)=>{
                for(let recipe of recipes){
                    if(!recipe['ingredients']){
                        recipe['ingredients'] = [];
                    }
                }
                return {
                    type: RecipeActions.SET_RECIPES,
                    payload: recipes
                }      
            }          
        );
        
    @Effect({dispatch: false})
    recipeStore = this.actions$
        .ofType(RecipeActions.STORE_RECIPES)
        .withLatestFrom(this.store.select('recipes')) //Combine the returned observable to the Action
        .switchMap(
            ([action,state])=>{
                const req = new HttpRequest('PUT', 'https://ng-shopping-app-2f2ea.firebaseio.com/recipes.json', state.recipes, {reportProgress: true});
                return this.httpClient.request(req);
            }
        )


    constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store<fromRecipe.FeatureState>){}
}