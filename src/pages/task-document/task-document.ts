import { ApiGetProvider } from './../../providers/api-get/api-get';
import { APPCONFIG } from './../../app/config';
import { NotificationService } from './../../app/services/notification.service';
import { FileOpener } from '@ionic-native/file-opener';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TaskDocumentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-task-document',
  templateUrl: 'task-document.html',
})
export class TaskDocumentPage {
  public documents = [];
  public rootAddress = APPCONFIG.imageUrl
  public title;
  private task;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private apiSrv: ApiGetProvider,
    private notificationSrv: NotificationService,
    private fileOpener: FileOpener,
    ) {
  }

  ionViewDidLoad() {
    this.task = this.navParams.get('params');
    this.title = this.task.data.title;
    this.apiSrv.taskDocument(this.task.id).subscribe( (res: any) => {
      this.documents = res;
    },
    (error) => {
      this.notificationSrv.notify('Error', error);
    });
  }

  openPhoto(document) {
    let filename = document.data.address
    filename = filename.replace(/^.*[\\\/]/, '')
    const ext = (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
    if (ext[0] === 'png') {
      this.fileOpener.open(document.data.address, 'image/png');
    } else if(ext[0] === 'pdf') {
      this.fileOpener.open(document.data.address, 'application/pdf');
    }
   
  }

}
