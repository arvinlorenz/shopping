import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';

export class RecipeService {


	recipesChanged = new Subject<Recipe[]>();
	
	
  private recipes: Recipe[] = [
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
  ];


//   getRecipes(){
//   	return this.recipes.slice();//get just a copy
//   }


//   getRecipe(index:number){
//     return this.recipes[index];
//   }

	// addRecipe(recipe: Recipe){
	// 	this.recipes.push(recipe);
	// 	this.recipesChanged.next(this.recipes.slice());
	// }

	// updateRecipe(index: number, newRecipe: Recipe){
	// 	this.recipes[index] = newRecipe; //not the original array of recipe is reflected in the html so make subject of changes to emit
	// 	this.recipesChanged.next(this.recipes.slice());
	// }

	// deleteRecipe(index: number){
	// 	this.recipes.splice(index,1);
	// 	this.recipesChanged.next(this.recipes.slice());
	// }

	setRecipes(newRecipes: Recipe[]){
		this.recipes = newRecipes;
		this.recipesChanged.next(this.recipes.slice());
	}
}	