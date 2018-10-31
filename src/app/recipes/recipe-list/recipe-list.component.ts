import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RecipeService } from '../recipe.service';

import { Recipe } from '../recipe.model';
import { Subscription, Observable } from 'rxjs';


import * as fromRecipe from '../store/recipe.reducers';
import * as ReducersAction from '../store/recipes.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipesState: Observable<fromRecipe.State>;

  subscription: Subscription;
  constructor(private recipeService: RecipeService, 
  			  private router: Router,
          private route: ActivatedRoute,
          private store: Store<fromRecipe.FeatureState>) { }



  ngOnInit() {
    //this.recipes = this.recipeService.getRecipes();
    
    // this.subscription = this.recipeService.recipesChanged.subscribe((newRecipe: Recipe[])=>{
    //   this.recipes = newRecipe;
    // });

    this.recipesState = this.store.select('recipes');
  }
  // ngOnDestroy(){
  //   this.subscription.unsubscribe();
  // }
  onNewRecipe(){
  	this.router.navigate(['new'], {relativeTo: this.route} );
  }
}
