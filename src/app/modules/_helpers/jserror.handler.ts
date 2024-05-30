import { Injectable, ErrorHandler, Injector, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from './confirm-dialog.service';

@Injectable()
export class JsErrorHandler implements ErrorHandler {

    constructor(private injector: Injector, private ngzone: NgZone){

    }
    handleError(error: any): void {
        //console.log(error)
        const confirmDialogService = this.injector.get(ConfirmDialogService);
        this.ngzone.run(() => { 
            confirmDialogService.openErrorDialog('An error occurred!', 
            'We are sorry you had to experience this mistake. Please refresh and try again. If the error persists, please contact us via Help.');
        });
    }
}
