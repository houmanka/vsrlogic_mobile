import { NotificationService } from './../services/notification.service';

import { Injectable } from '@angular/core';

@Injectable()
export class HttpStatusHandler {

    constructor(private notificationService: NotificationService) {
        // empty
    }

    // private notificationOpts = {
    //     timeOut: 2000,
    //     showProgressBar: true,
    //     pauseOnHover: true,
    //     clickToClose: true,
    //     maxLength: 1000
    // };

    public resultAnlyser(res: any, success?: string ) {
        switch (res.status) {
            case 200: {
                this.notificationService.notify('success', success);
                break;
            }
            case 500: {
                this.notificationService.notify('danger', res);
                // console.log(res);
                break;
            }
            case 422: {
                this.notificationService.notify('danger', res);
                // console.log(res);
                break;
            }
            case 404: {
                this.notificationService.notify('danger', res);
                // console.log(res);
                break;
            }
            default: {
                this.notificationService.notify('danger', res);
                // console.log(res);
                break;
            }
        }
    }

}
