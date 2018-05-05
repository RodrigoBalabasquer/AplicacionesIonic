import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Platform} from 'ionic-angular';
import { GaleriaPage} from '../galeria/galeria';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Vibration } from '@ionic-native/vibration';
import { NativeAudio } from '@ionic-native/native-audio';
import {DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';

@IonicPage()
@Component({
  selector: 'page-vacaciones',
  templateUrl: 'vacaciones.html',
})
export class VacacionesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private vibration: Vibration,
              public alertCtrl: AlertController,platform:Platform,private deviceMotion: DeviceMotion,
              public toastCtrl: ToastController,public nativeAudio:NativeAudio) {
                this.nativeAudio.preloadSimple('uniqueId', 'assets/tono.mp3');
                this.nativeAudio.preloadSimple('uniqueS', 'assets/siguiente.m4a');
                this.nativeAudio.preloadSimple('uniqueA', 'assets/anterior.m4a');
                this.nativeAudio.preloadSimple('uniqueC', 'assets/Comienzo.m4a');
          }
  //public estado = 0;
  public imagen:string = "assets/vacaciones/vacaciones1.jpg";
  public imagenes:Array<string> = ["assets/vacaciones/vacaciones1.jpg","assets/vacaciones/vacaciones2.jpg","assets/vacaciones/vacaciones3.jpg",
  "assets/vacaciones/vacaciones4.jpg"];
  public intervalo:any;
  public cambiar:boolean;
    ionViewDidLoad() {
        var that = this;
        this.cambiar = true;
        this.intervalo = setInterval(function(){ 
          that.deviceMotion.getCurrentAcceleration().then(
          (acceleration: DeviceMotionAccelerationData) => {
          if(acceleration.x > -2 && acceleration.x < 2)
          {
            that.cambiar = true;
          }
          if(acceleration.x < -2 && that.cambiar)
          { 
            for(let i = 0;i< that.imagenes.length;i++)
            {
              if(that.imagen == that.imagenes[i])
              { 
                //that.nativeAudio.play('uniqueId');
                if(i == that.imagenes.length - 1)
                {
                  that.imagen = that.imagenes[0];
                  that.nativeAudio.play('uniqueC');
                  that.vibration.vibrate(500);
                }
                else
                {
                  that.imagen = that.imagenes[i+1];
                  that.nativeAudio.play('uniqueS');
                  if(i+1 == that.imagenes.length - 1)
                  {
                    that.vibration.vibrate(500);
                  }
                }
                that.cambiar = false;
                break;
              }
            }
          }
          if(acceleration.x > 2 && that.cambiar)
          { 
            for(let i = 0;i< that.imagenes.length;i++)
            {
              if(that.imagen == that.imagenes[i])
              {
                if(i == 0)
                { 
                  let toastCtrl1 = that.toastCtrl.create({
                  message: 'Está en la primera fotografía!!!',
                  position: 'middle',
                  cssClass: 'toast',
                  duration: 1500
                  });
                  toastCtrl1.present();
                }
                else
                {
                  that.imagen = that.imagenes[i-1];
                  that.nativeAudio.play('uniqueA');
                  if(i-1 == 0)
                  {
                    that.vibration.vibrate(500);
                  }
                }
                that.cambiar = false;
                break;
              }
            }
          }
        },
      (error: any) => console.log(error)
      );
         }, 100);
    }
    volver()
    {
      console.log("volver");
      clearInterval(this.intervalo);
      this.navCtrl.setRoot(GaleriaPage);
    }

}
