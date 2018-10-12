import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssetHistoryPage } from './asset-history';

@NgModule({
  declarations: [
    AssetHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(AssetHistoryPage),
  ],
})
export class AssetHistoryPageModule {}
