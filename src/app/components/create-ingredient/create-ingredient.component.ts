import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {RecipeService} from "../../services/recipe.service";
import {DataService} from "../../services/data.service";
import {RecipeIngredient} from "../../types/recipe-ingredient";
import {Ingredient, IngredientView} from "../../types/ingredient";
import {IngredientService} from "../../services/ingredient.service";
import {InvalidEntryPoint} from "@angular/compiler-cli/ngcc/src/dependencies/dependency_resolver";

@Component({
  selector: 'app-create-ingredient',
  templateUrl: './create-ingredient.component.html',
  styleUrls: ['./create-ingredient.component.css']
})
export class CreateIngredientComponent implements OnInit {

  ingredientForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private ingredientService: IngredientService,
              private formBuilder: FormBuilder) {

    this.ingredientForm = this.formBuilder.group({
      ingredientName: new FormControl(''),
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {

    let ingredientView: IngredientView = new IngredientView(0, this.ingredientForm.value.ingredientName);

    this.addIngredient(ingredientView);
  }

  public addIngredient(ingredientView: IngredientView) {
    this.ingredientService.addIngredient(ingredientView).subscribe(
      (data: IngredientView) => {
        console.log('Ingredient successfully saved  : ', data);
        this.router.navigate(['/recipes']).then(r => console.log("going back to recipe dashboard: ", r));
      },
      error => {
        console.error(error);
      }
    )
  }

  onCancel() {
    this.router.navigate(['/recipes']).then(r => console.log("going back to recipe dashboard : ", r));
  }


}
