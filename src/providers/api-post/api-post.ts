import { APPCONFIG } from './../../app/config';
import { DataStructure, ApiService } from './../../app/services/api.service';
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
}

export interface ChecklistInterface {
  completed: true,
  content: "",
  taskId: 0,
  checkListGroupId: 0,
  checklistId: 0
}

