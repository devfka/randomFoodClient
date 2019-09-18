// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */

export const environment = {
  production: false,
  getRecipeList: "http://localhost:8080/getRecipes/",
  getIngredientList: "http://localhost:8080/getIngredients/",
  allRecipesWithIngredientList: "http://localhost:8080/getRecipesWithIngredientList/",
  allRecipesWithIngredientListByIngredient: "http://localhost:8080/getAllRecipesWithIngredientListByIngredient",
  getRecipeIngredientsByRecipeId: "http://localhost:8080/getRecipeIngredientsByRecipeId/",
  addRecipe: "http://localhost:8080/addRecipe/",
  deleteRecipe: "http://localhost:8080/deleteRecipe/",
  addIngredient: "http://localhost:8080/addIngredient/",
};
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
