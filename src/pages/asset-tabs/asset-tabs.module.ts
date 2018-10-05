import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssetTabsPage } from './asset-tabs';

@NgModule({
  declarations: [
    AssetTabsPage,
  ],
  exports: [AssetTabsPage],
  entryComponents: [AssetTabsPage],
  imports: [
    IonicPageModule.forChild(AssetTabsPage),
  ],
})
export class AssetTabsPageModule {}
