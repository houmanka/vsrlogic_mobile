import { NotificationService } from './../../app/services/notification.service';
import { LoaderProvider } from './../../providers/loader/loader';
import { AssetPostInterface } from './../../app/services/api.service';
import { UtilService } from './../../app/services/util.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiPostProvider } from '../../providers/api-post/api-post';

// USED FOR INSERT AND EDITING ASSET ROOTS ONLY

@IonicPage()
@Component({
  selector: 'page-asset-form',
  templateUrl: 'asset-form.html',
})
export class AssetFormPage {
  public title: string;
  public newAsset: string = '';
  public newAssetDescription: string = '';
  private params: AssetPostInterface = {
    parent_id: null,
    asset_id: null,
    asset_name: "",
    description: ""
};

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private apiPost: ApiPostProvider,
    private loader: LoaderProvider,
    private notificationSrv: NotificationService,
    ) {
  }

  ionViewDidLoad() {
    this.params = this.navParams.get('params');
    if (UtilService.empty(this.params)) {
      this.title = 'Create New Asset';
    } else {
      this.title = this.params.asset_name
      this.newAsset = this.params.asset_name;
      this.newAssetDescription = this.params.description;
    }
  }


  back() {
    this.navCtrl.pop();
  }

  submit() {
    let data: AssetPostInterface;
    let assetId; 
    let parentId;
    if (UtilService.empty(this.params)) {
      assetId = null;
      parentId = null;
    } else {
      assetId = this.params.asset_id;
      parentId = this.params.parent_id;
    }
    data = {
      asset_name: this.newAsset,
      description: this.newAssetDescription,
      asset_id: assetId,
      parent_id: parentId
    } 
    this.loader.presentLoadingDefault();
    if (UtilService.empty(assetId)) {
      this.post(data);
    } else {
      this.put(data);
    }
  }

  post(data) {
    this.apiPost.assetForm(data).subscribe( (res: any) => {
      this.loader.dismiss();
      this.notificationSrv.notify('notice', 'Created Successfully', null, 'toast');
      this.navCtrl.pop();
    }, (error) => {
      this.loader.dismiss();
      this.notificationSrv.notify('Error', error);
    });
  }

  put(data) {
    this.apiPost.updateAssetForm(data).subscribe( (res: any) => {
      this.loader.dismiss();
      this.notificationSrv.notify('notice', 'Created Successfully', null, 'toast');
      this.navCtrl.pop();
    }, (error) => {
      this.loader.dismiss();
      this.notificationSrv.notify('Error', error);
    });
  }

}
