import { Component } from '@angular/core';
import {ConversacionPage} from '../conversacion/conversacion';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase  } from 'angularfire2/database';

/**
 * Generated class for the Aula2Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aula2',
  templateUrl: 'aula2.html',
})
export class Aula2Page {

  public mensaje:string = "";
  public usuario: string;
  tasks: FirebaseListObservable<any>;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public fireDatabase: AngularFireDatabase) {
    this.usuario = this.navParams.get("usuario");
    this.tasks = this.fireDatabase.list('/aula2');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Aula2Page');
  }
  EnviarAula2()
  {
    if(this.mensaje.length != 0){
    for(let i= 0;i<this.mensaje.length;i++)
    {   
      if(this.mensaje.charAt(i) != ' ')
      {
        this.tasks.push({
        mensaje: this.mensaje,
        usuario:this.usuario
        });
        break;
      }
    }}
    this.mensaje = "";
  }
  Volver2()
  {
    this.navCtrl.setRoot(ConversacionPage,{"usuario":this.navParams.get('usuario')});
  }
}
