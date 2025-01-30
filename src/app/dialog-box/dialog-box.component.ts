import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent {
  constructor(private dialogRef: MatDialogRef<DialogBoxComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { message: string }) {
  }


  onConfirmDialog(): void {
    this.dialogRef.close(true);
  }

  onConfirmCancel(): void {
    this.dialogRef.close(false);
  }
}
