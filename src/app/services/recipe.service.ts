import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {RecipeView} from "../types/recipe";
import {environment} from "../../environments/environment";
import {RecipeIngredient, RecipeIngredientView} from "../types/recipe-ingredient";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(
    private http: HttpClient,
  ) {
  }

  public getRecipes(): Observable<Array<RecipeView>> {

    const url: string = environment.getRecipeList;

    return this.http.get<RecipeView[]>(url);

    /*return Observable.create(observer => {
      this.http.get(url, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate.',
          'Pragma': 'no-cache',
          'Expires': '0'
        }),
        observe: 'body'
      })
        .subscribe(
          (res: Array<RecipeView>) => {
            const recipes: Array<RecipeView> = [];
            res = res ? res : [];
            res.forEach(
              (recipe: Recipe) => {
                recipes.push(new RecipeView(recipe));
              });

            observer.next(recipes);
            observer.complete();
          },
          (error) => {
            console.log(JSON.stringify(error));
            observer.error(error);
            observer.complete();
          }
        )


    })*/
  }

  public getRecipeWithIngredients(): Observable<Array<RecipeIngredientView>> {

    const url: string = environment.allRecipesWithIngredientList;

    return this.http.get<RecipeIngredientView[]>(url);
  }

  public deleteRecipe(recipeId: number): Observable<any> {

    const url: string = environment.deleteRecipe + recipeId;

    return this.http.get<any>(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate.',
        'Pragma': 'no-cache',
        'Expires': '0'
      }),
      observe: 'body'
    })

  }


  public getRecipeWithIngredientsById(id: number): Observable<RecipeIngredientView> {

    const url: string = environment.getRecipeIngredientsByRecipeId + id;

    return this.http.get<RecipeIngredientView>(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate.',
        'Pragma': 'no-cache',
        'Expires': '0'
      }),
      observe: 'body'
    })
  }

  public getRecipeWithIngredientsByIngredients(selectedIngredients: Array<string>,
                                               unselectedIngredients: Array<string>): Observable<Array<RecipeIngredientView>> {
    const url: string = environment.allRecipesWithIngredientListByIngredient;

    return this.http.get<RecipeIngredientView[]>(`${url}/` + `?selectedIngredients=` + `${selectedIngredients}` + `&` + `unselectedIngredients=` + `${unselectedIngredients}`);
  }

  public addRecipe(recipeIngredient: RecipeIngredient): Observable<Object> {
    const url: string = environment.addRecipe;

    //return this.http.post<RecipeIngredient>(url, JSON.stringify(recipeIngredient));
    console.log(JSON.stringify(recipeIngredient));

    return this.http.post<RecipeIngredientView>(url, recipeIngredient, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate.',
        'Pragma': 'no-cache',
        'Expires': '0'
      }),
      observe: 'body',
    })

  }
}
