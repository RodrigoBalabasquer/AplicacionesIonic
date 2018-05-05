import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage} from '../login/login';
import { AutosPage} from '../autos/autos';
import { MascotasPage} from '../mascotas/mascotas';
import { VacacionesPage} from '../vacaciones/vacaciones';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-galeria',
  templateUrl: 'galeria.html',
})
export class GaleriaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController) {
  }
  public valor = true;
  ionViewDidLoad() {
    console.log('ionViewDidLoad GaleriaPage');
  }
  vacaciones()
  {
    if(this.valor)
      this.navCtrl.setRoot(VacacionesPage);
  }
  autos()
  {
    if(this.valor)
      this.navCtrl.setRoot(AutosPage);
  }
  mascotas()
  {
    if(this.valor)
      this.navCtrl.setRoot(MascotasPage);
  }
  volver()
    {
      this.valor = false;
      let toastCtrl1 = this.toastCtrl.create({
      message: 'Está saliendo de la aplicación.',
      position: 'top',
      duration: 3000
      });
      toastCtrl1.present();
      var that = this;
      setTimeout(function() {
        that.navCtrl.setRoot(LoginPage);
      }, 3000);
      
    }
}
