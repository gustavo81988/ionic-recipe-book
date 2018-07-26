import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit{
  mode: string  = 'New';
  selectOptions = ['Easy','Medium','Hard'];
  recipeForm: FormGroup;

  constructor(
    public navParams: NavParams,
    public actionSheetController: ActionSheetController
  ){}
  
  ngOnInit(){
    this.mode = this.navParams.get('mode');
    this.initializeForm();
  }

  onSubmit(){
    console.log(this.recipeForm);
  }

  onManageIngredients(){
    const actionSheet = this.actionSheetController.create({
      title: 'What do you want to do?',
      buttons:[
        {
          text: 'Add Ingredient',
          handler: () => {

          }
        },
        {
          text: 'Remove all Ingredients',
          role: 'destructive',
          handler: () => {

          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        },
      ],
    });
    actionSheet.present();
  }

  private initializeForm(){
    this.recipeForm = new FormGroup({
      'title'       : new FormControl(null, Validators.required),
      'description' : new FormControl(null, Validators.required),
      'difficulty'  : new FormControl('Medium', Validators.required),
    });
  }
}
