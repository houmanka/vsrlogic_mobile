import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssetFormPage } from './asset-form';

@NgModule({
  declarations: [
    AssetFormPage,
  ],
  imports: [
    IonicPageModule.forChild(AssetFormPage),
  ],
})
export class AssetFormPageModule {}
