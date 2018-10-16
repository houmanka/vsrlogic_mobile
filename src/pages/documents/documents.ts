import { ApiGetProvider } from './../../providers/api-get/api-get';
import { UtilService } from './../../app/services/util.service';
import { FileOpener } from '@ionic-native/file-opener';
import { APPCONFIG } from './../../app/config';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NotificationService } from '../../app/services/notification.service';
import { Subscription } from 'rxjs/Subscription';
import { TransfereService } from '../../app/services/transfer.service';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

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
    private apiSrv: ApiGetProvider,
    private notificationSrv: NotificationService,
    private transferSrv: TransfereService,
    private fileOpener: FileOpener,
    private transfer: FileTransfer,
    private file: File
    ) {
  }
  fileTransfer: FileTransferObject = this.transfer.create();

  ionViewDidLoad() {
    console.log('ionViewDidLoad DocumentsPage');
    this.asset = this.transferSrv.getData();
    this.setTitle(this.asset);
    this.getDocs(this.asset);
  }

  setTitle(currentAsset) {
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
    const mime = UtilService.getMIMEtype(ext[0]);
    console.log('+++++++++');
    console.log(mime);
    console.log(ext);
    console.log(filename);

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

  

}
