import { AssetsPage } from './../assets/assets';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public data;
  constructor(public navCtrl: NavController) {

    this.data = [
      {name: 'Assets', page: AssetsPage},
      {name: 'Tasks', page: 'tasks'},
      {name: 'History', page: 'history'},
      {name: 'Search', page: 'search'}
    ];
  }

  public navigate(item) {
    this.navCtrl.push(item.page);
  }

}
