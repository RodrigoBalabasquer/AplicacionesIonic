import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import {BarcodeScanner} from '@ionic-native/barcode-scanner';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase  } from 'angularfire2/database';
/**
 * Generated class for the QrPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qr',
  templateUrl: 'qr.html',
})
export class QrPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private barcodeScanner: BarcodeScanner,
  public alertCtrl: AlertController,public fireDatabase: AngularFireDatabase,public toastCtrl:ToastController) {
    this.tasks = this.fireDatabase.list('codigos');
    this.tasks.subscribe(
        codigo => this.listaCodigos = codigo,
      );
    this.tasks2 = this.fireDatabase.list('usuarios');
    this.tasks2.subscribe(
        user => this.listaUsuarios = user,

      );
  }
   tasks: FirebaseListObservable<any>;
   tasks2: FirebaseListObservable<any>;
   //public listaUsuarios:Array<any> = this.navParams.get("listaUsuarios");
   public listaUsuarios:Array<any> =[];
   public usuario = this.navParams.get("usuario");
   public codigo:string;
   public listaCodigos:Array<any> = [];
   public mostrar = false;
   
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad QrPage');
  }
  escaneo()
  {
    this.mostrar = true;
    var that = this
    setTimeout(function(){ 
        that.Escaneo();
        }, 3000);
  }
  
  Escaneo()
  { 
    this.barcodeScanner.scan().then(barcodeData =>
    {
      this.CargaCredito(barcodeData.text);
    })
  }
  CargaCredito(codigo:string)
  {   
      this.mostrar = false;
      this.codigo = codigo;
      var i = 0;
      var y = 0;
      var carga=true;
      var coincidencia=false;
      var creditos= 0;
     let toastCtrl1 = this.toastCtrl.create({
            message: 'Código No Disponible',
            position: 'middle',
            duration: 2000
          });
      let toastCtrl2 = this.toastCtrl.create({
            message: 'Este código ya se ha cargado',
            position: 'middle',
            duration: 2000
            });
      for(y=0;y<this.listaCodigos.length;y++)
      {
          if(codigo == this.listaCodigos[y].codigo)
          { 
              coincidencia = true;
              if(this.listaCodigos[y].disponible)
              {
                this.listaCodigos[y].disponible = false;
                creditos = this.listaCodigos[y].valor
                
                this.tasks.update( this.listaCodigos[y].$key,{
                disponible: false,
                });
                break;
              }
              else
              {
                toastCtrl2.present();
                carga = false
                break;
              }
          }
      }
      if(coincidencia)
      {
        if(carga)
        {
          for(i= 0;i<this.listaUsuarios.length;i++)
          {
            if(this.listaUsuarios[i].nombre == this.usuario)
            {
              this.listaUsuarios[i].creditos += creditos;
              let toastCtrl3 = this.toastCtrl.create({
              message: 'Se han cargado '+creditos+' créditos',
              position: 'middle',
              duration: 2000
              });
              this.tasks2.update( this.listaUsuarios[i].$key,{
                creditos: this.listaUsuarios[i].creditos,
                });
              toastCtrl3.present();
              break;
            }
          }
        }
      }
      else
      {
        toastCtrl1.present();
      }
  }
  Volver()
  { 
    let alert = this.alertCtrl.create({
      title: 'Cierre de sesión',
      cssClass: 'alertInfo',
      message: 'Seguro que quiere salir',
      buttons: [
        {
          text: 'No',
          handler: () => {
            //console.log('Disagree clicked');
          }
        },
        {
          text: 'Sí',
          handler: () => {
              this.navCtrl.setRoot(LoginPage);
          }
        }
      ]
    });
    alert.present();
  }
}
