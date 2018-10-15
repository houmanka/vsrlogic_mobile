import { UtilService } from './../../app/services/util.service';
import { HomePage } from './../home/home';
import { StorageService } from './../../app/services/storage.service';
import { NotificationService } from './../../app/services/notification.service';
import { ApiService } from './../../app/services/api.service';
import { User } from './../../app/services/user';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild('email') email: any;
  private username: string;
  private password: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private apiSrv: ApiService,
    private notificationSrv: NotificationService,
    ) {
  }

  ionViewDidLoad(): void {

    const params = this.navParams.get('params');
    if (!UtilService.empty(params) && params.logout === true) {
      StorageService.clear();
    }


    const authToken = StorageService.read('token');
    if (authToken != null) {
      this.navCtrl.push(HomePage)
    } else {
      setTimeout(() => {
        this.email.setFocus();
      }, 500);
      this.username = 'josh.proud@emtek.com.au';
      this.password = '7phantem';
    }
  }
  

  public login() {
    const user = new User(this.username, this.password, null);
    const data = user.userLogin();
    this.apiSrv.login(data).subscribe( (res: any) => {
      const fetchedData = res;
      const currentUser = {
        user_id: fetchedData.user.id,
        first_name: fetchedData.user.first_name,
        last_name: fetchedData.user.last_name,
        company_name: fetchedData.company.company_name,
        company_id: fetchedData.company.company_id
      };
      StorageService.store('currentUser', currentUser);
      StorageService.store('token', fetchedData.jwt);
      this.navCtrl.push(HomePage);
    }, (error: any) => {
      this.notificationSrv.notify('Login Error', error);
    });
  }

}
