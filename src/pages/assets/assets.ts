import { AssetTabsPage } from './../asset-tabs/asset-tabs';
import { SubAssetsPage } from './../sub-assets/sub-assets';
import { ApiService } from './../../app/services/api.service';
import { NotificationService } from './../../app/services/notification.service';
import { TransfereService } from './../../app/services/transfer.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AssetsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-assets',
  templateUrl: 'assets.html',
})
export class AssetsPage {
  public assets = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private transfereService: TransfereService,
    private notificationSrv: NotificationService,
    private apiSrv: ApiService,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AssetsPage');
    this.getRootAssets();
  }

  private getRootAssets() {
    this.apiSrv.rootAssets().subscribe( (res: any) => {
      this.assets = res;
    },
    (error) => {
      this.notificationSrv.notify('Error', error);
    });
  }

  public navigate(item) {
    console.log(item);
    this.transfereService.setData(item);
    // this.navCtrl.push('sub_asset');
    this.navCtrl.push(AssetTabsPage);
  }

}
