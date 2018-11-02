import { TaskProvider } from './../../providers/task/task';
import { UtilService } from './../../app/services/util.service';
import { NotificationService } from './../../app/services/notification.service';
import { LoaderProvider } from './../../providers/loader/loader';
import { MembersProvider } from './../../providers/members/members';
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
  public taskMembers = [];

  public task: TaskPostInterface = {
    title: '',
    description: '',
    due_by: new Date().toISOString(),
    status: 'wip',
    task_id: 0,
    asset_id: this.currentAsset,
    members: []
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private transfereService: TransfereService,
    private memberService: MembersProvider,
    private loader: LoaderProvider,
    private notificationSrv: NotificationService,
    private taskSrv: TaskProvider,
    
    ) {
      this.currentAsset = this.transfereService.getData();
  }

  ionViewDidLoad() {
    
    this.taskSrv.taskCreated.subscribe( (res: any) => {
      this.dismissLoader();
      if (res === true) {
        this.notificationSrv.notify("Success", "Task Created!", null, "toast");
        const currentAsset = this.transfereService.getData();
        this.taskSrv.assetTasks(currentAsset);
        this.navCtrl.pop();
      } else {
        this.notificationSrv.notify('Danger', res.error);
      }
    });

    this.memberService.dataReady.subscribe((data: any) => {
      this.dismissLoader();
      if (UtilService.empty(data)) {
        this.notificationSrv.notify('Error', 'Something gone wrong in calling the Asset members!!');
      } else {
        this.taskMembers = data;
      }
    });
    this.memberService.members(this.currentAsset.asset_id);
  }

  back() {
    this.navCtrl.pop();
  }

  add() {
    const data: TaskPostInterface = this.prepareData();
    this.loader.presentLoadingDefault();
    this.taskSrv.createTask(data);   
  }

  private prepareData(): TaskPostInterface {
    let date: any = this.task.due_by;
    date = date.split("T")[0]
    const members = []
    this.task.members.forEach( memberIndex => {
      members.push(this.taskMembers[memberIndex].id)
    });
    return {
      title: this.task.title,
      description: this.task.description,
      due_by: date,
      asset_id: this.currentAsset.asset_id,
      task_id: null,
      status: this.task.status,
      members: members
    };
  }

  dismissLoader() {
    if(!UtilService.empty(this.loader)) {
      this.loader.dismiss();
    }
  }

}
