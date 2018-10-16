import { UtilService } from './../../app/services/util.service';
import { APPCONFIG } from './../../app/config';
import { ApiService } from './../../app/services/api.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiGetProvider {

  constructor(public http: HttpClient,
    private apiSrv: ApiService,) {
    this.headers = this.apiSrv.headers();
  }

  private apiUrl = APPCONFIG.apiUrl;
  private headers;

  rootAssets() {
    const headers = this.headers;
    return this.http.get(this.apiUrl + '/assets/root', headers);
  }

  subAssets(item) {
    const headers = this.headers;
    return this.http.get(this.apiUrl + `/assets/${item.asset_id}/children`, headers);
  }

  singleAsset(assetId) {
    const headers = this.headers;
    return this.http.get(this.apiUrl + `/assets/${assetId}`, headers);
  }

  documents(item) {
    const headers = this.headers;
    return this.http.get(this.apiUrl + `/documents?asset_id=${item.asset_id}`, headers);
  }

  assetTasks(item) {
    const headers = this.headers;
    return this.http.get(this.apiUrl + `/tasks?group_id=${item.asset_id}`, headers);
  }

  globalTasks() {
    const headers = this.headers;
    return this.http.get(this.apiUrl + `/tasks`, headers);
  }

  globalHistory() {
    const headers = this.headers;
    return this.http.get(this.apiUrl + `/history`, headers);
  }

  checklist(taskId) {
    const headers = this.headers;
    return this.http.get(this.apiUrl + `/tasks/${taskId}/checklists`, headers);
  }

  taskDocument(taskId) {
    const headers = this.headers;
    return this.http.get(this.apiUrl + `/tasks/${taskId}/documents`, headers);
  }

  commentList(assetId) {
    const headers = this.headers;
    return this.http.get(this.apiUrl + `/comments?resource=assets&resource_id=${assetId}`, headers);
  }

  taskCommentList(taskId) {
    const headers = this.headers;
    return this.http.get(this.apiUrl + `/comments?resource=tasks&resource_id=${taskId}`, headers);
  }

  assetHistory(assetId) {
    const headers = this.headers;
    return this.http.get(this.apiUrl + `/history/${assetId}?limit=100`, headers);
  }

  search(searchKeyword, assetId?) {
    let url = `/search?q=${searchKeyword}`;
    if (!UtilService.empty(assetId)) {
      url += `&asset_id=${assetId}`;
    }
    const headers = this.headers;
    return this.http.get(this.apiUrl + url, headers);
  }


}
