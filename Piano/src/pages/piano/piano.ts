import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginPage} from '../login/login';
import { ActionSheetController } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase  } from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

/**
 * Generated class for the PianoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-piano',
  templateUrl: 'piano.html',
})
export class PianoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public actionControler:ActionSheetController,
  public nativeAudio:NativeAudio,public alertCtrl:AlertController,public toastCtrl: ToastController,
  public fireDatabase: AngularFireDatabase) {
    this.nativeAudio.preloadSimple('uniqueId1', 'assets/audio/gato.mp3');
    this.nativeAudio.preloadSimple('uniqueId2', 'assets/audio/perro.mp3');
    this.nativeAudio.preloadSimple('uniqueId3', 'assets/audio/vaca.mp3');
    this.nativeAudio.preloadSimple('uniqueId4', 'assets/audio/caballo.mp3');
    this.nativeAudio.preloadSimple('uniqueId5', 'assets/audio/gallo.mp3');
    this.nativeAudio.preloadSimple('uniqueId6', 'assets/audio/piano1.mp3');
    this.nativeAudio.preloadSimple('uniqueId7', 'assets/audio/piano2.mp3');
    this.nativeAudio.preloadSimple('uniqueId8', 'assets/audio/piano3.mp3');
    this.nativeAudio.preloadSimple('uniqueId9', 'assets/audio/piano4.mp3');
    this.nativeAudio.preloadSimple('uniqueId10', 'assets/audio/piano5.mp3');
    this.usuario = this.navParams.get("usuario");
    this.tasks = this.fireDatabase.list('/sonidos');
    this.tasks.subscribe(
      sonido => this.listaDeSonidos = sonido,
    );
  }
  public usuario: string;
  public tasks: FirebaseListObservable<any>;
  public listaDeSonidos:Array<any>=[];
  public valor:string ="piano";
  public grabar:boolean=false;
  ionViewDidLoad() {
    console.log('ionViewDidLoad PianoPage');
  }
  Mostrar()
  { 
    let toastCtrl1 = this.toastCtrl.create({
            message: 'Comienzo de Grabación!!!',
            position: 'middle',
            duration: 3000
            });
    let toastCtrl2 = this.toastCtrl.create({
            message: 'Fin de Grabación!!!',
            position: 'middle',
            duration: 3000
            });
    let Action = this.actionControler.create({
      cssClass: 'action-sheets-basic-page',
      title: 'Menú de Opciones',
      buttons: [
       {
         text: 'Salir',
         role: 'destructive',
         icon: 'md-log-out',
         handler: () => {
           this.Volver();
         }
       },
       {
         text: 'Temas',
         icon: 'md-musical-notes',
         handler: () => {
           this.cambiarTema();
         }
       }, 
       {
         text: 'Reproducir',
         icon: 'md-play',
         handler: () => {
           this.reproducir();
         }
       },
       {
         text: 'Grabar/Parar',
         icon: 'md-mic',
         handler: () => {
            if(this.grabar == true)
            {
              toastCtrl2.present();
              this.grabar = false;
            }
            else
            {
              for(let i=0;i<this.listaDeSonidos.length;i++)
              {
                console.log(this.listaDeSonidos[i]);
                if(this.listaDeSonidos[i].usuario == this.usuario){
                  this.tasks.remove(this.listaDeSonidos[i].$key);
                  i--;
                }
                
              }
              
              toastCtrl1.present();
              this.grabar = true;
            }
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
  Tocar1()
  {
    switch(this.valor)
    {
      case"piano":
        this.nativeAudio.play('uniqueId6');
        if(this.grabar){
        this.tasks.push({
        sonido: 'uniqueId6',
        usuario:this.usuario,
        });}
        break
      case"animales":
        this.nativeAudio.play('uniqueId1');
        if(this.grabar){
        this.tasks.push({
        sonido: 'uniqueId1',
        usuario:this.usuario,
        });}
        break;
    }
  }
  Tocar2()
  {
    switch(this.valor)
    {
      case"piano":
        this.nativeAudio.play('uniqueId7');
        if(this.grabar){
        this.tasks.push({
        sonido: 'uniqueId7',
        usuario:this.usuario,
        });}
        break
      case"animales":
        this.nativeAudio.play('uniqueId2');
        if(this.grabar){
        this.tasks.push({
        sonido: 'uniqueId2',
        usuario:this.usuario,
        });}
        break;
    }
  }
  Tocar3()
  {
    switch(this.valor)
    {
      case"piano":
        this.nativeAudio.play('uniqueId8');
        if(this.grabar){
        this.tasks.push({
        sonido: 'uniqueId8',
        usuario:this.usuario,
        });}
        break
      case"animales":
        this.nativeAudio.play('uniqueId3');
        if(this.grabar){
        this.tasks.push({
        sonido: 'uniqueId3',
        usuario:this.usuario,
        });}
        break;
    }
  }
  Tocar4()
  {
    switch(this.valor)
    {
      case"piano":
        this.nativeAudio.play('uniqueId9');
        if(this.grabar){
        this.tasks.push({
        sonido: 'uniqueId9',
        usuario:this.usuario,
        });}
        break
      case"animales":
        this.nativeAudio.play('uniqueId4');
        if(this.grabar){
        this.tasks.push({
        sonido: 'uniqueId4',
        usuario:this.usuario,
        });}
        break;
    }
  }
  Tocar5()
  {
    switch(this.valor)
    {
      case"piano":
        this.nativeAudio.play('uniqueId10');
        if(this.grabar){
        this.tasks.push({
        sonido: 'uniqueId10',
        usuario:this.usuario,
        });}
        break
      case"animales":
        this.nativeAudio.play('uniqueId5');
        if(this.grabar){
        this.tasks.push({
        sonido: 'uniqueId5',
        usuario:this.usuario,
        });}
        break;
    }
  }
  cambiarTema()
  {
    let alert = this.alertCtrl.create();
    alert.setTitle('TemasDisponibles Disponibles');
    alert.addInput({
      type: 'radio',
      label: 'Tonos de Piano',
      value: 'piano',
      checked: true
    });
    alert.addInput({
      type: 'radio',
      label: 'Tonos de Animales',
      value: 'animales',
    });
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.valor = data
      }
    });
    alert.present();
  }
  Volver()
  { 
    let alert = this.alertCtrl.create({
      title: 'Cierre de sesión',
      cssClass:'alertInfo',
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
  reproducir()
  { 
    var timer=0;
    var esto = this;
    for(let i=0;i<this.listaDeSonidos.length;i++)
    {
      if(this.listaDeSonidos[i].usuario == this.usuario)
      {
        setTimeout(function(){ 
        esto.nativeAudio.play(esto.listaDeSonidos[i].sonido );
        }, timer);
        timer = timer + 2000
      }
    }
  }
}

