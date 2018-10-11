import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GlobalHistoryPage } from './global-history';

@NgModule({
  declarations: [
    GlobalHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(GlobalHistoryPage),
  ],
})
export class GlobalHistoryPageModule {}
