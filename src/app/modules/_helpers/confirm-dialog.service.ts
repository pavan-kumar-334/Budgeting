// import { Injectable } from '@angular/core';
// import { ConfirmDialogComponent, ConfirmDialogModel } from '../shared/dialogs/confirm-dialog/confirm-dialog.component';
// import { MatDialog } from '@angular/material/dialog';
// import { MatSnackBar } from '@angular/material/snack-bar';

// @Injectable({
//     providedIn: 'root'
// })
// export class ConfirmDialogService
// {

//     constructor(
//         private _matDialog: MatDialog,
//         private _matSnackBar: MatSnackBar
//     )
//     {
//     }

//     openErrorDialog(title: string, message: string, customDialogIcon: string | null = null): void
//     {
//         this._matDialog.open(ConfirmDialogComponent,
//             {
//                 width: '400px',
//                 data: new ConfirmDialogModel(title, message, '', 'OK', 'error', customDialogIcon),
//                 disableClose: true
//             });
//     }

//     openSuccessDialog(title: string, message: string, customDialogIcon: string | null = null): void
//     {
//         this._matDialog.open(ConfirmDialogComponent,
//             {
//                 width: '400px',
//                 data: new ConfirmDialogModel(title, message, '', 'OK', 'success', customDialogIcon)
//             });
//     }

//     openInfoDialog(title: string, message: string, customDialogIcon: string | null = null): void
//     {
//         this._matDialog.open(ConfirmDialogComponent,
//             {
//                 width: '400px',
//                 data: new ConfirmDialogModel(title, message, '', 'OK', 'info', customDialogIcon)
//             });
//     }

//     openSnackBar(message: string, action: string): void
//     {
//         this._matSnackBar.open(message, action, {
//             duration        : 2000,
//             verticalPosition: 'top'
//         });
//     }

// }
