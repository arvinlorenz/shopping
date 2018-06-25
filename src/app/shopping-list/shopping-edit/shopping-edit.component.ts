import { Component, OnInit, Output, ViewChild, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../../shared/ingredient.model';

import { ShoppingListService } from '../shopping-list.service';
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
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing
      .subscribe(
        (index: number)=>{
            this.editedItemIndex = index;
            this.editMode = true;
            this.editedItem = this.shoppingListService.getIngredient(index);
            this.ShoppingListForm.setValue({
              name: this.editedItem.name,
              amount: this.editedItem.amount
            })
          }
        );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onSubmitItem(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if(!this.editMode){
      
      this.shoppingListService.addIngredient(newIngredient);
      // const newIngredient = new Ingredient(this.ShoppingListForm.value.name,this.ShoppingListForm.value.amount)
      // this.shoppingListService.addIngredient(newIngredient);
    } 
    else{
      this.shoppingListService.updateIngredient(this.editedItemIndex,newIngredient);
    }
    this.editMode = false;
    form.reset();  


  }
  
  onClear(){
    this.editMode = false;
    this.ShoppingListForm.reset();
  }

  onDelete(){
    this.onClear();
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
  }
}
