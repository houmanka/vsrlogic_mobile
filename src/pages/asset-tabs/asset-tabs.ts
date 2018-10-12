import { AssetHistoryPage } from './../asset-history/asset-history';
import { HomePage } from './../home/home';
import { AssetsPage } from './../assets/assets';
import { UtilService } from './../../app/services/util.service';
import { TransfereService } from './../../app/services/transfer.service';
import { TasksPage } from './../tasks/tasks';
import { SubAssetsPage } from './../sub-assets/sub-assets';
import { NotesPage } from './../notes/notes';
import { DocumentsPage } from './../documents/documents';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar, App } from 'ionic-angular';

/**
 * Generated class for the AssetTabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-asset-tabs',
  templateUrl: 'asset-tabs.html',
})
export class AssetTabsPage {
  @ViewChild(Navbar) navBar: Navbar;
  public title;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    // private transfereService: TransfereService,
    // private app: App
    ) {
  }

  public tabs = [
    {page: SubAssetsPage, title: 'Sub Assets', icon: 'home'},
    {page: DocumentsPage, title: 'Documents', icon: 'document'},
    {page: TasksPage, title: 'Tasks', icon: 'list'},
    {page: NotesPage, title: 'Notes', icon: 'text'},
  ]

  ionViewDidLoad() {
    // const currentAsset = this.transfereService.getData();
    // let viewTitle;
    // if (UtilService.empty(currentAsset)) {
    //   viewTitle = 'Sub Assets'
    // } else {
    //   viewTitle = currentAsset.asset_name;
    // }
    //   this.title = viewTitle;
  }

  ionViewWillEnter(){
   
  }

  home() {
    // this.navCtrl.push(AssetsPage);
    this.navCtrl.push(AssetsPage);
  }

  dashboard() {
    this.navCtrl.goToRoot({animate: true});
  }
  
  history() {
    this.navCtrl.push(AssetHistoryPage)
  }

}
