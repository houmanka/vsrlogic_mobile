import { ApiGetProvider } from './../../providers/api-get/api-get';
import { UtilService } from './../../app/services/util.service';
import { TransfereService } from './../../app/services/transfer.service';
import { NotificationService } from './../../app/services/notification.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AssetHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-asset-history',
  templateUrl: 'asset-history.html',
})
export class AssetHistoryPage {

  public history = [];
  public title;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private notificationSrv: NotificationService,
    private apiSrv: ApiGetProvider,
    private transfereService: TransfereService,
    ) {
  }

  ionViewDidLoad() {
    const currentAsset = this.transfereService.getData();
    this.setTitle(currentAsset);
    if (!UtilService.empty(currentAsset)) {
      this.getHistory(currentAsset);
    }
  }

  private getHistory(currentAsset) {
    this.apiSrv.assetHistory(currentAsset.asset_id).subscribe( (res: any) => {
      this.history = res;
    },
    (error) => {
      this.notificationSrv.notify('Error', error);
    });
  }

  setTitle(currentAsset) {
    if (UtilService.empty(currentAsset)) {
      this.title = 'History'
    } else {
      this.title = currentAsset.asset_name;
    }
  }

}