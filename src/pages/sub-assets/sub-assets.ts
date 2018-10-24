import { LoaderProvider } from './../../providers/loader/loader';
import { ApiGetProvider } from './../../providers/api-get/api-get';
import { SetTitleProvider } from './../../providers/set-title/set-title';
import { NotificationService } from './../../app/services/notification.service';
import { TransfereService } from './../../app/services/transfer.service';
import { UtilService } from './../../app/services/util.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
    ) {
  }

 

  ionViewDidLoad(){
    const currentAsset = this.transfereService.getData();
    this.setTitleP.getAssetTitle('Sub Assets');

    if (!UtilService.empty(currentAsset)) {
      this.getSubAssets(currentAsset);
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

}
