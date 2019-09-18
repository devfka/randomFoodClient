import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {IngredientService} from "../../services/ingredient.service";
import {MatTableDataSource} from "@angular/material/table";
import {IngredientView} from "../../types/ingredient";
import {DataService} from "../../services/data.service";
import {QueryType} from "../../enum/QueryType.enum";
import {RecipeIngredientView} from "../../types/recipe-ingredient";
import {RecipeService} from "../../services/recipe.service";

/**
 * @title Chips Autocomplete
 */
@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.css'],
})
export class SearchboxComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  ingredientCtrl = new FormControl();
  filteredIngredients: Observable<string[]>;
  selectedIngredients: string[] = [];
  selectedIngredientsIdList: string[] = [];
  allIngredients: string[] = [];
  placeHolderText: string;

  @Input() queryType: QueryType;
  @Input() recipeId: number;
  private _dataSource: MatTableDataSource<IngredientView> = null;

  @ViewChild('IngredientInput', {static: false}) ingredientInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  constructor(private ingredientService: IngredientService,
              private dataservice: DataService,
              private recipeService: RecipeService) {
  }

  ngOnInit() {

    if (this.recipeId) {
      if (this.recipeId != 0) {
        this.getIngredientsByRecipeId(this.recipeId);
      }
    } else {
      this.getIngredients();
    }

    if (this.queryType == QueryType.include) {
      this.placeHolderText = "I'd like to have";
    } else if (this.queryType == QueryType.notInclude) {
      this.placeHolderText = "I'd not like to have "
    }
  }

  public getIngredients() {
    this.ingredientService.getIngredients().subscribe(
      (data: Array<IngredientView>) => {
        this.dataSource = new MatTableDataSource(data);

        this._dataSource.data.forEach((ingredient) =>
          this.allIngredients.push(ingredient.ingredientName)
        );

        const unique = (value, index, self) => {
          return self.indexOf(value) === index
        };
        this.allIngredients = this.allIngredients.filter(unique);

        this.filteredIngredients = this.ingredientCtrl.valueChanges.pipe(
          startWith(null),
          map((fruit: string | null) => fruit ? this._filter(fruit) : this.allIngredients.slice()));

      },
      error => {
        console.error(error);
      }
    )
  }

  public getIngredientsByRecipeId(recipeId: number) {
    this.recipeService.getRecipeWithIngredientsById(recipeId).subscribe(
      (data: RecipeIngredientView) => {
        this.dataSource = new MatTableDataSource(data.ingredients);

        this._dataSource.data.forEach((ingredient) => {
          this.selectedIngredients.push(ingredient.ingredientName);
          this.allIngredients.push(ingredient.ingredientName);
          this.selectedIngredientsIdList.push(ingredient.ingredientId.toString());
        });

        const unique = (value, index, self) => {
          return self.indexOf(value) === index
        };
        this.selectedIngredientsIdList = this.selectedIngredientsIdList.filter(unique);
        this.selectedIngredients = this.selectedIngredients.filter(unique);

        this.getIngredients();

      },
      error => {
        console.error(error);
      }
    )
  }

  add(event: MatChipInputEvent): void {
    // Add ingredient only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.selectedIngredients.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.ingredientCtrl.setValue(null);
    }
  }

  remove(removedIngredient: string): void {
    const index = this.selectedIngredients.indexOf(removedIngredient);

    if (index >= 0) {
      this.selectedIngredients.splice(index, 1);
    }

    let removedIngredientId: number = 0;
    this._dataSource.data.forEach((ingredient) => {
        if (removedIngredient == ingredient.ingredientName) {
          removedIngredientId = ingredient.ingredientId;
          return;
        }
      }
    );

    const indexRemovedIngredientId = this.selectedIngredientsIdList.indexOf(removedIngredientId.toString());

    if (indexRemovedIngredientId >= 0) {
      this.selectedIngredientsIdList.splice(index, 1);
    }

    this.updateDataService();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedIngredients.push(event.option.viewValue);
    this.ingredientInput.nativeElement.value = '';
    this.ingredientCtrl.setValue(null);

    this._dataSource.data.forEach((ingredient) => {
        if ((event.option.viewValue) == ingredient.ingredientName) {
          this.selectedIngredientsIdList.push(ingredient.ingredientId.toString());
          return;
        }
      }
    );

    const unique = (value, index, self) => {
      return self.indexOf(value) === index
    };
    this.selectedIngredientsIdList = this.selectedIngredientsIdList.filter(unique);

    this.updateDataService();
  }

  private updateDataService() {

    if (this.queryType == QueryType.include) {
      this.dataservice.changeSelectedIngredients(this.selectedIngredientsIdList);
    } else if (this.queryType == QueryType.notInclude) {
      this.dataservice.changeUnSelectedIngredients(this.selectedIngredientsIdList);
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allIngredients.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

  public get dataSource(): MatTableDataSource<IngredientView> {
    return this._dataSource;
  }

  public set dataSource(value: MatTableDataSource<IngredientView>) {
    this._dataSource = value;
  }
}
