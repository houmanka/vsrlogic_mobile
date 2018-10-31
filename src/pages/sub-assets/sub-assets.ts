import { SubAssetFormPage } from './../sub-asset-form/sub-asset-form';
import { AssetPostInterface } from './../../app/services/api.service';
import { LoaderProvider } from './../../providers/loader/loader';
import { ApiGetProvider } from './../../providers/api-get/api-get';
import { SetTitleProvider } from './../../providers/set-title/set-title';
import { NotificationService } from './../../app/services/notification.service';
import { TransfereService } from './../../app/services/transfer.service';
import { UtilService } from './../../app/services/util.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';


/**
 * Generated class for the SubAssetsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sub-assets',
  templateUrl: 'sub-assets.html',
})
export class SubAssetsPage {
  public assets = [];
  public currentAsset;
  private subAssetSubs = new Subscription();
  public title;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private transfereService: TransfereService,
    private apiSrv: ApiGetProvider,
    private notificationSrv: NotificationService,
    private setTitleP: SetTitleProvider,
    private loader: LoaderProvider,
    public modalCtrl: ModalController,
   
    ) {
  }

  ionViewDidLoad(){
    this.currentAsset = this.transfereService.getData();
    this.setTitleP.getAssetTitle('Sub Assets');

    if (!UtilService.empty(this.currentAsset)) {
      this.getSubAssets(this.currentAsset);
      this.assets = []
    }
  }

  ionViewDidLeave(){
    this.subAssetSubs.unsubscribe();
  }

  private getSubAssets(item) {
    this.loader.presentLoadingDefault();
    this.subAssetSubs = this.apiSrv.subAssets(item).subscribe( (res: any) => {
      this.assets = res;
      this.loader.dismiss();
    },
    (error) => {
      this.loader.dismiss();
      this.notificationSrv.notify('Error', error);
    });
  }

  public navigate(item) {
    this.transfereService.setData(item);
    this.setTitleP.getAssetTitle('Sub Assets');
    this.navCtrl.push(SubAssetsPage);
  }

  add() {
    let data: AssetPostInterface;
      data = {
        asset_id: null,
        parent_id: this.currentAsset.asset_id,
        asset_name: null,
        description: null
      }
    this.presentFormModal({params: data});
  }

  edit(item: AssetPostInterface) {
    this.presentFormModal({params: item});
  }

  presentFormModal(params?) {
    let form = this.modalCtrl.create(SubAssetFormPage, params);
    form.onDidDismiss(() => {
      this.currentAsset = this.transfereService.getData();
      this.setTitleP.getAssetTitle('Sub Assets');

      if (!UtilService.empty(this.currentAsset)) {
        this.getSubAssets(this.currentAsset);
        this.assets = []
      }
    });
    form.present();
  }


}
