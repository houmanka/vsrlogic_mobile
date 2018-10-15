import { SearchPage } from './../search/search';
import { GlobalHistoryPage } from './../global-history/global-history';
import { AssetsPage } from './../assets/assets';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TasksPage } from '../tasks/tasks';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public data;
  constructor(public navCtrl: NavController) {

    this.data = [
      {name: 'Assets', page: AssetsPage},
      {name: 'Tasks', page: TasksPage},
      {name: 'History', page: GlobalHistoryPage},
      {name: 'Search', page: SearchPage}
    ];
  }

  public navigate(item) {
    if (item.name == 'Tasks') {
      this.navCtrl.push(item.page, {params: {root: true}});
    } else {
      this.navCtrl.push(item.page);
    }
  }

}
