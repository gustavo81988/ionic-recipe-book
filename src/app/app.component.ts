import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  tabsPage:any = TabsPage;
  singinPage   = SigninPage;
  singupPage   = SignupPage;
  @ViewChild('nav') nav: NavController;

  constructor(
    private menuCtrl: MenuController,
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen
  ){
    firebase.initializeApp({
      apiKey: "AIzaSyDlqrhf3HfEfKzIAfD8ccosQOkqgzYbMUQ",
      authDomain: "ionic-recipe-book-4a98f.firebaseapp.com"
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  
  onLoad(page: any){
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogOut(){
    
  }
}

