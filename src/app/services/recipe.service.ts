import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

// *------- Model -------*/
import { recipeModel } from './../models/recipe.model';
import { ingredient } from '../models/ingredient.model';

// *------- Services -------*/
import { ShoppingListService } from './shopping-list.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  initiateDetailDrawer = new Subject<boolean>();
  /**
   *
   * ? Recipe Database
   *
   * @type {recipeModel[]}
   * @memberof RecipeService
   */
  recipes: recipeModel[];

  constructor(
    private shoppingListService: ShoppingListService,
    private http: HttpClient
  ) {}

  fetchRecipes() {
    const data = [];
    this.http
      .get(
        'https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes',
        {
          headers: {
            'x-rapidapi-key':
              'a5a7981f86msh016f80f350e57edp1f3646jsn0ea0ecd6b9ea',
            'x-rapidapi-host': 'tasty.p.rapidapi.com',
          },
        }
      )
      .subscribe((Data: any) => {
        for (const recipeData of Data.results) {
          const ingredients: ingredient[] = [];
          let instructions = '';
          for (const component of recipeData.sections[0].components) {
            let componentA: string;
            for (const componentAmount of component.measurements) {
              componentA = componentAmount.quantity;
            }
            ingredients.push(new ingredient(component.raw_text, componentA));
          }
          for (const inst of recipeData.instructions) {
            instructions += inst.display_text;
          }
          data.push(
            new recipeModel(
              recipeData.name,
              recipeData.description,
              instructions,
              recipeData.thumbnail_url,
              ingredients,
              recipeData.id
            )
          );
        }
      });
    return data;
  }

  fetchRecipeById(id: number): Observable<any> {
    let data: recipeModel;
    return this.http.get(
      `https://tasty.p.rapidapi.com/recipes/detail?id=${id}`,
      {
        headers: {
          'x-rapidapi-key':
            'a5a7981f86msh016f80f350e57edp1f3646jsn0ea0ecd6b9ea',
          'x-rapidapi-host': 'tasty.p.rapidapi.com',
        },
      }
    );
  }
  /**
   *
   * ? it adds an ingredient into the shopping list
   *
   * @param ings
   * @memberof RecipeService
   */
  addRecipeIng(ings: ingredient[]): void {
    this.shoppingListService.addRecipeIng(ings);
  }

  /**
   *
   * ? it used to add a recipe to Database
   *
   * @param recipe
   * @memberof RecipeService
   */
  addRecipe(recipe: recipeModel): void {
    this.recipes.push(recipe);
  }

  /**
   *
   * ? it used to edit the information of a recipe in the database
   *
   * @param recipe
   * @param index
   * @memberof RecipeService
   */
  editRecipe(recipe: recipeModel, index: number): void {
    this.recipes[index] = recipe;
  }

  /**
   *
   * ? used to delete a recipe from database
   *
   * @param index
   * @memberof RecipeService
   */
  deleteRecipe(index: number): void {
    this.recipes.splice(index, 1);
  }
}
