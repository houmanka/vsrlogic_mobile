import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotesPage } from './notes';

@NgModule({
  declarations: [
    NotesPage,
  ],
  exports: [NotesPage],
  entryComponents: [NotesPage],
  imports: [
    IonicPageModule.forChild(NotesPage),
  ],
})
export class NotesPageModule {}
