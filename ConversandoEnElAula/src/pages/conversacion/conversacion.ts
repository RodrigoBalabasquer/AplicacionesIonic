import { Component } from '@angular/core';
import { LoginPage } from '../login/login';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {Aula1Page} from '../aula1/aula1';
import {Aula2Page} from '../aula2/aula2';
import { ToastController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-conversacion',
  templateUrl: 'conversacion.html',
})
export class ConversacionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl:AlertController,
  public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConversacionPage');
  }

  Aula1()
  {
      //this.navCtrl.push(Aula1Page);
      this.navCtrl.setRoot(Aula1Page,{"usuario":this.navParams.get('usuario')});
  }
  Aula2()
  {
      //this.navCtrl.push(Aula2Page);
      this.navCtrl.setRoot(Aula2Page,{"usuario":this.navParams.get('usuario')});
  }
  Volver()
  {
    
    
    const toast = this.toastCtrl.create({
      message: 'Usted esta saliendo de la sesión',
      duration: 3000,
      position: 'top',
    });
    var that = this;
    toast.present().then(dato => 
    setTimeout(function(){ 
    that.navCtrl.setRoot(LoginPage) }, 3000));
    
  }
}
