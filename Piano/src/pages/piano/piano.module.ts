import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PianoPage } from './piano';

@NgModule({
  declarations: [
    PianoPage,
  ],
  imports: [
    IonicPageModule.forChild(PianoPage),
  ],
})
export class PianoPageModule {}
