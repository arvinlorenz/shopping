import { Recipe } from "../recipe.model";
import { Ingredient } from "../../shared/ingredient.model";

import * as RecipeActions from './recipes.actions';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState { //also gets the property of AppState
    recipes: State
}
export interface State  {
    recipes: Recipe[];
}

const initialState: State = { 
    recipes: [
        new Recipe(
            'A Test Recipe', 
            'This is simply a test', 
            'https://static01.nyt.com/images/2015/08/14/dining/14ROASTEDSALMON/14ROASTEDSALMON-articleLarge.jpg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 20)
            ]
            ),
        new Recipe(
            'A Test Recipe 2', 
            'This is simply a test 2', 
            'https://cdn3.tmbi.com/secure/RMS/attachments/37/300x300/exps25157_FM153592B03_18_12b.jpg',
            [
                new Ingredient('Carrot', 1),
                new Ingredient('Kamote', 20)
            ]
            ),
    ]
};
export function recipeReducer(state=initialState,action: RecipeActions.RecipeActions){

    switch(action.type){
        case RecipeActions.SET_RECIPES:
            return{
                ...state,
                recipes: [...action.payload]
            };

        case RecipeActions.ADD_RECIPE:
            return{
                ...state,
                recipes: [...state.recipes, action.payload]
            }
        
        case RecipeActions.UPDATE_RECIPE:
            let UpdatedRecipes = [ ...state.recipes];
            UpdatedRecipes[action.payload.index] = action.payload.updatedRecipe;
            return{
                ...state,
                recipes: UpdatedRecipes
            }

        case RecipeActions.DELETE_RECIPE:
            const UpdatedRecipesForDelete = [...state.recipes];
            UpdatedRecipesForDelete.splice(action.payload, 1);
            return{
                ...state,
                recipes: UpdatedRecipesForDelete
            }
        
        default:
            return state;
    }
    
}