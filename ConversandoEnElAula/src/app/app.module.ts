import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {LoginPage} from '../pages/login/login';
import {RegisterPage} from '../pages/register/register';
import {ConversacionPage} from '../pages/conversacion/conversacion';
import {Aula1Page} from '../pages/aula1/aula1';
import {Aula2Page} from '../pages/aula2/aula2';

import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
export const firebaseConfig = {
    apiKey: "AIzaSyDYVCVh-d-8eKtoFuHMAlHhlPtRdZrq5FY",
    authDomain: "conversacion-ad0e8.firebaseapp.com",
    databaseURL: "https://conversacion-ad0e8.firebaseio.com",
    projectId: "conversacion-ad0e8",
    storageBucket: "",
    messagingSenderId: "646971375706"
};

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    ConversacionPage,
    Aula1Page,
    Aula2Page
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    ConversacionPage,
    Aula1Page,
    Aula2Page
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
