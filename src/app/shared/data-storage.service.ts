import { Injectable } from "@angular/core";
// import { Http, Response } from "@angular/http"; old http
import 'rxjs/Rx';
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { HttpClient, HttpRequest } from "@angular/common/http";


@Injectable()
export class DataStorageService {
    constructor(private httpClient: HttpClient,
                private recipeService: RecipeService){}

    storeRecipes(){
        
        // return this.httpClient.put('https://ng-shopping-app-2f2ea.firebaseio.com/recipes.json', this.recipeService.getRecipes(),
        // {
        //     observe: 'body',
        //     //headers: new HttpHeaders().set('Authorization', 'Bearer afdklasflaldf')
        //     params: new HttpParams().set('auth',token)
        // });

        //const req = new HttpRequest('PUT', 'https://ng-shopping-app-2f2ea.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {reportProgress: true});
        //return this.httpClient.request(req); //pass a configured request

    
    }

    getRecipes(){
        //  this.httpClient.get<Recipe[]>('https://ng-shopping-app-2f2ea.firebaseio.com/recipes.json?auth='+token)
        this.httpClient.get<Recipe[]>('https://ng-shopping-app-2f2ea.firebaseio.com/recipes.json', {
            observe: 'body',
            responseType: 'json',
        })
            .map(
                (recipes)=>{
                    for(let recipe of recipes){
                        if(!recipe['ingredients']){
                            recipe['ingredients'] = [];
                        }
                    }
                    return recipes;

            
                }
                
            )
            .subscribe(
                (recipes: Recipe[])=>{
                    
                    this.recipeService.setRecipes(recipes);
                }
            );
            // .subscribe((response: Response) =>{
            //     const recipes: Recipe[] = response.json();
            //     this.recipeService.setRecipes(recipes);
            // });
    }
}