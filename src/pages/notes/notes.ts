import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { NoteFormPage } from './../note-form/note-form';
import { TabNotifierProvider } from './../../providers/tab-notifier/tab-notifier';
import { ApiGetProvider } from './../../providers/api-get/api-get';
import { FileOpener } from '@ionic-native/file-opener';
import { UtilService } from './../../app/services/util.service';
import { APPCONFIG } from './../../app/config';
import { TransfereService } from './../../app/services/transfer.service';
import { NotificationService } from './../../app/services/notification.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

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
    private transferSrv: TransfereService,
    private fileOpener: FileOpener,
    private tabNotifier: TabNotifierProvider,
    public modalCtrl: ModalController,
    private transfer: FileTransfer,
    private file: File
    ) {
  }
  fileTransfer: FileTransferObject = this.transfer.create();

  ionViewDidLoad() {
    this.asset = this.transferSrv.getData();
    this.setTitle(this.asset);
    this.getNotes(this.asset);
    this.tabNotifier.event.subscribe( (data: any) => {
      if (data === 'Notes' || data === 'Comments') {
        this.presentFormModal();
      }
    })
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
    const mime = UtilService.getMIMEtype(ext[0]);
    this.fileTransfer.download(document.data.address,
      this.file.dataDirectory + filename).then((entry) => {
      console.log('download complete: ' + entry.toURL());

      const local = entry.toURL();
      this.fileOpener.open(local, mime).then(() => {
        console.log('File is opened'); 
      }).catch(e => { 
        console.log('Error opening file', e)
      });
    }, (error) => {
      console.log('download is not completed');
      console.log(error);
    });
  }

  presentFormModal() {
    let form = this.modalCtrl.create(NoteFormPage, { commentId: 0 }, {
      cssClass: 'animated slideInRight'
    });
    form.present();
  }

}
