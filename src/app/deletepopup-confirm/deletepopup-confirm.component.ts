import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-deletepopup-confirm',
  templateUrl: './deletepopup-confirm.component.html',
  styleUrls: ['./deletepopup-confirm.component.scss']
})
export class DeletepopupConfirmComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeletepopupConfirmComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

}
