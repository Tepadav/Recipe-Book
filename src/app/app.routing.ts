import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//*------------------ Components -----------------*/
import { HomeComponent } from './home/home.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { FeaturesComponent } from './features/features.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { AboutComponent } from './about/about.component';
import { ErrorHandleComponent } from './error-handle/error-handle.component';

//*------------------ Resolvers -----------------*/
import { shoppingListResolver } from './resolvers/shopping-list-resolver.service';
import { recipeDataResolver } from './resolvers/recipe-data-resolver.service';

//*------------------ Router configurations -----------------*/
const routes: Routes = [
  { path: 'home', component: HomeComponent, data: { aR: 'home' } },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'recipes',
    loadChildren: () =>
      import('./recipes/recipes.module').then((m) => m.RecipesModule),
    resolve: { recipes: recipeDataResolver },
    data: { aR: 'recipes' },
  },
  {
    path: 'shoppinglist',
    component: ShoppingListComponent,
    data: { aR: 'shoppingList' },
    resolve: { ingredients: shoppingListResolver },
  },
  { path: 'features', component: FeaturesComponent },
  { path: 'upgrade', component: UpgradeComponent },
  { path: 'about', component: AboutComponent },
  { path: ':num/error', component: ErrorHandleComponent },
  { path: '**', redirectTo: '/404/error' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
