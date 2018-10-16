import { ApiGetProvider } from './../../providers/api-get/api-get';
import { FileOpener } from '@ionic-native/file-opener';
import { UtilService } from './../../app/services/util.service';
import { APPCONFIG } from './../../app/config';
import { TransfereService } from './../../app/services/transfer.service';
import { NotificationService } from './../../app/services/notification.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html',
})
export class NotesPage {
  private asset;
  public title;
  public rootAddress = APPCONFIG.imageUrl
  public documents = [];
  public notes = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private apiSrv: ApiGetProvider,
    private notificationSrv: NotificationService,
    private transferSrv: TransfereService, private fileOpener: FileOpener) {
  }

  ionViewDidLoad() {
    this.asset = this.transferSrv.getData();
    this.setTitle(this.asset);
    this.getNotes(this.asset);
  }

  setTitle(currentAsset) {
    if (UtilService.empty(currentAsset)) {
      this.title = 'Notes'
    } else {
      this.title = currentAsset.asset_name;
    }
  }

  private getNotes(item) {
    console.log(item)
    this.apiSrv.commentList(item.asset_id).subscribe( (res: any) => {
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
