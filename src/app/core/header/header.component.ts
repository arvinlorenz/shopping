import {Component, OnInit} from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';
import * as RecipeActions from '../../recipes/store/recipes.actions'
import * as fromRecipe from '../../recipes/store/recipe.reducers';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',

})
export class HeaderComponent implements OnInit{
	authState: Observable<fromAuth.State>;

	constructor(private store: Store<fromRecipe.FeatureState>){} //referenceName: State,
	
	ngOnInit(){
		this.authState = this.store.select('auth');
	}
	
	onSave(){
		// this.dataStorageService.storeRecipes()
		// 	.subscribe(
		// 		(response)=>console.log(response),
		// 		(error) => console.log(error)
		// 	);
		this.store.dispatch(new RecipeActions.StoreRecipes()); //only save in the online DB no need to change the State
	}

	

	onFetch(){
		//this.dataStorageService.getRecipes();
		this.store.dispatch(new RecipeActions.FetchRecipes());
	}

	onLogout(){
		// this.authService.logout();
		this.store.dispatch(new AuthActions.Logout());
	}

	// isAuthenticated() {
	// 	return this.authService.isAuthenticated();
	// }
}