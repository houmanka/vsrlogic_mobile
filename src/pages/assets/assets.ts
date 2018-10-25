import { UtilService } from './../../app/services/util.service';
import { AssetFormPage } from './../asset-form/asset-form';
import { ApiGetProvider } from './../../providers/api-get/api-get';
import { AssetTabsPage } from './../asset-tabs/asset-tabs';
import { NotificationService } from './../../app/services/notification.service';
import { TransfereService } from './../../app/services/transfer.service';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { LoaderProvider } from '../../providers/loader/loader';
import { AssetPostInterface } from '../../app/services/api.service';

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
    public modalCtrl: ModalController,
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
    this.transfereService.setData(item);
    // this.navCtrl.push('sub_asset');
    this.navCtrl.push(AssetTabsPage);
  }

  add(item?) {
    let data: AssetPostInterface;
    if (!UtilService.empty(item)) {
      data = {
        asset_id: item.asset_id,
        parent_id: item.parent_id,
        asset_name: item.asset_name,
        description: item.description
      }
    } else {
      data = undefined;
    }
    this.presentFormModal({params: data});
  }


  presentFormModal(params?) {
    let form = this.modalCtrl.create(AssetFormPage, params);
    form.onDidDismiss(() => {
      this.getRootAssets();
    });
    form.present();
  }

}
