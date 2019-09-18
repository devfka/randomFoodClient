import {Ingredient} from "./ingredient";

export class RecipeIngredient {

  public recipeId: number;
  public recipeName: string;
  public ingredients: Array<Ingredient>;
  public editMode: boolean;

  constructor(recipeId: number, recipeName: string, ingredients: Array<Ingredient>, editMode: boolean) {
    this.recipeId = recipeId;
    this.recipeName = recipeName;
    this.ingredients = ingredients;
    this.editMode = editMode;
  }
}

export class RecipeIngredientView extends RecipeIngredient {

  constructor(recipeId: number, recipeName: string, ingredients: Array<Ingredient>, editMode: boolean) {
    super(recipeId, recipeName, ingredients, editMode);
  }

}
