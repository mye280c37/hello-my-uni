import { Component, OnInit } from '@angular/core';
import { CKEditor5 } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';

class UploadAdapter {
  loader;  // your adapter communicates to CKEditor through this
  url;
  constructor(loader:any, url:any) {
    this.loader = loader;   
    this.url = url;
    console.log('Upload Adapter Constructor', this.loader, this.url);
  }

  upload() {
    return new Promise((resolve, reject) => {
      console.log('UploadAdapter upload called', this.loader, this.url);
      console.log('the file we got was', this.loader.file);
      resolve({ default: 'http://localhost:8080/image/1359' });
    });
  }

  abort() {
    console.log('UploadAdapter abort');
  }
}

@Component({
  selector: 'app-description-admin',
  templateUrl: './description-admin.component.html',
  styleUrls: ['./description-admin.component.scss']
})
export class DescriptionAdminComponent implements OnInit {
  classicEditor = ClassicEditorBuild;
  ckconfig = {
    // include any other configuration you want
    extraPlugins: [ this.TheUploadAdapterPlugin ]
  };

  constructor() { 
  }

  ngOnInit(): void {
  }

  TheUploadAdapterPlugin(editor:any) {
    console.log('TheUploadAdapterPlugin called');
    editor.plugins.get('FileRepository').createUploadAdapter = (loader:any) => {
      return new UploadAdapter(loader, '/image');
    };
  }

}
