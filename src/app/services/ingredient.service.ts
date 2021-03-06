import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {IngredientView} from "../types/ingredient";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RecipeIngredient, RecipeIngredientView} from "../types/recipe-ingredient";
import {constants} from "../util/constants";

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private http: HttpClient,) {
  }

  public getIngredients(): Observable<Array<IngredientView>> {

    const url: string = environment.getIngredientList;

    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(constants.apiCredentials)});

    return this.http.get<IngredientView[]>(url, {headers});
  }

  public addIngredient(ingredientView: IngredientView): Observable<Object> {
    const url: string = environment.addIngredient;

    return this.http.post<IngredientView>(url, ingredientView, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate.',
        'Pragma': 'no-cache',
        'Expires': '0',
         Authorization: 'Basic ' + btoa(constants.apiCredentialsAdmin)
      }),
      observe: 'body',
    })

  }
}
