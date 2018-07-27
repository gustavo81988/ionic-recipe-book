import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RecipesService } from '../../services/recipes';

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
    public actionSheetController: ActionSheetController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private recipeService: RecipesService,
    private navCtrl: NavController
  ){}
  
  ngOnInit(){
    this.mode = this.navParams.get('mode');
    this.initializeForm();
  }

  onSubmit(){
    const value = this.recipeForm.value;
    let ingredients = [];
    if(value.ingredients.length > 0){
      ingredients = value.ingredients.map( (name) => {
        return {name: name, amount: 1}
      });
    }
    this.recipeService.addRecipe(value.title, value.title, value.difficulty, value.ingredients);
    this.recipeForm.reset();
    this.navCtrl.popToRoot(); 
  }

  onManageIngredients(){
    const actionSheet = this.actionSheetController.create({
      title: 'What do you want to do?',
      buttons:[
        {
          text: 'Add Ingredient',
          handler: () => {
            this.createNewIngridientAlert().present();
          }
        },
        {
          text: 'Remove all Ingredients',
          role: 'destructive',
          handler: () => {
            const formArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
            const len = formArray.length;
            if( len > 0){
              for(let i = len-1; i>=0; i--){
                formArray.removeAt(i)
              }
              const toast = this.toastCtrl.create({
                message: 'All Ingredients were deleted!',
                duration: 1000,
                position: 'bottom'
              });
              toast.present();
            }
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

  private createNewIngridientAlert(){
    return this.alertCtrl.create({
      title: 'Add Ingredient',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
        },
        
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            if(data.name.trim() == '' || data.name == null){
              const toast = this.toastCtrl.create({
                message: 'Please enter a valid value!',
                duration: 1000,
                position: 'bottom'
              });
              toast.present();
              return;
            }
            (<FormArray>this.recipeForm.get('ingredients'))
              .push(new FormControl(data.name, Validators.required));
            const toast = this.toastCtrl.create({
              message: 'Item added!',
              duration: 1000,
              position: 'bottom'
            });
            toast.present();
          }
        },
      ]
    });
  }

  private initializeForm(){
    this.recipeForm = new FormGroup({
      'title'       : new FormControl(null, Validators.required),
      'description' : new FormControl(null, Validators.required),
      'difficulty'  : new FormControl('Medium', Validators.required),
      'ingredients' : new FormArray([])
    });
  }
}
