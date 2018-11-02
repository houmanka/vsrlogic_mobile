import { LoaderProvider } from './../loader/loader';
import { ApiPostProvider } from './../api-post/api-post';
import { TaskPostInterface } from './../../app/services/api.service';
import { ApiGetProvider } from './../api-get/api-get';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

/*
  Generated class for the TaskProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TaskProvider {

  public globalTaskDataReady = new Subject();
  public taskListReady = new Subject();
  public taskCreated = new Subject();
  public taskMembersReady = new Subject();

  constructor(
    private apiSrv: ApiGetProvider,
    private apiPost: ApiPostProvider,
    private loader: LoaderProvider,
  ) {
    console.log('Hello TaskProvider Provider');
  }

  globalTasks() {
    this.loader.presentLoadingDefault();
    this.apiSrv.globalTasks().subscribe( (res: any) => {
      this.loader.dismiss();
      this.globalTaskDataReady.next(res);
    }, () => {
      this.loader.dismiss();
      this.globalTaskDataReady.next([]);
    })
  }

  assetTasks(asset) {
    this.loader.presentLoadingDefault();
    this.apiSrv.assetTasks(asset).subscribe( (res: any) => {
      this.loader.dismiss();
      this.taskListReady.next(res);
    }, () => {
      this.loader.dismiss();
      this.taskListReady.next([]);
    });
  }

  createTask(data: TaskPostInterface) {
    this.apiPost.createTask(data).subscribe( (res: any) => {
      this.taskCreated.next(true)
    }, (error) => {
      this.taskCreated.next({error: error})
    })
  }

  taskMembers(taskId): any {
    this.loader.presentLoadingDefault();
    this.apiSrv.taskMembers(taskId).subscribe( (res: any) => {
      this.loader.dismiss();
      this.taskMembersReady.next(res);
    }, () => {
      this.loader.dismiss();
      this.taskMembersReady.next([]);
    });
  }

}
