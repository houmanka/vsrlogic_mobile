import { UtilService } from './../../app/services/util.service';
import { FileOpener } from '@ionic-native/file-opener';
import { APPCONFIG } from './../../app/config';
import { ApiService } from './../../app/services/api.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NotificationService } from '../../app/services/notification.service';
import { Subscription } from 'rxjs/Subscription';
import { TransfereService } from '../../app/services/transfer.service';

/**
 * Generated class for the DocumentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-documents',
  templateUrl: 'documents.html',
})
export class DocumentsPage {
  public documents = [];
  private documentSub = new Subscription();
  public rootAddress = APPCONFIG.imageUrl
  private asset;
  public title;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private apiSrv: ApiService,
    private notificationSrv: NotificationService,
    private transferSrv: TransfereService,
    private fileOpener: FileOpener,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DocumentsPage');
    this.asset = this.transferSrv.getData();
    this.setTitle(this.asset);
    this.getDocs(this.asset);
  }

  setTitle(currentAsset) {
    debugger
    if (UtilService.empty(currentAsset)) {
      this.title = 'Sub Assets'
    } else {
      this.title = currentAsset.asset_name;
    }
  }

  private getDocs(item) {
    this.documentSub = this.apiSrv.documents(item).subscribe( (res: any) => {
      this.documents = res;
    },
    (error) => {
      this.notificationSrv.notify('Error', error);
    });
  }

  ionViewDidLeave(){
   this.documentSub.unsubscribe();
  }

  openPhoto(document) {
    let filename = document.data.address
    filename = filename.replace(/^.*[\\\/]/, '')
    const ext = (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
    debugger
    if (ext[0] === 'png') {
      this.fileOpener.open(document.data.address, 'image/png');
    } else if(ext[0] === 'pdf') {
      this.fileOpener.open(document.data.address, 'application/pdf');
    }
   
  }

  getMIMEtype(extn){
    let ext=extn.toLowerCase();
    let MIMETypes={
      'txt' :'text/plain',
      'docx':'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'doc' : 'application/msword',
      'pdf' : 'application/pdf',
      'jpg' : 'image/jpeg',
      'bmp' : 'image/bmp',
      'png' : 'image/png',
      'xls' : 'application/vnd.ms-excel',
      'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'rtf' : 'application/rtf',
      'ppt' : 'application/vnd.ms-powerpoint',
      'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    }
    return MIMETypes[ext];
  }


}
