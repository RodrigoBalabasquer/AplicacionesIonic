import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase  } from 'angularfire2/database';



@IonicPage()
@Component({
  selector: 'page-votacion',
  templateUrl: 'votacion.html',
})
export class VotacionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController,
  public fireDatabase: AngularFireDatabase,public alertCtrl: AlertController) {
    this.tasks = this.fireDatabase.list('votacion');
    this.tasks.subscribe(
        votos => this.listaVotos = votos,
      );
    this.tasks2 = this.fireDatabase.list('usuarios');
    this.tasks2.subscribe(
        user => this.listaUsuarios = user,
      );
      
      
  }
  public vPlantas :number = 0;
  public vMataFuegos : number = 0;
  public listaUsuarios:Array<any> =[];
  public listaVotos:Array<any>;
  public usuario = this.navParams.get("usuario");
  tasks: FirebaseListObservable<any>;
  tasks2: FirebaseListObservable<any>;
  public mostrar=false;
  ionViewDidLoad() {
    console.log('ionViewDidLoad VotacionPage');
  }
  Mostrar()
  {
      this.vPlantas = this.listaVotos[0].cantidad;
      this.vMataFuegos = this.listaVotos[1].cantidad;
      this.mostrar = true;
  }
  Volver()
  {
    let alert = this.alertCtrl.create({
      title: 'Cierre de sesión',
      cssClass:'alertInfo',
      message: 'Seguro que quieres salir',
      buttons: [
        {
          text: 'No',
          handler: () => {
            //console.log('Disagree clicked');
          }
        },
        {
          text: 'SÍ',
          handler: () => {
              this.navCtrl.setRoot(LoginPage);
          }
        }
      ]
    });
    alert.present();
  }
  votarMatafuegos()
  {
    let voto=false;
    for(let i=0;i<this.listaUsuarios.length;i++)
    {
      if(this.listaUsuarios[i].nombre == this.usuario)
      {
        if(!this.listaUsuarios[i].votacion)
        {
          this.tasks2.update( this.listaUsuarios[i].$key,{
          votacion: true,
          });
          this.listaVotos[1].cantidad++;
          this.tasks.update( this.listaVotos[1].$key,{
          cantidad: this.listaVotos[1].cantidad++
          });
          voto=true;
        }
        else
        {
          let toastCtrl1 = this.toastCtrl.create({
          message: 'Usted ya Votó!!!',
          position: 'middle',
          duration: 3000
          });
          toastCtrl1.present();
        }
        break;
      }
    }
    if(voto)
    {
      this.notificar();
    }
  }
  votarPlantas()
  { 
    let voto=false;
    for(let i=0;i<this.listaUsuarios.length;i++)
    {
      if(this.listaUsuarios[i].nombre == this.usuario)
      { 
        if(!this.listaUsuarios[i].votacion)
        {
          this.tasks2.update( this.listaUsuarios[i].$key,{
          votacion: true,
          });
          this.listaVotos[0].cantidad++;
          this.tasks.update( this.listaVotos[0].$key,{
          cantidad: this.listaVotos[0].cantidad++
          });
          voto=true;
        }
        else
        {
          let toastCtrl1 = this.toastCtrl.create({
          message: 'Usted ya Votó!!!',
          position: 'middle',
          duration: 3000
          });
          toastCtrl1.present();
        }
        break;
      }
    }
    if(voto)
    {
      this.notificar();
    }
  }
  notificar()
  {
    let toastCtrl1 = this.toastCtrl.create({
      message: 'Votación éxitosa!!!',
      position: 'middle',
      duration: 3000
    });
      toastCtrl1.present();
      this.vPlantas = this.listaVotos[0].cantidad;
      this.vMataFuegos = this.listaVotos[1].cantidad;
  }
}
