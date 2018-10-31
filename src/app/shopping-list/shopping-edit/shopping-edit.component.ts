import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../../shared/ingredient.model';

import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducers';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput') nameInput: ElementRef; //#nameInput in input html
  // @ViewChild('amountInput') amountInput: ElementRef;
  @ViewChild('f') ShoppingListForm: NgForm; //or just add the ngform in onAddItem
  subscription: Subscription;
  editMode: boolean = false;
  editedItem: Ingredient;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList')
      .subscribe(
        (data)=> {
          if(data.editedIngredientIndex > -1){
            this.editedItem = data.editedIngredient;
            this.editMode = true;
            this.ShoppingListForm.setValue({
              name: this.editedItem.name,
              amount: this.editedItem.amount
            })
          }
          else{
            this.editMode = false;
          }
        }
      );

  }

  ngOnDestroy(){
    this.store.dispatch(new ShoppingListActions.StopEdit());
    this.subscription.unsubscribe();
  }

  onSubmitItem(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if(!this.editMode){
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
      // this.shoppingListService.addIngredient(newIngredient);

      // const newIngredient = new Ingredient(this.ShoppingListForm.value.name,this.ShoppingListForm.value.amount)
      // this.shoppingListService.addIngredient(newIngredient);
    } 
    else{
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({ingredient: newIngredient}))
      // this.shoppingListService.updateIngredient(this.editedItemIndex,newIngredient);
    }
    this.editMode = false;
    form.reset();  


  }
  
  onClear(){
    this.editMode = false;
    this.ShoppingListForm.reset();
  }

  onDelete(){
    
    // this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }
}
