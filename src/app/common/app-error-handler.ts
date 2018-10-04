import { ErrorHandler } from '@angular/core';

export class AppErrorHandler implements ErrorHandler {
    handleError(error) {
        // alert('unexpected error happend');
        console.error(error);
     }
}
