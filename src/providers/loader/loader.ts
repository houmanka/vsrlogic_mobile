import { UtilService } from './../../app/services/util.service';
import { LoadingController } from 'ionic-angular';
import { Injectable } from '@angular/core';

/*
  Generated class for the LoaderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoaderProvider {
  public loader;
  constructor(public loadingCtrl: LoadingController) {
    console.log('Hello LoaderProvider Provider');
  }

  presentLoadingDefault(msg?: string) {
    if (UtilService.empty(msg)) {
      msg = 'Please wait...'
    }
    this.loader = this.loadingCtrl.create({
      content: msg
    });  
    this.loader.present();
  }

  dismiss() {
    this.loader.dismiss();
  }
  

}
