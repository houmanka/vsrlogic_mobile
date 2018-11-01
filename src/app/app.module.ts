import { TaskFromPage } from './../pages/task-from/task-from';
import { SubAssetFormPage } from './../pages/sub-asset-form/sub-asset-form';
import { AssetFormPage } from './../pages/asset-form/asset-form';
import { NoteFormPage } from './../pages/note-form/note-form';
import { TruncatePipe } from './pipes/limited-to.pipe';
import { SearchPage } from './../pages/search/search';
import { AssetHistoryPage } from './../pages/asset-history/asset-history';
import { TaskDocumentPage } from './../pages/task-document/task-document';
import { ChecklistPage } from './../pages/checklist/checklist';
import { GlobalHistoryPage } from './../pages/global-history/global-history';
import { TaskDetailsPage } from './../pages/task-details/task-details';
import { DocumentDetailsPage } from './../pages/document-details/document-details';
import { NotesPage } from './../pages/notes/notes';
import { TasksPage } from './../pages/tasks/tasks';
import { DocumentsPage } from './../pages/documents/documents';
import { AssetTabsPage } from './../pages/asset-tabs/asset-tabs';
import { LoginPageModule } from './../pages/login/login.module';
import { SubAssetsPageModule } from './../pages/sub-assets/sub-assets.module';
import { ApiService } from './services/api.service';
import { NotificationService } from './services/notification.service';
import { AssetsPage } from './../pages/assets/assets';
import { BrowserModule, Title } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TransfereService } from './services/transfer.service';
import { HttpClientModule } from '@angular/common/http';
import { HistoryPage } from '../pages/history/history';
import { FileOpener } from '@ionic-native/file-opener'
import { TaskNotesPage } from '../pages/task-notes/task-notes';
import { SetTitleProvider } from '../providers/set-title/set-title';

import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { ApiPostProvider } from '../providers/api-post/api-post';
import { ApiGetProvider } from '../providers/api-get/api-get';
import { TabNotifierProvider } from '../providers/tab-notifier/tab-notifier';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutosizeDirective } from '../directives/autosize/autosize';
import { Camera } from '@ionic-native/camera';
import { Diagnostic } from '@ionic-native/diagnostic';
import { SystemCheckProvider } from '../providers/system-check/system-check';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { ApiDeleteProvider } from '../providers/api-delete/api-delete';
import { LoaderProvider } from '../providers/loader/loader';
import { MembersProvider } from '../providers/members/members';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AssetsPage,
    DocumentsPage,
    TasksPage,
    NotesPage,
    HistoryPage,
    AssetTabsPage,
    DocumentDetailsPage,
    TaskDetailsPage,
    GlobalHistoryPage,
    ChecklistPage,
    TaskDocumentPage,
    TaskNotesPage,
    AssetHistoryPage,
    SearchPage,
    TruncatePipe,
    NoteFormPage,
    AutosizeDirective,
    AssetFormPage,
    SubAssetFormPage,
    TaskFromPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SubAssetsPageModule,
    LoginPageModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    AssetsPage,
    AssetTabsPage,
    DocumentsPage,
    TasksPage,
    NotesPage,
    HistoryPage,
    DocumentDetailsPage,
    TaskDetailsPage,
    GlobalHistoryPage,
    ChecklistPage,
    TaskDocumentPage,
    TaskNotesPage,
    AssetHistoryPage,
    SearchPage,
    NoteFormPage,
    AssetFormPage,
    SubAssetFormPage,
    TaskFromPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TransfereService,
    NotificationService,
    ApiService,
    FileOpener,
    Title,
    SetTitleProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SetTitleProvider,
    FileTransfer, FileTransferObject, File,
    ApiPostProvider,
    ApiGetProvider,
    TabNotifierProvider,
    Camera,
    Diagnostic,
    SystemCheckProvider,
    AndroidPermissions,
    ApiDeleteProvider,
    LoaderProvider,
    MembersProvider
  ]
})
export class AppModule {}
