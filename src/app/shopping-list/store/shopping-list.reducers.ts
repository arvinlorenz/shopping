import * as ShoppingListAction from './shopping-list.actions';

import { Ingredient } from "../../shared/ingredient.model";


export interface State  {
    ingredients: Ingredient[],
    editedIngredient: Ingredient,
    editedIngredientIndex: number
}

const initialState: State = { 
    ingredients: [
        new Ingredient('Apples',5),
        new Ingredient('Tomatoes',100)
    ],

    editedIngredient: null,
    editedIngredientIndex: -1
};
export function shoppingListReducer(state = initialState, action: ShoppingListAction.ShoppingListActions){
    switch(action.type){
        case ShoppingListAction.ADD_INGREDIENT:
        
            return { 
                ...state,//... will copy $state as a new obj
                ingredients: [...state.ingredients, action.payload]
            };
        case ShoppingListAction.ADD_INGREDIENTS:
            return{
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            }
        case ShoppingListAction.UPDATE_INGREDIENT:
            // const ingredient = state.ingredients[action.payload.index];
            // const updatedIngredient = {
            //     ...ingredient,
            //     ...action.payload.ingredient
            // };
            // const ingredients = [...state.ingredients];
            // ingredients[action.payload.index] = updatedIngredient;
            const ingredients = [...state.ingredients];
            ingredients[state.editedIngredientIndex] = action.payload.ingredient;
            return{
                ...state,
                ingredients: ingredients,
            }
        case ShoppingListAction.DELETE_INGREDIENT:
            const oldIngredients = [...state.ingredients];
            oldIngredients.splice(state.editedIngredientIndex,1);
           
            return {
                ...state,
                ingredients: oldIngredients

            }
        case ShoppingListAction.START_EDIT:
            const editIngredient = {...state.ingredients[action.payload]};
            

            return{
                ...state,
                editedIngredient: editIngredient,
                editedIngredientIndex: action.payload
            }
        case ShoppingListAction.STOP_EDIT:
            return{
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            }
        default:
            return state;
    }
}