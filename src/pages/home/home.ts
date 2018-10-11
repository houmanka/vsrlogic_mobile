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
      {name: 'History', page: 'history'},
      {name: 'Search', page: 'search'}
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
