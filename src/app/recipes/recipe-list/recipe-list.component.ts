import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RecipeService } from '../recipe.service';

import { Recipe } from '../recipe.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[];

  subscription: Subscription;
  constructor(private recipeService: RecipeService, 
  			  private router: Router,
  			  private route: ActivatedRoute) { }



  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();

    this.subscription = this.recipeService.recipesChanged.subscribe((newRecipe: Recipe[])=>{
      this.recipes = newRecipe;
    });
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  onNewRecipe(){
  	this.router.navigate(['new'], {relativeTo: this.route} );
  }
}
