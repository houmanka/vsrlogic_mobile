import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubAssetFormPage } from './sub-asset-form';

@NgModule({
  declarations: [
    SubAssetFormPage,
  ],
  imports: [
    IonicPageModule.forChild(SubAssetFormPage),
  ],
})
export class SubAssetFormPageModule {}
