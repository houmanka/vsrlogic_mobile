import { LoaderProvider } from './../../providers/loader/loader';
import { ApiGetProvider } from './../../providers/api-get/api-get';
import { StorageService } from './../../app/services/storage.service';
import { TransfereService } from './../../app/services/transfer.service';
import { UtilService } from './../../app/services/util.service';
import { NotificationService } from './../../app/services/notification.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  public searchReq;
  public showBack = false;
  private assetId;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private notificationSrv: NotificationService,
    private apiSrv: ApiGetProvider,
    private transferSrv: TransfereService,
    private loader: LoaderProvider
    ) {
  }

  ionViewDidLoad() {
    if(!UtilService.empty(this.loader)){
      this.loader.dismiss();
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
    this.loader.presentLoadingDefault();
    if (saveIt) {
      StorageService.store('search', keyword);
    }
    this.apiSrv.search(keyword, this.assetId).subscribe( (res: any) => {
      this.searchRes = res;
      this.loader.dismiss();
    },
    (error) => {
      this.loader.dismiss();
      this.notificationSrv.notify('Error', error);
    });
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
    this.loader.presentLoadingDefault();
    this.apiSrv.singleAsset(item.asset_id).subscribe( (res: any) => {
      this.transferSrv.setData(res);
      this.loader.dismiss();
      this.navCtrl.push(AssetTabsPage);
    },
    (error) => {
      this.notificationSrv.notify('Error', error);
      this.loader.dismiss();
    });
  }

  back() {
    this.navCtrl.pop()
  }
  

}
