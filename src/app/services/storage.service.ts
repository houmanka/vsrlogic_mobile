import { Injectable } from '@angular/core';

/**
 * StorageService used to save into the localStorage
 * Check the spec file for implemntaion
 * @export
 * @class StorageService
 */

@Injectable()
export class StorageService {

  public static store( key, value ): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public static read( key: string ): (object) {
    return  JSON.parse(localStorage.getItem(key));
  }

  public static delete( key: string ): void {
    localStorage.removeItem(key);
  }

  public static clear(): void {
    return localStorage.clear();
  }

}

export interface StorageObj {
    items: { key: string, value: any };
}
