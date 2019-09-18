import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RecipeIngredientView} from "../../types/recipe-ingredient";
import {RecipeService} from "../../services/recipe.service";
import {EmitterService} from "../../services/emitter.service";
import {RandomRecipe} from "../../types/random-recipe";

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  @Input() recipeId: number;

  @Output() messageToParentComponent = new EventEmitter<boolean>();

  public recipeIngredientView: RecipeIngredientView;

  private reloadEventEmitter: EventEmitter<any>;

  constructor(private recipeService: RecipeService) {

  }

  ngOnInit() {
    this.recipeIngredientView = new RecipeIngredientView(1, "", [], false);
    this.getRecipesById(this.recipeId);

    this.reloadEventEmitter = EmitterService.get('reload');
    this.reloadEventEmitter.subscribe((randomRecipe: RandomRecipe) => {
      if (randomRecipe && randomRecipe.triggered) {
        console.log(randomRecipe);
        this.getRecipesById(randomRecipe.randomRecipeId);
      }
    });
  }

  public getRecipesById(id: number) {
    this.recipeService.getRecipeWithIngredientsById(id).subscribe(
      (data: RecipeIngredientView) => {
        this.recipeIngredientView = new RecipeIngredientView(data.recipeId, data.recipeName, data.ingredients, false);
        console.log(this.recipeIngredientView);
      },
      error => {
        console.error(error);
      }
    )
  }

  public onBack() {
    this.messageToParentComponent.emit(true);
  }

}
