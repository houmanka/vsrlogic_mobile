import { NotesPage } from './../pages/notes/notes';
import { TasksPage } from './../pages/tasks/tasks';
import { DocumentsPage } from './../pages/documents/documents';
import { AssetTabsPage } from './../pages/asset-tabs/asset-tabs';
import { LoginPageModule } from './../pages/login/login.module';
import { SubAssetsPageModule } from './../pages/sub-assets/sub-assets.module';
import { ApiService } from './services/api.service';
import { NotificationService } from './services/notification.service';
import { AssetsPage } from './../pages/assets/assets';
import { BrowserModule } from '@angular/platform-browser';
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
    AssetTabsPage
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
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TransfereService,
    NotificationService,
    ApiService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
