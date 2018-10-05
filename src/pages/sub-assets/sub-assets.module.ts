import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubAssetsPage } from './sub-assets';

@NgModule({
  declarations: [
    SubAssetsPage,
  ],
  imports: [
    IonicPageModule.forChild(SubAssetsPage),
  ],
  entryComponents: [
    SubAssetsPage
  ],
  exports: [SubAssetsPage]
})
export class SubAssetsPageModule {}
