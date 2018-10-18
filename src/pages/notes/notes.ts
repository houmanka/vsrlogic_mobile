import { ApiDeleteProvider } from './../../providers/api-delete/api-delete';
import { NoteInterface } from './../../app/services/api.service';
import { ApiPostProvider } from './../../providers/api-post/api-post';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { NoteFormPage } from './../note-form/note-form';
import { ApiGetProvider } from './../../providers/api-get/api-get';
import { FileOpener } from '@ionic-native/file-opener';
import { UtilService } from './../../app/services/util.service';
import { APPCONFIG } from './../../app/config';
import { TransfereService } from './../../app/services/transfer.service';
import { NotificationService } from './../../app/services/notification.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';


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
    private apiPostSrv: ApiPostProvider,
    private apiDeleteSrv: ApiDeleteProvider,
    private notificationSrv: NotificationService,
    private transferSrv: TransfereService,
    private fileOpener: FileOpener,
    public modalCtrl: ModalController,
    private transfer: FileTransfer,
    private file: File,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
    ) {
  }
  fileTransfer: FileTransferObject = this.transfer.create();

  ionViewDidLoad() {
    this.asset = this.transferSrv.getData();
    this.title = UtilService.setTitle(this.asset, 'Notes');
    this.getNotes(this.asset);
  }

  private getNotes(item) {
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

  presentFormModal(params?) {
    let form = this.modalCtrl.create(NoteFormPage, params);
    form.onDidDismiss(() => {
      this.getNotes(this.asset);
    });
    form.present();
  }

  add() {
    this.insertPrimaryNote();
  }

  delete(note) {
    this.presentConfirm(note)
  }

  deleteConfirmed(note) {
    this.apiDeleteSrv.deleteComment(note.id).subscribe( (res: any) => {
      this.presentToast('Deleted Successfully');
      this.getNotes(this.asset);
    }, (error) => {
      console.log(error);
    });
  }

  private insertPrimaryNote() {
    const data: NoteInterface = {
      asset_id: this.asset.asset_id,
      resource: "assets",
      resource_id: this.asset.asset_id,
      parent_id: null,
      content: "Enter your Comment...",
      id: null
    }
    this.apiPostSrv.insertComment(data).subscribe( (res: any) => {
      this.presentFormModal({params: res});
    }, (error) => {
      console.log(error);
    });
  }

  presentToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  presentConfirm(note) {
    let alert = this.alertCtrl.create({
      title: 'Confirm Deletion',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.deleteConfirmed(note);
          }
        }
      ]
    });
    alert.present();
  }


}
