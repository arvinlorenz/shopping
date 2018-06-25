import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

export class ShoppingListService {
  constructor(){
  }
 ingredientsChanged = new Subject<Ingredient[]>();
 startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
  	new Ingredient('Apples',5),
  	new Ingredient('Tomatoes',10),

  ];

  getIngredients(){
  	return this.ingredients.slice();//get just a copy
  }

  getIngredient(index: number){
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient){
  	this.ingredients.push(ingredient);
  	this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredientFromRecipe(ingredientArray: Ingredient[]){
    this.ingredients.push(...ingredientArray);
  }

  updateIngredient(index: number, newIngredient:Ingredient){
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number){
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}