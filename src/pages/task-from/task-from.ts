import { TransfereService } from './../../app/services/transfer.service';
import { TaskPostInterface } from './../../app/services/api.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TaskFromPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-task-from',
  templateUrl: 'task-from.html',
})
export class TaskFromPage {
  max = (new Date()).getFullYear() + 5
  min = (new Date()).getFullYear() - 1
  private currentAsset;

  public task: TaskPostInterface = {
    name: '',
    description: '',
    due_by: new Date().toISOString(),
    status: 'wip',
    task_id: 0,
    asset_id: this.currentAsset
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private transfereService: TransfereService,
    ) {
      this.currentAsset = this.transfereService.getData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskFromPage');
  }

  back() {
    this.navCtrl.pop();
  }

  add() {
    console.log("Post data to server")

      let date: any = this.task.due_by;
      date = date.split("T")[0]
      const res = {
        title: this.task.name,
        description: this.task.description,
        due_by: date,
        asset_id: this.currentAsset,
        task_id: null,
        status: this.task.status
      };
      console.log(res)
  }

}
