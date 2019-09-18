export class Ingredient {

  public ingredientId: number;
  public ingredientName: string;

  constructor(ingredientId: number, ingredientName: string) {
    this.ingredientId = ingredientId;
    this.ingredientName = ingredientName;
  }

  // constructor(_item: Ingredient) {
  //   this.ingredientId = _item.ingredientId;
  //   this.ingredientName = _item.ingredientName;
  // }

}

export class IngredientView extends Ingredient{

  constructor(ingredientId: number, ingredientName: string) {
    super(ingredientId, ingredientName);
  }
}
