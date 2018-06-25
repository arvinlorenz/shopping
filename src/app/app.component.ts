import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loadedFeature = 'recipe';

  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyAj6J0533W20WaITn4XbQr54xO4YfhlldQ",
      authDomain: "ng-shopping-app-2f2ea.firebaseapp.com"
    });
  }
  onNavigate(feature:string){
  	this.loadedFeature =feature;
  }
}
