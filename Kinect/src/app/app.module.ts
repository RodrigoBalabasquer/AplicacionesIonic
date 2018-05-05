import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage} from '../pages/login/login';
import { GaleriaPage} from '../pages/galeria/galeria';
import { AutosPage} from '../pages/autos/autos';
import { MascotasPage} from '../pages/mascotas/mascotas';
import { VacacionesPage} from '../pages/vacaciones/vacaciones';

import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
export const firebaseConfig = {
    apiKey: "AIzaSyCTcuudyCm5MUSHx-lLOvoJOMkuIQn7bdE",
    authDomain: "kinec-ee75b.firebaseapp.com",
    databaseURL: "https://kinec-ee75b.firebaseio.com",
    projectId: "kinec-ee75b",
    storageBucket: "kinec-ee75b.appspot.com",
    messagingSenderId: "32042320635"
};
import { Vibration } from '@ionic-native/vibration';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    GaleriaPage,
    AutosPage,
    MascotasPage,
    VacacionesPage
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
    GaleriaPage,
    AutosPage,
    MascotasPage,
    VacacionesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Vibration,
    DeviceMotion,
    NativeAudio,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
