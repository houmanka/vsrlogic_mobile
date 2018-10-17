import { Injectable } from '@angular/core';
import { Diagnostic } from '@ionic-native/diagnostic';

@Injectable()
export class SystemCheckProvider {

  constructor(private diagnostic: Diagnostic) {
    console.log('Hello SystemCheckProvider Provider');
  }


  hasCamera() {
    this.diagnostic.isCameraAvailable().then(() => {
      return true;
    }).catch(() => {
      return false;
    });
  }


}
