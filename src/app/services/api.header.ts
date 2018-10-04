import { StorageService } from './storage.service';
import { Http, Headers, RequestOptions } from '@angular/http';

export class ApiHeader {

  public static jsonHeaderGenerator(): Headers {
    let localHeaders =  this.generalHeaders();
    localHeaders = this.jsonHeaders(localHeaders);
    localHeaders = this.headerCombo(localHeaders);
    return localHeaders;
  }

  public static multiPartHeaderGenerator(): Headers {
    let localHeaders =  this.generalHeaders();
    localHeaders = this.headerCombo(localHeaders);
    return localHeaders;
  }

  // Privates
  private static headerCombo(localHeaders: Headers): Headers {
    localHeaders = this.authHeaders(localHeaders);
    localHeaders = this.companyHeaders(localHeaders);
    return localHeaders;
  }

  private static generalHeaders(): Headers {
    const headers: Headers = new Headers();
    return headers;
  }

  private static jsonHeaders(headers): Headers {
    headers.append('Content-Type', 'application/json; charset=utf-8');
    return headers;
  }

  private static authHeaders(headers: Headers): Headers {
    const authToken = StorageService.read('token');
    if (authToken != null) {
      headers.append('Authorization', `Bearer ${authToken}`);
    } else {
      headers.delete('Authorization');
    }
    return headers;
  }

  private static companyHeaders(headers: Headers): Headers {
    const currentUser: any = StorageService.read('currentUser');
    if (currentUser != null) {
      headers.append('company', currentUser.company_id);
    } else {
      headers.delete('company');
    }
    return headers;
  }
}
