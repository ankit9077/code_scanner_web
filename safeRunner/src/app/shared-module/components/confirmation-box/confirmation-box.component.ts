import { AlertConfig } from './../../../../assets/models';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-box',
  templateUrl: './confirmation-box.component.html',
  styleUrls: ['./confirmation-box.component.scss']
})
export class ConfirmationBoxComponent implements OnInit {
  @Input() alertConfig: AlertConfig = {
    header: 'Delete',
    title: 'Are you sure you want to delete?',
    warning: '',
    confirmButtonColor: '#f44336',
    buttons: { confirm: 'Yes', cancel: 'No' }
  };
  constructor(private dialogRef: MatDialogRef<ConfirmationBoxComponent>) { }

  ngOnInit(): void {
  }

  closeDialog(flag = false) {
    this.dialogRef.close(flag);
  }
}
