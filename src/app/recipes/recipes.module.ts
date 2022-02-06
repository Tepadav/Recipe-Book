import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//*------------------ Components -----------------*/
import { RecipesComponent } from './recipes.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';

//*------------------ Recipe Routing Module -----------------*/
import { RecpiesRoutingModule } from './recipes.routing';

//*------------------ Pipes -----------------*/
import { ShortenPipe } from '../Pipes/shorten.pipe';

@NgModule({
  declarations: [
    ShortenPipe,
    RecipesComponent,
    RecipeDetailsComponent,
    RecipeItemComponent,
  ],
  imports: [RecpiesRoutingModule, CommonModule],
})
export class RecipesModule {}
