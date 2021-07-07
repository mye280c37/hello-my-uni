import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-essay-post',
  templateUrl: './essay-post.component.html',
  styleUrls: ['./essay-post.component.scss']
})
export class EssayPostComponent implements OnInit {
  form: FormGroup;
  loading = false;
  imageSrc: string | null = null;
  file: File | null = null;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.form = this.fb.group({
      university: ['', Validators.required],
      category: ['', Validators.required],
      author: ['', Validators.required],
      password: ['', Validators.required],
      file: [''],
    });

    this.form.valueChanges.subscribe(observer => {
      console.log(this.form.valid);
    });
  }

  ngOnInit(): void {
  }

  onAlert(msg: string): void{
    alert(msg);
  }

  onSubmit(e: Event, files: FileList | null): void{
    console.log(this.form.value);
    this.form.value.file = this.imageSrc;
    console.log(this.form.value);
    this.form.value.file = this.file;
    console.log(this.form.value);
  }

  onSubmitwithNoFile(e: Event): void{
    console.log(this.form.value);
  }

  onFileChange(files: FileList | null): void{
    if (files && files.length > 0) {
      // For Preview
      const file = files[0];
      this.file = file;
      console.log(file);
      const reader = new FileReader();

      /* 브라우저는 보안 문제로 인해 파일 경로의 참조를 허용하지 않는다.
        따라서 파일 경로를 img 태그에 바인딩할 수 없다.
        FileReader.readAsDataURL 메소드를 사용하여 이미지 파일을 읽어
        base64 인코딩된 스트링 데이터를 취득한 후, img 태그에 바인딩한다. */
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };

      /* reactive form에서 input[type="file"]을 지원하지 않는다.
        즉 파일 선택 시에 값이 폼컨트롤에 set되지 않는다
        https://github.com/angular/angular.io/issues/3466
        form validation을 위해 file.name을 폼컨트롤에 set한다. */
      // this.avatar.setValue(file.name);
    }
  }

}
