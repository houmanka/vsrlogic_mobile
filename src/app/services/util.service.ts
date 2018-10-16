import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {

  public static empty(variable: any) {
    if (variable === '' || variable === undefined || variable === null ) {
      return true;
    }
    return false;
  }

  public static objEmpty(variable: any) {
    if (!UtilService.empty(variable)) {
      if (Object.keys(variable).length === 0 && variable.constructor === Object) {
        return true;
      }
      return false;
    } else {
      return true;
    }
  }

  public static humanize(str) {
    if (!UtilService.empty(str)) {
      return str.trim().split(/\s+/).map((res) => {
        return res.replace(/_/g, ' ').replace(/\s+/, ' ').trim();
      }).join(' ').toLowerCase().replace(/^./, (m) => {
        return m.toUpperCase();
      });
    } else {
      return str;
    }
  }

  public static parseError(error, defaultError) {
    if (!UtilService.empty(error)) {
      try {
        error = JSON.parse(error.originalError._body).message;
      } catch (e) {
        error = defaultError;
      }
    }
    return error;
  }

  public static immutablePush(arr, newEntry) {
    return [].concat(arr, newEntry);
  }

  public static immutablePop(arr) {
    return arr.slice(0, -1);
  }

  public static immutableShift(arr) {
    return arr.slice(1);
  }

  public static immutableUnshift(arr, newEntry) {
    return [].concat(newEntry, arr);
  }

  public static immutableSort(arr, compareFunction) {
    return arr.concat().sort(compareFunction);
  }

  public static immutableReverse(arr) {
    return arr.concat().reverse();
  }

  public static immutableSplice(arr, start, deleteCount, ...items) {
    return [ ...arr.slice(0, start), ...items, ...arr.slice(start + deleteCount) ];
  }

  public static immutableDelete(arr, index) {
    return arr.slice(0, index).concat(arr.slice(index + 1));
  }

  public static todayDate() {
    let todayDate: any = new Date();
    todayDate = new Date(todayDate.getTime() - (todayDate.getTimezoneOffset() * 60000)).toISOString();
    todayDate = todayDate.substring(0, 10).split('-');
    todayDate = todayDate[1] + '-' + todayDate[2] + '-' + todayDate[0];
    todayDate = new Date(todayDate);
    return todayDate;
  }

  public static convertTextToDate(aDate) {
    aDate = aDate.substring(0, 10).split('-');
    aDate = aDate[1] + '-' + aDate[2] + '-' + aDate[0];
    aDate = new Date(aDate);
    return aDate;
  }

  public static isTodayGreater(compareableDate) {
    const todayDate = UtilService.todayDate();
    const greater = false;
    if (todayDate > compareableDate) {
      return true;
    }
    return greater;
  }
  
  public static getMIMEtype(extn){
    let ext=extn.toLowerCase();
    let MIMETypes={
      'txt' :'text/plain',
      'docx':'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'doc' : 'application/msword',
      'pdf' : 'application/pdf',
      'jpg' : 'image/jpeg',
      'bmp' : 'image/bmp',
      'png' : 'image/png',
      'xls' : 'application/vnd.ms-excel',
      'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'rtf' : 'application/rtf',
      'ppt' : 'application/vnd.ms-powerpoint',
      'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    }
    return MIMETypes[ext];
  }


}
