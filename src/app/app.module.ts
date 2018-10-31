import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';


import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { reducers } from './store/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import { AuthEffects } from './auth/store/auth.effects';






@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [ //All exports of the other module stated here will be imports here
    BrowserModule, //contains commonModule and others
    HttpClientModule, //for interceptors
    SharedModule, // imported CommonModule, DropdownDirective
    AuthModule, //import FormsModule,AuthRoutingModule
    CoreModule, //   imported: AppRoutingModule, providers: services
    ShoppingListModule,
    StoreModule.forRoot(reducers), //initial setup of the store; shoppingList - reference to what state shoppingListReducer returns 
    EffectsModule.forRoot([AuthEffects]),//Effect is able to automatically detect the actions in our store
    StoreRouterConnectingModule, //for devtools
    !environment.production ? StoreDevtoolsModule.instrument() : [] // if in development only
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
