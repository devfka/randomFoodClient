export class Recipe {
  public recipeId: number;
  public recipeName: string;

  constructor(_item: Recipe) {
    this.recipeId = _item.recipeId;
    this.recipeName = _item.recipeName;
  }
}

export class RecipeView extends Recipe{
  super(_item: RecipeView | any) {
  }
}
