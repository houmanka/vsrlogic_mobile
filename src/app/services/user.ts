import { DataStructure } from './api.service';
export class User {

    constructor(
      public email: string,
      public password: string,
      public captcha: string
    ) {}

    public userLogin(): DataStructure {
        return  {
            data: {
              user: {
                email: this.email,
                password: this.password,
                captcha: this.captcha,
              }
            }
        };
      }

}
