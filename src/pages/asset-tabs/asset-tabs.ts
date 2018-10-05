import { TasksPage } from './../tasks/tasks';
import { SubAssetsPage } from './../sub-assets/sub-assets';
import { NotesPage } from './../notes/notes';
import { DocumentsPage } from './../documents/documents';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  public tabs = [
    {page: DocumentsPage, title: 'Documents', icon: 'document'},
    {page: TasksPage, title: 'Tasks', icon: 'list'},
    {page: NotesPage, title: 'Notes', icon: 'text'},
    {page: SubAssetsPage, title: 'Sub Assets', icon: 'home'},
  ]

  ionViewDidLoad() {

  }
  

}
