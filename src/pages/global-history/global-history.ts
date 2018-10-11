import { SubAssetsPage } from './../sub-assets/sub-assets';
import { TransfereService } from './../../app/services/transfer.service';
import { ApiService } from './../../app/services/api.service';
import { NotificationService } from './../../app/services/notification.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AssetTabsPage } from '../asset-tabs/asset-tabs';

/**
 * Generated class for the GlobalHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-global-history',
  templateUrl: 'global-history.html',
})
export class GlobalHistoryPage {
  public history = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private notificationSrv: NotificationService,
    private apiSrv: ApiService,
    private transfereService: TransfereService,
    ) {
  }

  ionViewDidLoad() {
    this.getHistory();
  }

  private getHistory() {
    this.apiSrv.globalHistory().subscribe( (res: any) => {
      this.history = res;
    },
    (error) => {
      this.notificationSrv.notify('Error', error);
    });
  }

  public goToAsset(history) {
    this.apiSrv.singleAsset(history.access_control.asset_id).subscribe( (res: any) => {
      this.transfereService.setData(res);
      this.navCtrl.push(AssetTabsPage);
    },
    (error) => {
      this.notificationSrv.notify('Error', error);
    });
  }

}
