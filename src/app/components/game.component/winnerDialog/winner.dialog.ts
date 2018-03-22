import { Inject } from "@angular/core";
import { Component } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";
import { NotifierService } from "angular-notifier";

@Component({
  selector: "dialog-winner",
  templateUrl: "./winner.dialog.html",
  styleUrls: ["./winner.dialog.css"]
})
export class WinnerDialog {
  constructor(
    public notifierService: NotifierService,
    public dialogRef: MatDialogRef<WinnerDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

 

  onNoClick(): void {
    this.dialogRef.close();
  }
}
