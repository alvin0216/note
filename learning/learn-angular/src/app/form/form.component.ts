import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  title = 'title';
  desc = new FormControl('desc');

  loginForm = new FormGroup({
    name: new FormControl(''),
    pwd: new FormControl(''),
  });

  hero = { name: '' };

  validateForm = this.fb.group({});

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  log(v: any) {
    console.log('log:', v);
  }
}
