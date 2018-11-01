import { Subject } from 'rxjs/Subject';
import { ApiGetProvider } from './../api-get/api-get';
import { Injectable } from '@angular/core';

/*
  Generated class for the MembersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MembersProvider {
  public dataReady = new Subject();
  constructor(
    private apiGet: ApiGetProvider,
  ) {
    console.log('Hello MembersProvider Provider');
  }

  members(assetId) {
    this.apiGet.members(assetId).subscribe( (res: any) => {
      this.dataReady.next(res);
    },
    (error) => {
      this.dataReady.next(null);
    });
  }

}
