import { StorageService } from './storage.service';
import { APPCONFIG } from './../config';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilService } from './util.service';




@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  private headers() {
    const authToken = StorageService.read('token');
    const currentUser: any = StorageService.read('currentUser');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${authToken}`,
        'company': `${currentUser.company_id}`
      })
    };

    return httpOptions;
  }

  login(data: DataStructure) {
    return this.http.post(APPCONFIG.apiUrl + '/auths', data.data);
  }

  rootAssets() {
    const headers = this.headers();
    return this.http.get(APPCONFIG.apiUrl + '/assets/root', headers);
  }

  subAssets(item) {
    const headers = this.headers();
    return this.http.get(APPCONFIG.apiUrl + `/assets/${item.asset_id}/children`, headers);
  }



  // private handleError(error: Response) {
  //   if (error.status === 400) {
  //     return Observable.throw(new BadInput(error.json()));
  //   }
  //   if (error.status === 404) {
  //     return Observable.throw(new NotFoundError());
  //   }
  //   if (error.status === 0 && error.ok === false) {
  //     return Observable.throw(new BadInput(error.json()));
  //   }

  //   return Observable.throw(new AppError(error));
  // }

}

/**
 * An interface to make sure usages are compliance to ApiService
 * @export
 * @interface DataStructure
 */
export interface DataStructure {
    data: any
}

