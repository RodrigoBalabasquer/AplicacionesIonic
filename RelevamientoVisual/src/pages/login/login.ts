import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { VisualPage} from '../visual/visual';
import { FirebaseListObservable, AngularFireDatabase  } from 'angularfire2/database';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public usuario:string;
  public mostrar=false;
  cadenas:Array<any>;
  public contrasenia:string;
  public listaUsuarios:Array<any> =[];
  tasks: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,
  public fireDatabase: AngularFireDatabase, public toastCtrl:ToastController ) {
    this.tasks = this.fireDatabase.list('usuarios');
    this.tasks.subscribe(
        users => this.listaUsuarios = users,
      );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  Login()
  {
      this.mostrar = true;
      let i:number = 0;
      let valor:boolean =false;
      const toast = this.toastCtrl.create({
      message: 'Error, el usuario y/o la contraseña son incorrectos',
      duration: 3000,
      position: 'bottom '
      });
      for(i=0;i<this.listaUsuarios.length;i++)
      {
        if(this.listaUsuarios[i].nombre == this.usuario && this.listaUsuarios[i].clave == this.contrasenia)
        {
          valor = true;
          break;
        }
      }
      var that = this;
      if(valor)
      {
          setTimeout(function(){ 
          that.navCtrl.setRoot(VisualPage,{"usuario":that.usuario});
          }, 3000);
      }
      else
      {
          setTimeout(function(){ 
          toast.present();
          that.mostrar=false;
          that.usuario = "";
          that.contrasenia = "";
          }, 3000);
      }
  }
  A()
  {
    this.usuario = "admin";
    this.contrasenia = "11";
  }
  U()
  {
    this.usuario = "usuario";
    this.contrasenia = "33";
  }
  J1()
  {
    this.usuario = "j1";
    this.contrasenia = "44";
  }
  J2()
  {
    this.usuario = "j2";
    this.contrasenia = "55";
  }
  I()
  {
    this.usuario = "invitado";
    this.contrasenia = "22";
  }
}
