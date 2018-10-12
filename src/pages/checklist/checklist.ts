import { NotificationService } from './../../app/services/notification.service';
import { ApiService } from './../../app/services/api.service';
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
    private apiSrv: ApiService,
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
    
  }

}
