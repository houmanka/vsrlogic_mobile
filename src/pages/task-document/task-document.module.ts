import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskDocumentPage } from './task-document';

@NgModule({
  declarations: [
    TaskDocumentPage,
  ],
  imports: [
    IonicPageModule.forChild(TaskDocumentPage),
  ],
})
export class TaskDocumentPageModule {}
