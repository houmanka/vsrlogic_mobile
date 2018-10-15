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

  singleAsset(assetId) {
    const headers = this.headers();
    return this.http.get(APPCONFIG.apiUrl + `/assets/${assetId}`, headers);
  }

  documents(item) {
    const headers = this.headers();
    return this.http.get(APPCONFIG.apiUrl + `/documents?asset_id=${item.asset_id}`, headers);
  }

  assetTasks(item) {
    const headers = this.headers();
    return this.http.get(APPCONFIG.apiUrl + `/tasks?group_id=${item.asset_id}`, headers);
  }

  globalTasks() {
    const headers = this.headers();
    return this.http.get(APPCONFIG.apiUrl + `/tasks`, headers);
  }

  globalHistory() {
    const headers = this.headers();
    return this.http.get(APPCONFIG.apiUrl + `/history`, headers);
  }

  checklist(taskId) {
    const headers = this.headers();
    return this.http.get(APPCONFIG.apiUrl + `/tasks/${taskId}/checklists`, headers);
  }

  taskDocument(taskId) {
    const headers = this.headers();
    return this.http.get(APPCONFIG.apiUrl + `/tasks/${taskId}/documents`, headers);
  }

  commentList(assetId) {
    const headers = this.headers();
    return this.http.get(APPCONFIG.apiUrl + `/comments?resource=assets&resource_id=${assetId}`, headers);
  }

  taskCommentList(taskId) {
    const headers = this.headers();
    return this.http.get(APPCONFIG.apiUrl + `/comments?resource=tasks&resource_id=${taskId}`, headers);
  }

  assetHistory(assetId) {
    const headers = this.headers();
    return this.http.get(APPCONFIG.apiUrl + `/history/${assetId}?limit=100`, headers);
  }

  search(searchKeyword, assetId?) {
    let url = `/search?q=${searchKeyword}`;
    if (!UtilService.empty(assetId)) {
      url += `&asset_id=${assetId}`;
    }
    const headers = this.headers();
    return this.http.get(APPCONFIG.apiUrl + url, headers);
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

