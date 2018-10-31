import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { UtilService } from './util.service';


@Injectable()
export class ApiService {

  constructor() { }

  public headers() {
    const authToken = StorageService.read('token');
    const currentUser: any = StorageService.read('currentUser');
    let httpOptions;
    if ( !UtilService.empty(authToken) && !UtilService.empty(currentUser) ) {
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${authToken}`,
          'company': `${currentUser.company_id}`
        })
      };
    }

    return httpOptions;
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

export interface DataStructure {
    data: any
}

export interface NoteInterface {
  asset_id: 0,
  resource: "assets",
  resource_id: 0,
  parent_id: 0,
  content: "Enter your Comment...",
  id: 0
}

export interface ChecklistInterface {
  completed: true,
  content: "",
  taskId: 0,
  checkListGroupId: 0,
  checklistId: 0
}

export interface AssetPostInterface {
    parent_id: null,
    asset_id: null,
    asset_name: string,
    description: string
}

export interface TaskPostInterface {
  name: string,
  description: string,
  status: string,
  due_by: string,
  task_id: 0,
  asset_id: 0
}



