import { Subscription } from 'rxjs/Subscription';
import { UtilService } from './../../app/services/util.service';
import { NotificationService } from './../../app/services/notification.service';
import { ApiService } from './../../app/services/api.service';
import { TransfereService } from './../../app/services/transfer.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TasksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tasks',
  templateUrl: 'tasks.html',
})
export class TasksPage {
  public title;
  public tasks = [];
  private tasksSub = new Subscription();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private transfereService: TransfereService,
    private apiSrv: ApiService,
    private notificationSrv: NotificationService,) {
  }

  ionViewDidLoad() {
    const currentAsset = this.transfereService.getData();
    this.setTitle(currentAsset);
    // this.transfereService.clearData();
    if (!UtilService.empty(currentAsset)) {
      this.getTasks(currentAsset);
      this.tasks = []
    }
  }

  setTitle(currentAsset) {
    if (UtilService.empty(currentAsset)) {
      this.title = 'Sub Assets'
    } else {
      this.title = currentAsset.asset_name;
    }
  }

  private getTasks(item) {
    console.log(item);
    this.tasksSub = this.apiSrv.assetTasks(item).subscribe( (res: any) => {
      this.tasks = res;
    },
    (error) => {
      this.notificationSrv.notify('Error', error);
    });
  }

  ionViewDidLeave(){
    this.tasksSub.unsubscribe();
  }

  cssClass(status) {
    switch (status) {
      case 'wip':
        return 'primary';
      case 'overdue':
        return 'danger';
      case 'completed':
        return 'secondary';
      default:
        return 'dark';
    }
  }

  

}
