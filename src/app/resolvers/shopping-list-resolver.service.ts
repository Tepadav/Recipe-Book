import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	Resolve,
	RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

//*------- Services -------*/
import { ShoppingListService } from '../services/shopping-list.service';

//*------- Models -------*/
import { ingredient } from '../models/ingredient.model';

@Injectable({
	providedIn: 'root',
})
export class shoppingListResolver implements Resolve<ingredient[]> {
	constructor(private shoppingListService: ShoppingListService) {}

	/**
	 *
	 * @param {ActivatedRouteSnapshot} route
	 * @param {RouterStateSnapshot} state
	 * @return {*}  {(ingredient[] | Observable<ingredient[]> | Promise<ingredient[]>)}
	 * @memberof shoppingListResolver
	 */
	resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): ingredient[] | Observable<ingredient[]> | Promise<ingredient[]> {
		// It return a promise with the recipe array..
		return new Promise((resolve, reject) => {
			resolve(this.shoppingListService.ingredients);
		});
	}
}
