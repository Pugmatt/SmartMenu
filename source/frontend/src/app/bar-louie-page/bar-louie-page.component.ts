import { Component, OnInit } from '@angular/core';
import { FileSelectDirective, FileUploader} from 'ng2-file-upload';

const uri = 'http://localhost:3000/file/upload';
@Component({
  selector: 'app-bar-louie-page',
  templateUrl: './bar-louie-page.component.html',
  styleUrls: ['./bar-louie-page.component.css']
})
export class BarLouiePageComponent {


  uploader:FileUploader = new FileUploader({url:uri});
  
  attachmentList: any =[];

  constructor(){

    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) =>{
      this.attachmentList.push(JSON.parse(response));
    }
  }

 

}
