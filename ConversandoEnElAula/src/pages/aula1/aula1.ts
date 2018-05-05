import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ConversacionPage} from '../conversacion/conversacion';
import { FirebaseListObservable, AngularFireDatabase  } from 'angularfire2/database';


/**
 * Generated class for the Aula1Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aula1',
  templateUrl: 'aula1.html',
})
export class Aula1Page {

  public mensaje:string = "";
  //public listado: string[] = [];
  public usuario: string;
  tasks: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams,public fireDatabase: AngularFireDatabase) {
    this.usuario = this.navParams.get("usuario");
    this.tasks = this.fireDatabase.list('/aula1');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Aula1Page');
  }
  EnviarAula1()
  {
    //this.listado.push('{mensaje:'+this.mensaje+',usuario:'+this.usuario}');
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
  Volver1()
  {
    this.navCtrl.setRoot(ConversacionPage,{"usuario":this.navParams.get('usuario')});
  }
}
