import { recipeModel } from './../../models/recipe.model';
import { RecipeService } from './../../services/recipe.service';
import { ingredient } from './../../models/shoppingList.model';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  recipeForm: FormGroup;
  ingredients: ingredient[] = [];
  editMode: boolean;

  constructor(private router: Router, private route: ActivatedRoute, private recipeService:RecipeService) { }

  ngOnInit(): void {
    this.recipeForm  = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'preparation': new FormControl(null, Validators.required),
      'imageUrl': new FormControl(null, Validators.required),
      'ingredients': new FormGroup({
        'ingName': new FormControl(null),
        'ingNum': new FormControl(null)
      })
    });

    this.route.data.subscribe((data: Data) => {
      if (data['recipe'] != null) {
        this.recipeForm.reset({
          name: data['recipe']['name'],
          description: data['recipe']['description'],
          preparation: data['recipe']['preparation'],
          imageUrl: data['recipe']['imgPath'],
        });
        this.ingredients = data['recipe']['ingredients'];
        this.editMode = true;
      } else {
        this.editMode = false;
      }
    });
  }


  invalidInput(inputControl, validationError: string = 'invalid') {
    switch (validationError) {
      case 'invalid':
        switch (inputControl) {
          case 'default':
            return this.recipeForm.invalid;
          default:
            return this.recipeForm.get(inputControl).invalid &&
            this.recipeForm.get(inputControl).touched;
        }
      default:
        switch (inputControl) {
          case 'default':
            if (this.recipeForm.get(inputControl).invalid) {
              return !this.recipeForm.errors[validationError];
            } else return false
          default:
            if (this.recipeForm.get(inputControl).invalid) {
              return this.recipeForm.get(inputControl).errors[validationError] && this.recipeForm.get(inputControl).touched;
            } else return false
        }
    }
  }

  onAddIngredient() {
    let ingredients = this.recipeForm.get('ingredients')
    let ingName = ingredients.get('ingName');
    let ingNum = ingredients.get('ingNum');
    this.ingredients.push(new ingredient(ingName.value, ingNum.value));
  }

  onSubmit() {
    if (this.editMode) {
      return false
    } else {
      const NewRecipe = new recipeModel(
        this.recipeForm.value.name,
        this.recipeForm.value.description,
        this.recipeForm.value.preparation,
        this.recipeForm.value.imageUrl,
        this.ingredients
      )
      this.recipeService.addRecipe(NewRecipe);
      console.log(this.recipeService.recipes)
      // this.router.navigate(['recipes'])
    }
  }
}