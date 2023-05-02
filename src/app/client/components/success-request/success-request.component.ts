import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-success-request',
  templateUrl: './success-request.component.html',
  styleUrls: ['./success-request.component.scss']
})
export class SuccessRequestComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SuccessRequestComponent>,) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
