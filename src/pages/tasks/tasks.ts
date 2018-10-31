import { TaskFromPage } from './../task-from/task-from';
import { LoaderProvider } from './../../providers/loader/loader';
import { ApiGetProvider } from './../../providers/api-get/api-get';
import { TaskDetailsPage } from './../task-details/task-details';
import { Subscription } from 'rxjs/Subscription';
import { UtilService } from './../../app/services/util.service';
import { NotificationService } from './../../app/services/notification.service';
import { TransfereService } from './../../app/services/transfer.service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Navbar } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tasks',
  templateUrl: 'tasks.html',
})
export class TasksPage {
  public title;
  public tasks = [];
  private tasksSub = new Subscription();
  public showToolbar = true;
  @ViewChild (Navbar) navBar : Navbar; // add this line

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private transfereService: TransfereService,
    private apiSrv: ApiGetProvider,
    private notificationSrv: NotificationService,
    public modalCtrl: ModalController,
    private loader: LoaderProvider,
    ) {
  }

  ionViewDidLoad() {
    const params = this.navParams.get('params');
    if (!UtilService.empty(params) && params.root === true) {
      this.showToolbar = false;
      this.title = 'Tasks';
      this.getTasks();
    } else {
      const currentAsset = this.transfereService.getData();
      this.title = UtilService.setTitle(currentAsset, 'Sub Assets');

      // this.transfereService.clearData();
      if (!UtilService.empty(currentAsset)) {
        this.getTasks(currentAsset);
        this.tasks = []
      }
    }
  }

  private getTasks(item?) {
    this.loader.presentLoadingDefault();
    if (UtilService.empty(item)) {
      this.tasksSub = this.apiSrv.globalTasks().subscribe( (res: any) => {
        this.tasks = res;
        this.loader.dismiss();
      },
      (error) => {
        this.loader.dismiss();
        this.notificationSrv.notify('Error', error);
      });
    } else {
      this.tasksSub = this.apiSrv.assetTasks(item).subscribe( (res: any) => {
        this.tasks = res;
        this.loader.dismiss();      
      },
      (error) => {
        this.loader.dismiss();
        this.notificationSrv.notify('Error', error);
      });
    }
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

  navigate(task) {
    let profileModal: any = this.presentTaskDetailsModal(task);
    // this.navCtrl.push(TaskDetailsPage, {params: task});
    profileModal.present();
  }

  presentTaskDetailsModal(task) {
    return this.modalCtrl.create(TaskDetailsPage, { params: task });
  }

  back() {
    this.navCtrl.pop()
  }

  add() {
    this.navCtrl.push(TaskFromPage);
  }
  

}
