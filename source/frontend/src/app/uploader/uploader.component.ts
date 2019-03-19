import {Component, Inject, Input, OnInit} from '@angular/core';

import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { FileSelectDirective, FileUploader} from 'ng2-file-upload';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit {


  uri: string = "api/file/" + this.data.directory;

  uploader: FileUploader = new FileUploader({url: this.uri});

  attachmentList: any = [];

  constructor(public dialogRef: MatDialogRef<UploaderComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    // On API response
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      if (status === 200) {
        this.data.cb({status: status});
        dialogRef.close();
      }
      else {
        alert(response);
      }
      //this.attachmentList.push(JSON.parse(response));
    };
  }

  ngOnInit() {
    // Attach id info to post info
    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('id', this.data.id);
    };
    // Force only one file at a time
    this.uploader.onAfterAddingFile = f => {
      if (this.uploader.queue.length > 1) {
        this.uploader.removeFromQueue(this.uploader.queue[0]);
      }
    };

  }

}
