import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';


import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { shoppingListReducer } from './shopping-list/store/shopping-list.reducers';




@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [ //All exports of the other module stated here will be imports here
    BrowserModule, //contains commonModule and others
    HttpClientModule,
    SharedModule,
    AuthModule,
    CoreModule, //   imported: AppRoutingModule, providers: services
    ShoppingListModule,
    StoreModule.forRoot({shoppingList: shoppingListReducer})
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
