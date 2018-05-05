import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase  } from 'angularfire2/database';
import {QrPage} from '../qr/qr';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  cadenas:Array<any>;
  public usuario:string;
  public contrasenia:string;
  public mostrar:boolean = false;
  public usuarios:Array<any> = [];
  tasks: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public fireDatabase: AngularFireDatabase) {
    this.tasks = this.fireDatabase.list('usuarios');
    this.tasks.subscribe(
        users => this.usuarios = users,
      );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  Login()
  {
      //console.log(this.usuario+this.contrasenia);
      let i:number = 0;
      let valor:boolean =false;
      let alert1 = this.alertCtrl.create({
      title: 'Fallo de ingreso',
      cssClass: 'alertDanger',
      subTitle: 'El ususario y/o la contraseña son incorrectos',
      buttons: ['OK']
     });
     this.mostrar = true;
     
      for(i=0;i<this.usuarios.length;i++)
      {
        if(this.usuarios[i].nombre == this.usuario && this.usuarios[i].clave == this.contrasenia)
        {
          valor = true;
          break;
        }
      }
      var that = this;
      if(valor)
      {
        setTimeout(function(){ 
        that.navCtrl.setRoot(QrPage,{"usuario":that.usuario});
        }, 3000);
      }
      else
      {   
        setTimeout(function(){ 
        alert1.present();
        that.mostrar=false;
        that.usuario = "";
        that.contrasenia = "";
        }, 3000);
      }
  }
  Cargar()
  {
    let alert = this.alertCtrl.create();
    alert.setTitle('Usuarios Disponibles');
    alert._cssClass = "alertRadio";
    alert.addInput({
      type: 'radio',
      label: 'admin',
      value: 'admin-11',
      checked: true
    });
    alert.addInput({
      type: 'radio',
      label: 'invitado',
      value: 'invitado-22',
    });
    alert.addInput({
      type: 'radio',
      label: 'usuario',
      value: 'usuario-33',
    });
    alert.addInput({
      type: 'radio',
      label: 'j1',
      value: 'j1-44',
    });
    alert.addInput({
      type: 'radio',
      label: 'j2',
      value: 'j2-55',
    });
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.cadenas = data.split("-")
        this.usuario = this.cadenas[0];
        this.contrasenia = this.cadenas[1];
      }
    });
    alert.addButton('Cancelar');
    alert.present();
  }
}
