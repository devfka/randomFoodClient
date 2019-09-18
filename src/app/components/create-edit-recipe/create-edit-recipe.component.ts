import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RecipeIngredient, RecipeIngredientView} from "../../types/recipe-ingredient";
import {RecipeService} from "../../services/recipe.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {QueryType} from "../../enum/QueryType.enum";
import {DataService} from "../../services/data.service";
import {Ingredient} from "../../types/ingredient";

@Component({
  selector: 'app-create-edit-recipe',
  templateUrl: './create-edit-recipe.component.html',
  styleUrls: ['./create-edit-recipe.component.css']
})
export class CreateEditRecipeComponent implements OnInit {

  recipeForm: FormGroup;

  selectedIngredientOnParent: string[];

  QueryType = QueryType; //in order to use in html template

  recipeId: number;

  editMode: boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private recipeService: RecipeService,
              private formBuilder: FormBuilder,
              private dataService: DataService) {

    this.recipeForm = this.formBuilder.group({
      recipeName: new FormControl(''),
    });
  }

  ngOnInit() {

    this.editMode = !!this.route.snapshot.paramMap.get('id');

    if (this.editMode) {
      this.recipeId = Number(this.route.snapshot.paramMap.get('id'));
      this.getRecipesById(Number(this.recipeId));
      console.log('This is Edit mode');
    } else {
      console.log('This is Add mode');
    }

    this.dataService.currentSelected.subscribe(message => this.selectedIngredientOnParent = message);
  }

  public getRecipesById(id: number) {
    this.recipeService.getRecipeWithIngredientsById(id).subscribe(
      (data: RecipeIngredientView) => {

        this.recipeForm.setValue({
          recipeName: data.recipeName
        });

        let ingredientsAsStringList: string[]=[];

        data.ingredients.forEach(value => ingredientsAsStringList.push(value.ingredientId.toString()));

        this.dataService.changeSelectedIngredients(ingredientsAsStringList);
      },
      error => {
        console.error(error);
      }
    )
  }

  public addRecipe(recipeIngredient: RecipeIngredient) {
    this.recipeService.addRecipe(recipeIngredient).subscribe(
      (data: RecipeIngredient) => {
        console.log('Recipe successfully saved  : ', data);
        this.router.navigate(['/recipes']).then(r => console.log("going back to recipe dashboard: ", r));
      },
      error => {
        console.error(error);
      }
    )
  }

  onSubmit() {
    console.log(this.recipeForm.value.recipeName);
    console.log(this.selectedIngredientOnParent);

    let recipeIngredient: RecipeIngredient = new RecipeIngredient(0, this.recipeForm.value.recipeName, new Array<Ingredient>(), this.editMode);

    this.selectedIngredientOnParent.forEach(value => {
        let ingredient: Ingredient = new Ingredient(Number(value), "");
        recipeIngredient.ingredients.push(ingredient);
      }
    );

    this.addRecipe(recipeIngredient);
  }

  onCancel() {
    this.router.navigate(['/recipes']).then(r => console.log("going back to recipe dashboard : ", r));
  }

}
