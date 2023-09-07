import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss'],
})

export class AddContactComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.createForm();
  }

  ngOnInit() {}

  createForm(): FormGroup {
    return this.fb.group({
      id: [''],
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      description: [''],
      avatar: [''],
      age: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
    });
  }

  addNewContact() {
    console.log(this.formGroup.value);
  }

  get disabledButton(): boolean {
    return this.formGroup.invalid;
  }

  ngOnDestroy() {}
}
