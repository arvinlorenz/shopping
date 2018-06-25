import * as ShoppingListAction from './shopping-list.actions';

import { Ingredient } from "../../shared/ingredient.model";



const initialState = { 
    ingredients: [
        new Ingredient('Apples',5),
        new Ingredient('Tomatoes',100)
    ]
};
export function shoppingListReducer(state = initialState, action: ShoppingListAction.ShoppingListActions){
    switch(action.type){
        case ShoppingListAction.ADD_INGREDIENT:
            return { //... will copy $state as a new obj
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        default:
            return state;
    }
}