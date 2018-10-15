import { HomePage } from './../home/home';
import { SearchPage } from './../search/search';
import { SetTitleProvider } from './../../providers/set-title/set-title';
import { AssetHistoryPage } from './../asset-history/asset-history';
import { AssetsPage } from './../assets/assets';
import { TasksPage } from './../tasks/tasks';
import { SubAssetsPage } from './../sub-assets/sub-assets';
import { NotesPage } from './../notes/notes';
import { DocumentsPage } from './../documents/documents';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar, ModalController } from 'ionic-angular';

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
  public assetId;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private setTitleP: SetTitleProvider,
    ) {
  }

  public tabs = [
    {page: SubAssetsPage, title: 'Sub Assets', icon: 'home'},
    {page: DocumentsPage, title: 'Documents', icon: 'document'},
    {page: TasksPage, title: 'Tasks', icon: 'list'},
    {page: NotesPage, title: 'Notes', icon: 'text'},
  ]

  ionViewDidLoad() {
    this.setTitleP.event.subscribe( (res: any) => {
      this.title = res.title;
      this.assetId = res.assetId;
    })
    this.setTitleP.getAssetTitle('Sub Assets');
  }
 
  ionViewWillEnter(){
   
  }

  home() {
    this.navCtrl.push(AssetsPage);
  }

  dashboard() {
    this.navCtrl.push(HomePage);
  }
  
  history() {
    this.navCtrl.push(AssetHistoryPage)
  }

  searchAssets() {
    let profileModal: any = this.presentSearchModal();
    profileModal.present();
  }

  presentSearchModal() {
    return this.modalCtrl.create(SearchPage, { params: {assetId: this.assetId, showBack: true} });
  }

  back() {
    this.navCtrl.pop()
  }

}
