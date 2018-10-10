import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TaskDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-task-details',
  templateUrl: 'task-details.html',
})
export class TaskDetailsPage {
  public task;
  public title;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.task = this.navParams.get('params');
    this.title = this.task.data.title;
  }

  ionViewWillEnter(){

    console.log(this.task);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskDetailsPage');

  }

  dismiss() {
    this.navCtrl.pop();
  }

}
