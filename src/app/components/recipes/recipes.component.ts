import {Component, EventEmitter, OnInit} from '@angular/core';
import {RecipeService} from "../../services/recipe.service";
import {MatTableDataSource,} from "@angular/material";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {RecipeIngredientView} from "../../types/recipe-ingredient";
import {DataService} from "../../services/data.service";
import {QueryType} from "../../enum/QueryType.enum";
import {ActivatedRoute, Router} from "@angular/router";
import {EmitterService} from "../../services/emitter.service";
import {RandomRecipe} from "../../types/random-recipe";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  animations:
    [
      trigger('detailExpand', [
        state('collapsed', style({height: '0px', minHeight: '0'})),
        state('expanded', style({height: '*'})),
        transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      ]),
    ],
})
export class RecipesComponent implements OnInit {

  private _dataSource: MatTableDataSource<RecipeIngredientView> = null;

  public columnsToDisplay: Array<string> = ['recipeName', 'buttons'];

  selectedIngredientOnParent: string[];

  unSelectedIngredientOnParent: string[];

  expandedElement: RecipeIngredientView | null;

  QueryType = QueryType; //to be able to use in html template

  showSearchFeature: boolean = true;

  randomRecipeId: number = 0;

  constructor(
    private recipeService: RecipeService,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.getRecipesWithIngredients();
    console.log("recipe component init");
    this.dataService.currentSelected.subscribe(message => this.selectedIngredientOnParent = message);
    this.dataService.currentUnSelected.subscribe(message => this.unSelectedIngredientOnParent = message);
  }

  public getRecipesWithIngredients() {
    this.recipeService.getRecipeWithIngredients().subscribe(
      (data: Array<RecipeIngredientView>) => {
        this.dataSource = new MatTableDataSource(data);
      },
      error => {
        console.error(error);
      }
    )
  }

  public getAllRecipesWithIngredientListByIngredient(selectedIngredients: Array<string>,
                                                     unselectedIngredients: Array<string>) {
    this.recipeService.getRecipeWithIngredientsByIngredients(selectedIngredients, unselectedIngredients).subscribe(
      (data: Array<RecipeIngredientView>) => {
        this.dataSource = new MatTableDataSource(data);
      },
      error => {
        console.error(error);
      }
    )
  }

  public onSearch() {
    this.showSearchFeature = true;
    if (this.selectedIngredientOnParent.length == 0 && this.unSelectedIngredientOnParent.length == 0) {
      this.getRecipesWithIngredients();
    } else {
      this.getAllRecipesWithIngredientListByIngredient(this.selectedIngredientOnParent, this.unSelectedIngredientOnParent);
    }
  }

  public onDelete(recipe: RecipeIngredientView) {

    this.recipeService.deleteRecipe(recipe.recipeId).subscribe(
      (data: any) => {
        this.onSearch();
      },
      error => {
        console.error(error);
      }
    )
  }

  public onAddRecipe() {
    this.router.navigate(['/addRecipe']).then(r => console.log("going to add recipe form: ", r));
  }

  public onAddIngredient() {
    this.router.navigate(['/addIngredient']).then(r => console.log("going to add ingredient form: ", r));
  }

  public onEditRecipe(recipeId : number) {
    const link = "/editRecipe/" + recipeId;
    this.router.navigate([link]).then(r => console.log("going to edit recipe form: ", r));
  }

  public onRandomRecipe() {
    this.randomRecipeId = this.getRandomInt(this.dataSource.data.length, 1);
    this.showSearchFeature = false;
    const randomRecipe: RandomRecipe = new RandomRecipe(this.randomRecipeId, true);
    EmitterService.get('reload').emit(randomRecipe);
  }

  public getRandomInt(max, min) {
    return Math.floor(Math.floor(Math.random() * ((max-min)+1) + min));
  }

  receiveMessage($event) {
    this.showSearchFeature = $event
  }

  public get dataSource(): MatTableDataSource<RecipeIngredientView> {
    return this._dataSource;
  }

  public set dataSource(value: MatTableDataSource<RecipeIngredientView>) {
    this._dataSource = value;
  }

}
