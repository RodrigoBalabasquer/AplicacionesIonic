import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {LoginPage} from '../pages/login/login';
import {QrPage} from '../pages/qr/qr';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
export const firebaseConfig = {
    apiKey: "AIzaSyC-6QaRfvXsUEIq4nq-fykfKo-gNQk1Dbk",
    authDomain: "escaneoqr.firebaseapp.com",
    databaseURL: "https://escaneoqr.firebaseio.com",
    projectId: "escaneoqr",
    storageBucket: "escaneoqr.appspot.com",
    messagingSenderId: "871833573847"
};
import {NgxQRCodeModule}from'ngx-qrcode2';
import {BarcodeScanner} from '@ionic-native/barcode-scanner';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    QrPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgxQRCodeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    QrPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireAuthModule,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
