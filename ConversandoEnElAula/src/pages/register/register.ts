import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ConversacionPage} from '../conversacion/conversacion';
import { FirebaseListObservable, AngularFireDatabase  } from 'angularfire2/database';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  usuario:string="";
  perfil:string="";
  contrasenia:string="";
  copia:string="";
  sexo:string="";
  tasks: FirebaseListObservable<any>;
  public listaUsuarios:Array<any> =[];
  public mostrar:boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public fireDatabase: AngularFireDatabase,public alertCtrl: AlertController) {
    this.tasks = this.fireDatabase.list('/usuarios');
    this.tasks.subscribe(
        users => this.listaUsuarios = users,
      );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  Register()
  { 
    this.mostrar = true;
    //this.usuario = this.listaUsuarios[0].id;
    let alert = this.alertCtrl.create({
      title: 'Creación de usuario éxitosa',
      cssClass:'alertInfo',
      buttons: [{
          text: 'OK',
          handler: () => {
              this.navCtrl.setRoot(ConversacionPage,{"usuario":this.usuario});
          }
        }]
      });
    var that = this;
    setTimeout(function(){ 
          if(that.validar()){
            that.tasks.push({
              clave:that.contrasenia,
              id: that.listaUsuarios.length + 1,
              nombre:that.usuario,
              perfil:that.perfil,
              sexo:that.sexo,
            });
            that.mostrar=false;
            alert.present();
          }
          else
          {
            that.mostrar=false;
          }
    }, 3000);
    
  }
  F()
  {
    this.sexo ="Female";
  }
  M()
  {
    this.sexo ="Male";
  }
  validar()
  { 
    let alert1 = this.alertCtrl.create({
      title: 'Error de registro',
      buttons: ['OK'],
      cssClass:'alertDanger',
      subTitle: 'El usuario que ingreso ya éxiste',
      });
    let alert2 = this.alertCtrl.create({
      title: 'Error de registro',
      buttons: ['OK'],
      cssClass:'alertDanger',
      subTitle: 'Debe repetir su contraseña correctamente',
      });
    let alert3 = this.alertCtrl.create({
      title: 'Error de registro',
      buttons: ['OK'],
      cssClass:'alertDanger',
      subTitle: 'Debe completar todos los campos'
      });
    if(this.validarContraseña() && this.validarCampos() && this.validarUsuario())
    {
      return true;
    }
    else
    {
      if(!this.validarCampos())
      {
        alert3.present();
      }
      else
      {
        if(!this.validarUsuario())
        {
          alert1.present();
        }
        else
        {
          alert2.present();
        }
      }
      return false;
    }
  }
  validarContraseña()
  {
    if(this.contrasenia == this.copia)
      return true;
      return false;
  }
  validarUsuario()
  { 
    var valor = true;
    for(let i=0;i<this.listaUsuarios.length;i++)
    {
      if(this.usuario == this.listaUsuarios[i].nombre)
      {
        valor = false;
        break;
      }
    }
    return valor;
  }
  validarCampos()
  { 
    var valor1 = false;
    var valor2 = false;
    var valor3 = false;
    var valor4 = false;
    for(let i= 0;i<this.usuario.length;i++)
    {   
      if(this.usuario.charAt(i) != ' ')
      {
        valor1 = true;
        break;
      }
    }
    for(let i= 0;i<this.perfil.length;i++)
    {   
      if(this.perfil.charAt(i) != ' ')
      {
        valor2 = true;
        break;
      }
    }
    for(let i= 0;i<this.sexo.length;i++)
    {   
      if(this.sexo.charAt(i) != ' ')
      {
        valor3 = true;
        break;
      }
    }
    for(let i= 0;i<this.contrasenia.length;i++)
    {   
      if(this.contrasenia.charAt(i) != ' ')
      {
        valor4 = true;
        break;
      }
    }
    if(valor1 == true && valor2 == true && valor3 == true && valor4 == true)
      return true;
      return false;
  }
}
