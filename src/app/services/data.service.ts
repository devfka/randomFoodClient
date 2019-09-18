import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})

@Injectable()
export class DataService {

  selectedIngredientsInitial: string[] = [];
  unselectedIngredientsInitial: string[] = [];
  private selectedIngredientsUpdated = new BehaviorSubject(this.selectedIngredientsInitial);
  private unselectedIngredientsUpdated = new BehaviorSubject(this.unselectedIngredientsInitial);
  currentSelected = this.selectedIngredientsUpdated.asObservable();
  currentUnSelected = this.unselectedIngredientsUpdated.asObservable();

  constructor() {
  }

  changeSelectedIngredients(ingredients: string[]) {
    this.selectedIngredientsUpdated.next(ingredients)
  }

  changeUnSelectedIngredients(ingredients: string[]) {
    this.unselectedIngredientsUpdated.next(ingredients)
  }

}
