import { ChecklistInterface } from './../../app/services/api.service';
import { ApiPostProvider } from './../../providers/api-post/api-post';
import { ApiGetProvider } from './../../providers/api-get/api-get';
import { NotificationService } from './../../app/services/notification.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/**
 * Generated class for the ChecklistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checklist',
  templateUrl: 'checklist.html',
})
export class ChecklistPage {

  public task;
  public checklists = [];
  public title;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private apiSrv: ApiGetProvider,
    private apiPost: ApiPostProvider,
    private notificationSrv: NotificationService,
    ) {
  }

  ionViewDidLoad() {
    this.task = this.navParams.get('params');
    this.title = this.task.data.title;
    this.apiSrv.checklist(this.task.id).subscribe( (res: any) => {
      this.checklists = res;
    },
    (error) => {
      this.notificationSrv.notify('Error', error);
    });
  }

  toggleCompleted(checklist) {
    const checklistObj: ChecklistInterface = {
      completed: checklist.data.completed,
      content: checklist.data.content,
      taskId: this.task.id,
      checkListGroupId: checklist.data.checklist_group_id,
      checklistId:checklist.id
    }
    this.apiPost.updateChecklist(checklistObj).subscribe( (res: any) => {
      this.notificationSrv.notify('Notice', 'Updated Successfully', null, 'toast');
    },
    (error) => {
      this.notificationSrv.notify('Error', error);
    });
  }

}
