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
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SubAssetsPageModule,
    LoginPageModule,
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
    SearchPage
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
    ApiGetProvider
  ]
})
export class AppModule {}
