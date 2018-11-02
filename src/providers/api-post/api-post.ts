import { APPCONFIG } from './../../app/config';
import { DataStructure, ApiService, ChecklistInterface, NoteInterface, AssetPostInterface, TaskPostInterface } from './../../app/services/api.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiPostProvider {

  constructor(
    public http: HttpClient,
    private apiSrv: ApiService,
    ) {
      this.headers = this.apiSrv.headers();
  }

  private headers;
  private apiUrl = APPCONFIG.apiUrl;

  login(data: DataStructure) {
    return this.http.post(this.apiUrl + '/auths', data.data);
  }

  updateChecklist(data: ChecklistInterface) {
    const headers = this.headers;
    const url = `/tasks/${data.taskId}/checklist_groups/${data.checkListGroupId}/checklists/${data.checklistId}`;
    return this.http.put(this.apiUrl + url, 
      {
        completed: data.completed,
        content: data.content
      }, headers);
  }

  insertComment(data: NoteInterface) {
    const headers = this.headers;
    const url = `/comments`;
    return this.http.post(this.apiUrl + url, data, headers);
  }  

  updateComment(data: NoteInterface) {
    const headers = this.headers;
    const url = `/comments/${data.id}`;
    return this.http.put(this.apiUrl + url, data, headers);
  }  

  assetForm(data: AssetPostInterface) {
    const headers = this.headers;
    const url = `/assets`;
    return this.http.post(this.apiUrl + url, data, headers);
  }  

  updateAssetForm(data: AssetPostInterface) {
    const headers = this.headers;
    const url = `/assets/${data.asset_id}`;
    return this.http.put(this.apiUrl + url, data, headers);
  } 

  createTask(data: TaskPostInterface) {
    const headers = this.headers;
    const url = `/tasks`;
    return this.http.post(this.apiUrl + url, data, headers);
}

}


