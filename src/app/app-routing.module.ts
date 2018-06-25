import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

import { AuthGuard } from './auth/auth-guard.service';





const appRoutes: Routes = [
//   { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'recipes', loadChildren: './recipes/recipes.module#RecipeModule', canLoad: [AuthGuard]},
  { path: 'shopping-list', component: ShoppingListComponent },

 
  
];

@NgModule({
	imports: [
	RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
	],

	exports: [RouterModule]
})

export class AppRoutingModule {
	
	constructor() {
	}
}