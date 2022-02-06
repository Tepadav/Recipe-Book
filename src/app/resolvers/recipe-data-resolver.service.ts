import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

//*------- Services -------*/
import { RecipeService } from '../services/recipe.service';

//*------- Models -------*/
import { recipeModel } from '../models/recipe.model';
import { ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class recipeDataResolver
  implements Resolve<recipeModel | recipeModel[]>
{
  constructor(private recipeService: RecipeService) {}

  /**
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @return {*}  {(recipeModel
   * 		| recipeModel[]
   * 		| Observable<recipeModel | recipeModel[]>
   * 		| Promise<recipeModel | recipeModel[]>)}
   * @memberof recipeDataResolver
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | recipeModel
    | recipeModel[]
    | Observable<recipeModel | recipeModel[]>
    | Promise<recipeModel | recipeModel[]> {
    // It return a promise with the recipe array..
    return new Promise((resolve, reject) => {
      const recipeData: recipeModel[] = this.recipeService.fetchRecipes();
      if (route.paramMap.has('id')) {
        const recipeDetails = this.recipeService
          .fetchRecipeById(+route.params.id)
          .subscribe((Data) => {
            let description: string = '';
            let ingredients: ingredient[] = [];
            for (let ins of Data['instructions']) {
              description += ins['display_text'];
            }
            for (let component of Data['sections'][0]['components']) {
              let componentA: string;
              for (let componentAmount of component['measurements']) {
                componentA = componentAmount['quantity'];
              }
              ingredients.push(
                new ingredient(component['raw_text'], componentA)
              );
            }
            resolve(
              new recipeModel(
                Data['name'],
                Data['description'],
                description,
                Data['thumbnail_url'],
                ingredients,
                Data['id']
              )
            );
          });
      } else {
        resolve(recipeData);
      }
    });
  }
}
