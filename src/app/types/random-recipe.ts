export class RandomRecipe {
  public randomRecipeId: number;
  public triggered: boolean;

  constructor(randomRecipeId: number, triggered: boolean) {
    this.randomRecipeId = randomRecipeId;
    this.triggered = triggered;
  }
}
