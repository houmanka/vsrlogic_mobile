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
    name: '',
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
    ) {
      this.currentAsset = this.transfereService.getData();
  }

  ionViewDidLoad() {
    // this.loader.presentLoadingDefault()
    this.memberService.dataReady.subscribe((data: any) => {
      this.loader.dismiss();
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
    console.log("Post data to server")
      // NOTE: task.members is the collection of the index of this.taskMembers.
      // so you need to loop through the task.members, and do 
      // this.taskMembers[index].id which will be the member id
      // then replace the task.members
      // When task created, user has to get out of this view
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
