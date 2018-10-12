import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskNotesPage } from './task-notes';

@NgModule({
  declarations: [
    TaskNotesPage,
  ],
  imports: [
    IonicPageModule.forChild(TaskNotesPage),
  ],
})
export class TaskNotesPageModule {}
