import { Ingredient } from '../shared/ingredient.model';
import { Store } from '@ngrx/store';


import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducers';
import { Injectable } from '@angular/core';
@Injectable()
export class ShoppingListService {
 
  constructor(private store: Store<fromApp.AppState>) { }
  
//  ingredientsChanged = new Subject<Ingredient[]>();
//  startedEditing = new Subject<number>();

//   private ingredients: Ingredient[] = [
//   	new Ingredient('Apples',5),
//   	new Ingredient('Tomatoes',10),

//   ];

  
  // getIngredients(){
  // 	return this.ingredients.slice();//get just a copy
  // }
  //no need any more because of the store

  // getIngredient(index: number){
  //   return this.ingredients[index];
  // }

  // addIngredient(ingredient: Ingredient){
  // 	this.ingredients.push(ingredient);
  // 	this.ingredientsChanged.next(this.ingredients.slice());
  // }
  //no need any more because of the store

  addIngredientFromRecipe(ingredientArray: Ingredient[]){
    // this.ingredients.push(...ingredientArray);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredientArray));
  }

  // updateIngredient(index: number, newIngredient:Ingredient){
  //   this.ingredients[index] = newIngredient;
  //   this.ingredientsChanged.next(this.ingredients.slice());
  // }

  // deleteIngredient(index: number){
  //   this.ingredients.splice(index, 1);
  //   this.ingredientsChanged.next(this.ingredients.slice());
  // }
}