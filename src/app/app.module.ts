import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

// *------------------ Router -----------------*/
import { AppRoutingModule } from './app-routing/app-routing.module';

// *------------------ Comoponents -----------------*/
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipes/recipe-item/recipe-item.component';
import { RecipeDetailsComponent } from './recipes/recipe-details/recipe-details.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { ErrorHandleComponent } from './error-handle/error-handle.component';
import { AboutComponent } from './about/about.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { FeaturesComponent } from './features/features.component';
import { FooterComponent } from './footer/footer.component';

// *------------------ Icon Library -----------------*/
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// *------------------ Mat Componenets -----------------*/
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';

// *------- Pipe -------*/
import { ShortenPipe } from './Pipes/shorten.pipe';

// *------- NGRX -------*/
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
	declarations: [
		AppComponent,
		MainNavComponent,
		HomeComponent,
		RecipesComponent,
		RecipeDetailsComponent,
		RecipeItemComponent,
		ShoppingListComponent,
		ShoppingEditComponent,
		ErrorHandleComponent,
		RecipeEditComponent,
		ShortenPipe,
		FooterComponent,
		AboutComponent,
		UpgradeComponent,
		FeaturesComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		HttpClientModule,
		FontAwesomeModule,
		FlexLayoutModule,
		LayoutModule,
		MatToolbarModule,
		MatButtonModule,
		MatSidenavModule,
		MatIconModule,
		MatListModule,
		MatMenuModule,
		MatSnackBarModule,
		MatCardModule,
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: false,
			autoPause: true,
			features: {
				pause: false,
				lock: true,
				persist: true,
			},
		}),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
