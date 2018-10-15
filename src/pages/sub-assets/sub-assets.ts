import { NotificationService } from './../../app/services/notification.service';
import { ApiService } from './../../app/services/api.service';
import { TransfereService } from './../../app/services/transfer.service';
import { UtilService } from './../../app/services/util.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
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
    private apiSrv: ApiService,
    private notificationSrv: NotificationService,
    ) {
  }

 

  ionViewDidLoad(){
    const currentAsset = this.transfereService.getData();
    this.setTitle(currentAsset);
    if (!UtilService.empty(currentAsset)) {
      this.getSubAssets(currentAsset);
      this.assets = []
    }
  }

  setTitle(currentAsset) {
    if (UtilService.empty(currentAsset)) {
      this.title = 'Sub Assets'
    } else {
      this.title = currentAsset.asset_name;
    }
  }

  ionViewDidLeave(){
    this.subAssetSubs.unsubscribe();
  }

  private getSubAssets(item) {
    this.subAssetSubs = this.apiSrv.subAssets(item).subscribe( (res: any) => {
      this.assets = res;
    },
    (error) => {
      this.notificationSrv.notify('Error', error);
    });
  }

  public navigate(item) {
    this.setTitle(item);
    this.transfereService.setData(item);
    this.navCtrl.push(SubAssetsPage);
  }

}
