import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
//import { FirebaseListObservable, AngularFireDatabase  } from 'angularfire2/database-deprecated';
import {GaleriaPage} from '../galeria/galeria';


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
  public usuarios:Array<any> = [{"id":1,"nombre":"admin","clave":11,"perfil":"admin","sexo":"Female"},
{"id":2,"nombre":"invitado","clave":22,"perfil":"invitado","sexo":"Female"},
{"id":3,"nombre":"usuario","clave":33,"perfil":"usuario","sexo":"Male"},
{"id":4,"nombre":"j1","clave":44,"perfil":"jugador","sexo":"Male"},
{"id":5,"nombre":"j2","clave":55,"perfil":"jugador","sexo":"Female"}];
  //tasks: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,
  public actionControler: ActionSheetController ) {
    /*this.tasks = this.fireDatabase.list('usuarios');
    this.tasks.subscribe(
        users => this.usuarios = users,
      );*/
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
        that.navCtrl.setRoot(GaleriaPage,{"usuario":that.usuario});
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
    
    let Action = this.actionControler.create({
      cssClass: 'action-sheets-basic-page',
      title: 'Usuarios disponibles:',
      buttons: [
       {
         text: 'admin',
         icon: 'ios-person',
         handler: () => {
           this.usuario = "admin";
           this.contrasenia = "11";
         }
       }, 
       {
         text: 'invitado',
         icon: 'ios-person',
         handler: () => {
           this.usuario = "invitado";
           this.contrasenia = "22";
         }
       },
       {
         text: 'usuario',
         icon: 'ios-person',
         handler: () => {
            this.usuario = "usuario";
            this.contrasenia = "33";
         }
       },
       {
         text: 'j1',
         icon: 'ios-person',
         handler: () => {
            this.usuario = "j1";
            this.contrasenia = "44";
         }
       },
       {
         text: 'j2',
         icon: 'ios-person',
         handler: () => {
            this.usuario = "j2";
            this.contrasenia = "55";
         }
       },
       {
         text: 'Cancelar',
         role: 'cancel',
         icon: 'md-close-circle',
         handler: () => {
           console.log('Cancel clicked');
         }
       }
     ]});
     Action.present();
  }

}
