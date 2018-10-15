import { StorageService } from './../../app/services/storage.service';
import { TransfereService } from './../../app/services/transfer.service';
import { UtilService } from './../../app/services/util.service';
import { NotificationService } from './../../app/services/notification.service';
import { ApiService } from './../../app/services/api.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AssetTabsPage } from '../asset-tabs/asset-tabs';
/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  public searchRes = [];
  private loading;
  public searchReq;
  public showBack = false;
  private assetId;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private notificationSrv: NotificationService,
    private apiSrv: ApiService,
    public loadingCtrl: LoadingController,
    private transferSrv: TransfereService
    ) {
  }

  ionViewDidLoad() {
    if(!UtilService.empty(this.loading)){
      this.loading.dismiss();
    }

    const params = this.navParams.get('params');
    if (!UtilService.empty(params) && !UtilService.empty(params.assetId)) {
      this.assetId = params.assetId;
      this.showBack = params.showBack;
    } else {
      const searchReq = StorageService.read('search');
      if(!UtilService.empty(searchReq)){
        this.searchReq = searchReq;
        this.search(this.searchReq, true);
      }
    }
  }

  public search(keyword, saveIt) {
    this.presentLoadingDefault();
    if (saveIt) {
      StorageService.store('search', keyword);
    }
    this.apiSrv.search(keyword, this.assetId).subscribe( (res: any) => {
      this.searchRes = res;
      this.loading.dismiss();
    },
    (error) => {
      this.notificationSrv.notify('Error', error);
      this.loading.dismiss();
    });
  }

  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  submitSearch(event) {
    if (UtilService.empty(this.assetId)) {
      this.search(this.searchReq, true);
    } else {
      // dont need to cache the search request
      this.search(this.searchReq, false);
    }
    
  }

  navigateTo(item) {
    this.presentLoadingDefault();
    this.apiSrv.singleAsset(item.asset_id).subscribe( (res: any) => {
      this.transferSrv.setData(res);
      this.loading.dismiss();
      this.navCtrl.push(AssetTabsPage);
    },
    (error) => {
      this.notificationSrv.notify('Error', error);
      this.loading.dismiss();
    });
  }

  back() {
    this.navCtrl.pop()
  }
  

}
