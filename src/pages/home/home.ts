import { LoginPage } from './../login/login';
import { UtilService } from './../../app/services/util.service';
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
      {name: 'Search', page: SearchPage},
      {name: 'Logout', page: LoginPage}
    ];
  }

  public navigate(item) {
    if(!UtilService.empty(this.navCtrl.getPrevious())) {
      this.navCtrl.remove(this.navCtrl.getPrevious().index);
    }
    if (item.name == 'Tasks') {
      this.navCtrl.push(item.page, {params: {root: true}});
    } else if (item.name == 'Logout') {
      this.navCtrl.push(item.page, {params: {logout: true}});
    } else {
      this.navCtrl.push(item.page);
    }
  }

}
