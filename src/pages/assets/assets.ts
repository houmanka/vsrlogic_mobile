import { ApiGetProvider } from './../../providers/api-get/api-get';
import { AssetTabsPage } from './../asset-tabs/asset-tabs';
import { NotificationService } from './../../app/services/notification.service';
import { TransfereService } from './../../app/services/transfer.service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoaderProvider } from '../../providers/loader/loader';

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
    private apiSrv: ApiGetProvider,
    private loader: LoaderProvider,
    ) {
  }

  ionViewDidLoad() {
    this.getRootAssets();
  }

  private getRootAssets() {
    this.loader.presentLoadingDefault()
    this.apiSrv.rootAssets().subscribe( (res: any) => {
      this.assets = res;
      this.loader.dismiss();
    },
    (error) => {
      this.notificationSrv.notify('Error', error);
      this.loader.dismiss();
    });
  }

  public navigate(item) {
    console.log(item);
    this.transfereService.setData(item);
    // this.navCtrl.push('sub_asset');
    this.navCtrl.push(AssetTabsPage);
  }

}
