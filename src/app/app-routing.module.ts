import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RecipesComponent} from "./components/recipes/recipes.component";
import {CreateEditRecipeComponent} from "./components/create-edit-recipe/create-edit-recipe.component";
import {CreateIngredientComponent} from "./components/create-ingredient/create-ingredient.component";


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    {path: 'recipes', component: RecipesComponent},
    {path: '', redirectTo: 'recipes', pathMatch: 'full'},
    {path: 'editRecipe/:id', component: CreateEditRecipeComponent},
    {path: 'addRecipe', component: CreateEditRecipeComponent},
    {path: 'addIngredient', component: CreateIngredientComponent},
  ]),],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
