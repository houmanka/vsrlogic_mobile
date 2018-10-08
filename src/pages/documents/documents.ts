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
    this.getDocs(this.asset);
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
    this.fileOpener.open(document.data.path, 'application/pdf');
  }


}
