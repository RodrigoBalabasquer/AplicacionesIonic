import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VacacionesPage } from './vacaciones';

@NgModule({
  declarations: [
    VacacionesPage,
  ],
  imports: [
    IonicPageModule.forChild(VacacionesPage),
  ],
})
export class VacacionesPageModule {}
