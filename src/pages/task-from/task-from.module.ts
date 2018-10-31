import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskFromPage } from './task-from';

@NgModule({
  declarations: [
    TaskFromPage,
  ],
  imports: [
    IonicPageModule.forChild(TaskFromPage),
  ],
})
export class TaskFromPageModule {}
