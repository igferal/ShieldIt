import { Inject } from '@angular/core';
import { Component } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';


@Component({
    selector: "dialog-id",
    templateUrl: "./copy.dialog.html",
    styleUrls: ["./copy.dialog.css"]
  })
  export class CopyDialog {
    constructor(
      public notifierService: NotifierService,
      public dialogRef: MatDialogRef<CopyDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) {}
  
    copied() {
      this.notifierService.notify("success", "Texto copiado");
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  }
  