import { ApiGetProvider } from './../../providers/api-get/api-get';
import { APPCONFIG } from './../../app/config';
import { UtilService } from './../../app/services/util.service';
import { FileOpener } from '@ionic-native/file-opener';
import { NotificationService } from './../../app/services/notification.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TaskNotesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-task-notes',
  templateUrl: 'task-notes.html',
})
export class TaskNotesPage {
  private task;
  public title;
  public rootAddress = APPCONFIG.imageUrl
  public documents = [];
  public notes = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private apiSrv: ApiGetProvider,
    private notificationSrv: NotificationService,
    private fileOpener: FileOpener) {
  }

  ionViewDidLoad() {
    this.task = this.navParams.get('params');
    this.title = this.task.data.title;
    this.getNotes(this.task);
  }

  private getNotes(item) {
    console.log(item)
    this.apiSrv.taskCommentList(item.id).subscribe( (res: any) => {
      this.notes = res;
    },
    (error) => {
      this.notificationSrv.notify('Error', error);
    });
  }



  public conversion(content) {
    if (!UtilService.empty(content)) {
      const reg = /\\r\\n/gm;
      return content.replace(reg, '<br />');
    } else {
      return content;
    }
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
