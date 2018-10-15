import { TransfereService } from './../../app/services/transfer.service';
import { UtilService } from './../../app/services/util.service';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';

/*
  Generated class for the SetTitleProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SetTitleProvider {
  public event = new EventEmitter();
  public subject = new Subject();
  constructor(public http: HttpClient,
    private transfereService: TransfereService,
    ) {
    
  }

  getAssetTitle(alt) {
    const asset = this.transfereService.getData();
    if (UtilService.empty(asset)) {
      this.event.emit(alt);
      this.subject.next(alt);
    } else {
      this.event.emit({title: asset.asset_name, assetId: asset.asset_id});
    }
  }

}
