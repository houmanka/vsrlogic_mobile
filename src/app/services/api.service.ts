import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';


@Injectable()
export class ApiService {

  constructor() { }

  public headers() {
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

