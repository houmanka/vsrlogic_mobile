import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DocumentDetailsPage } from './document-details';

@NgModule({
  declarations: [
    DocumentDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(DocumentDetailsPage),
  ],
})
export class DocumentDetailsPageModule {}
