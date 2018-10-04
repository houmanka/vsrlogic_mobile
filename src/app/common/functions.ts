import { StorageService } from '../services/storage.service';

export function hasRelevantPermission(type: string) {
    const permissions: any = StorageService.read('permissions');
    if (permissions === undefined || permissions === null) {
        return;
    }
    for (const permission of permissions) {
      if (permission === type) {
          return true;
      }
    }
    return false;
}
export function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
