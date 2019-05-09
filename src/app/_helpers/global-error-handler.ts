import { ErrorHandler } from '@angular/core';

/**全局错误 */
export class GlobalErrorHandler implements ErrorHandler {
    handleError(error: any): void {
        console.error(error);
    }
}