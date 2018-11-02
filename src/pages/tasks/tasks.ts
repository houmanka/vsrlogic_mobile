import { TaskProvider } from './../../providers/task/task';
import { TaskFromPage } from './../task-from/task-from';
import { TaskDetailsPage } from './../task-details/task-details';
import { UtilService } from './../../app/services/util.service';
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
  public showToolbar = true;
  @ViewChild (Navbar) navBar : Navbar; // add this line

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private transfereService: TransfereService,
    private taskSrv: TaskProvider,
    public modalCtrl: ModalController,
    ) {
  }

  ionViewDidLoad() {
    this.taskSrv.globalTaskDataReady.subscribe( (res: any) => {
      this.tasks = res;
    });

    this.taskSrv.taskListReady.subscribe( (res: any) => {
      this.tasks = res;
    });

    const params = this.navParams.get('params');
    if (!UtilService.empty(params) && params.root === true) {
      this.showToolbar = false;
      this.title = 'Tasks';
      this.getTasks();
    } else {
      const currentAsset = this.transfereService.getData();
      this.title = UtilService.setTitle(currentAsset, 'Sub Assets');
      if (!UtilService.empty(currentAsset)) {
        this.getTasks(currentAsset);
        this.tasks = []
      }
    }
  }

  private getTasks(item?) {
    if (UtilService.empty(item)) {
      this.taskSrv.globalTasks();
    } else {
      this.taskSrv.assetTasks(item);
    }
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

  edit(task) {
    this.navCtrl.push(TaskFromPage, {params: task});
  }

}
