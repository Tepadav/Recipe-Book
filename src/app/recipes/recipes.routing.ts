import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//*------------------ Components -----------------*/
import { RecipesComponent } from '../recipes/recipes.component';
import { RecipeDetailsComponent } from '../recipes/recipe-details/recipe-details.component';

//*------------------ Resolvers -----------------*/
import { recipeDataResolver } from '../resolvers/recipe-data-resolver.service';

//*------------------ Router configurations -----------------*/
const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
  },
  {
    path: ':id/detail',
    component: RecipeDetailsComponent,
    resolve: { recipe: recipeDataResolver },
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecpiesRoutingModule {}
