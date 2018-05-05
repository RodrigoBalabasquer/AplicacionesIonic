import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Camera,CameraOptions} from '@ionic-native/camera';
import { FirebaseListObservable, AngularFireDatabase  } from 'angularfire2/database';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
/**
 * Generated class for the VisualPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-visual',
  templateUrl: 'visual.html',
})
export class VisualPage {

  public usuario = this.navParams.get("usuario");
  public valor : boolean = true;
  public valor1:boolean = false;
  public image: string = null;
  public listaFotos: Array<any>=[];
  public listaFotosFiltradas: Array<any>=[];
  public mostrar = false;
  
  tasks: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams,private camera: Camera,public fireDatabase: AngularFireDatabase,
   public toastCtrl:ToastController,public alertCtrl:AlertController) {
    this.usuario = this.navParams.get("usuario");
    this.tasks = this.fireDatabase.list('/imagenes');
    this.tasks.subscribe(
        imagen => this.listaFotos = imagen,
      );
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad VisualPage');
  }
  Volver()
  { 
    const toast = this.toastCtrl.create({
      message: 'Usted esta saliendo de la sesión',
      duration: 3000,
      position: 'top',
    });
    var that = this;
    toast.present().then(dato => 
    setTimeout(function(){ 
    that.navCtrl.setRoot(LoginPage) }, 3000));
  }
  cambiarBueno()
  { 
    this.valor1 = true;
    this.listaFotosFiltradas = [];
    for(let i=0;i<this.listaFotos.length;i++)
    {
      if(this.listaFotos[i].atributo == "lindo" && this.listaFotos[i].usuario == this.usuario)
      {
        this.listaFotosFiltradas.push(this.listaFotos[i]);
      }
    }
    this.valor = true;
  }
  cambiarMalo()
  { 
    this.valor1 = true;
    this.listaFotosFiltradas = [];
    for(let i=0;i<this.listaFotos.length;i++)
    {
      if(this.listaFotos[i].atributo == "feo" && this.listaFotos[i].usuario == this.usuario)
      {
        this.listaFotosFiltradas.push(this.listaFotos[i]);
      }
    }
    this.valor = false;
  }
  sacarFoto()
  {
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 100,
      saveToPhotoAlbum:true
    }
    this.mostrar = true;
    var that = this
    setTimeout(function(){ 
        that.camera.getPicture( options )
      .then(imageData => {
        that.image = `data:image/jpeg;base64,${imageData}`;
        that.mostrar = false;
      })
      .catch(error =>{
        console.error( error );
        that.mostrar = false;
      });
    }, 3000);
    
  }
}
