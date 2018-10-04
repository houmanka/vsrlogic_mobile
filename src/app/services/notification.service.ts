import { Injectable } from '@angular/core';
// import { NotificationsService } from 'angular2-notifications-lite';
import { AlertController } from 'ionic-angular';

@Injectable()
export class NotificationService {
    constructor(public alertController: AlertController) {
        // empty
      }
      private finalMessage: any;

    public notify(msgType, msg, args?) {
        this.finalMessage = [false, msg];
        this.finalMessage = this.messageOriginal(this.finalMessage);
        this.finalMessage = this.messageDifferentJson(this.finalMessage);
        this.finalMessage = this.messageDifferentCleanerJson(this.finalMessage);
        this.finalMessage = this.messageText(this.finalMessage);
        let fMsg = this.finalMessage[1];
        if (typeof fMsg === 'object') {
            fMsg = 'Oh dear, somthing gone wrong! Please contact the support team';
        }

        this.presentAlert(msgType, fMsg);
    }

    private messageOriginal(msg: any): any {
        if (msg[0] === true) {
            return msg;
        }
        let original;
        try {
            original = msg[1].originalError;
            original = original.json().errors.detail;
            return [true, original];
        } catch (e) {
            return msg;
        }
    }

    private messageDifferentJson(msg: any): any {
        if (msg[0] === true) {
            return msg;
        }
        let original;
        try {
            original = msg[1]._body;
            original = JSON.parse(msg[1]._body).errors.detail;
            return [true, original];
        } catch (e) {
            return msg;
        }
    }

    private messageDifferentCleanerJson(msg: any): any {
        if (msg[0] === true) {
            return msg;
        }
        let original;
        try {
            original = JSON.parse(msg[1].originalError._body).message;
            return [true, original];
        } catch (e) {
            return msg;
        }
    }

    private messageText(msg: any): any {
        if (msg[0] === true) {
            return msg;
        }
        let original;
        try {
            original = msg[1];
            return [true, original];
        } catch (e) {
            return msg;
        }
    }

    async presentAlert(header, message, sub?) {
        const alert = this.alertController.create({
            title: header,
            subTitle: message,
            buttons: ['Dismiss']
          });
          alert.present();
      }

}
