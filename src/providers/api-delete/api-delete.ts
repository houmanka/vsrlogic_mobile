import { APPCONFIG } from './../../app/config';
import { ApiService } from './../../app/services/api.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiDeleteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiDeleteProvider {

  constructor(
    public http: HttpClient,
    private apiSrv: ApiService,
    ) {
      this.headers = this.apiSrv.headers();
  }

  private headers;
  private apiUrl = APPCONFIG.apiUrl;

  deleteComment(commentId) {
    const headers = this.headers;
    const url = `/comments/${commentId}`;
    return this.http.delete(this.apiUrl + url, headers);
  }

}
