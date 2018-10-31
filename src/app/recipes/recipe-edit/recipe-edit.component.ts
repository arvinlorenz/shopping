import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';


import { Store } from '@ngrx/store';
import * as fromRecipe from '../store/recipe.reducers';
import * as RecipeActions from '../store/recipes.actions';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;

  recipeForm: FormGroup;
  constructor(private route: ActivatedRoute,
              private router:Router,
              private store: Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
  	this.route.params
  		.subscribe(
  			(params: Params)=>{
  				this.id = +params['id'];
  				this.editMode = params['id'] != null; //return true if not equal to null
          this.initForm();
  			}
  		);   
  }

  getControls() {
    // recipeForm.get('ingredients').controls replaced by below code because building it causes error
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  private initForm() {
     let recipeName = '';
     let recipeImagePath = '';
     let recipeDescription = '';
     let recipeIngredients = new FormArray([]);
     if(this.editMode){
      
       this.store.select('recipes')
        .take(1)
        .subscribe(
          (recipeState:fromRecipe.State)=>{
            const recipe = recipeState.recipes[this.id];

            recipeName = recipe.name;
            recipeImagePath = recipe.imagePath;
            recipeDescription = recipe.description;

            if(recipe['ingredients']){
              for(let ingredient of recipe.ingredients){
                recipeIngredients.push(
                  new FormGroup({
                    'name': new FormControl(ingredient.name, Validators.required),
                    'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
                  })
                )
              }
            }
          }
        );
       //const recipe = this.recipeService.getRecipe(this.id);
       
     }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  onSubmit(){
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']
    //  );
    if(this.editMode){
      //this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      this.store.dispatch(new RecipeActions.UpdateRecipe({index: this.id, updatedRecipe:this.recipeForm.value}));
    }
    else{
      // this.recipeService.addRecipe(this.recipeForm.value);
      this.store.dispatch(new RecipeActions.AddRecipe(this.recipeForm.value));
    }

    this.router.navigate(['/recipes']);
  }

  onCancel(){
    this.router.navigate(['/recipes']);
  }

  onAddIngredient(){

    const control = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    });
  	(<FormArray>this.recipeForm.get('ingredients')).push(control);
  }

  onDeleteIngredient(index: number){
   (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
 }
