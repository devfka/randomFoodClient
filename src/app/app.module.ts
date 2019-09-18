import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RecipesComponent} from './components/recipes/recipes.component';
import {MatTableModule} from "@angular/material/table";
import {HttpClientModule} from "@angular/common/http";
import {RecipeService} from "./services/recipe.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatChipsModule} from "@angular/material/chips";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { SearchboxComponent } from './components/searchbox/searchbox.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatButtonModule} from "@angular/material/button";
import { CreateEditRecipeComponent } from './components/create-edit-recipe/create-edit-recipe.component';
import {MatInputModule} from "@angular/material/input";
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CreateIngredientComponent } from './components/create-ingredient/create-ingredient.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";

@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    SearchboxComponent,
    CreateEditRecipeComponent,
    CreateIngredientComponent,
    RecipeDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatListModule,
  ],
  providers: [RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
