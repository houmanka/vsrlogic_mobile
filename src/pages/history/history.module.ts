import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoryPage } from './history';

@NgModule({
  declarations: [
    HistoryPage,
  ],
  exports: [HistoryPage],
  entryComponents: [HistoryPage],
  imports: [
    IonicPageModule.forChild(HistoryPage),
  ],
})
export class HistoryPageModule {}
