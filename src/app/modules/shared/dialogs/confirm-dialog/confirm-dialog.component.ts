import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector     : 'app-confirm-dialog',
    templateUrl  : './confirm-dialog.component.html',
    styleUrls    : ['./confirm-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ConfirmDialogComponent
{
    dialogTitle = '';
    dialogMessage = '';
    dialogConfirmButtonText = '';
    dialogCancelButtonText = '';
    dialogState = 'info';
    dialogIcon: String | null = null;

    constructor(
        public dialogRef: MatDialogRef<ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel
    )
    {
        // Update view with given values
        this.dialogTitle = data.dialogTitle;
        this.dialogMessage = data.dialogMessage;
        this.dialogConfirmButtonText = data.dialogConfirmButtonText;
        this.dialogCancelButtonText = data.dialogCancelButtonText;
        this.dialogState = data.dialogState;
        this.dialogIcon = data.dialogIcon;
    }
}

export class ConfirmDialogModel
{
    constructor(
        public dialogTitle: string,
        public dialogMessage: string,
        public dialogConfirmButtonText: string,
        public dialogCancelButtonText: string,
        public dialogState: string,
        public dialogIcon: string | null = null
    )
    {

    }
}
