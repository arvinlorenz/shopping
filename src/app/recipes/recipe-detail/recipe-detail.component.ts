import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, Params } from '@angular/router';

import { Recipe } from '../recipe.model';

import { ShoppingListService } from '../../shopping-list/shopping-list.service'
import { RecipeService } from '../recipe.service'

import { Store } from '@ngrx/store';
import * as fromRecipe from '../store/recipe.reducers';
import * as RecipeActions from '../store/recipes.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeState: Observable<fromRecipe.State>;
  id: number;
  constructor(private shoppingListService:ShoppingListService,
              private recipeService:RecipeService,
              private router: Router,
              private route: ActivatedRoute,
              private store: Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          // this.recipe = this.recipeService.getRecipe(this.id);
          this.recipeState = this.store.select('recipes');
        }
      );

  }

  onAddToShoppingList(){
    this.store.select('recipes')
      .take(1) //only take 1 and stops listening to it; will not react to every state change but only once
      .subscribe((recipeState: fromRecipe.State)=>{
        this.shoppingListService.addIngredientFromRecipe(recipeState.recipes[this.id].ingredients);
      })
  	// this.shoppingListService.addIngredientFromRecipe(this.recipe.ingredients);
  }

  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe(){
    // this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'], {relativeTo: this.route});
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
  }

}
