import { NotificationService } from './../../app/services/notification.service';
import { ApiService } from './../../app/services/api.service';
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
  public title;
  private subAssetSubs = new Subscription();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private transfereService: TransfereService,
    private apiSrv: ApiService,
    private notificationSrv: NotificationService,
    ) {
  }

  ionViewDidLoad() {
    const currentAsset = this.transfereService.getData();
    let viewTitle;
    if (UtilService.empty(currentAsset)) {
      viewTitle = 'Sub Assets'
    } else {
      viewTitle = currentAsset.asset_name;
      this.getSubAssets(currentAsset);
      this.assets = []
    }
      this.title = viewTitle;
    // }
  }

  ionViewDidLeave(){
    this.subAssetSubs.unsubscribe();
  }

  private getSubAssets(item) {
    console.log(item);
    this.subAssetSubs = this.apiSrv.subAssets(item).subscribe( (res: any) => {
      this.assets = res;
    },
    (error) => {
      this.notificationSrv.notify('Error', error);
    });
  }

  public navigate(item) {
    console.log(item);
    console.log('Passed Navigate');
    // if ( item.length > 0) {
      this.title = item.asset_name;
      this.getSubAssets(item);
      // this.router.navigate(['sub_asset']);
      this.navCtrl.push(SubAssetsPage);
    // } else {
    //   this.navCtrl.pop();
    // }
  }

}
