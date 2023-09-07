import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import {
  AddContactction,
  UpdateContactAction,
} from '../../../../core/state/contacts/contacts.actions';
import { Observable, Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { IContact } from '../../../../core/interfaces/contacts.interface';
import { ContactsState } from '../../../../core/state/contacts/contacts.state';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss'],
})

export class AddContactComponent implements OnInit, OnDestroy {
  contact$: Observable<IContact> = new Observable();
  private destroy: Subject<boolean> = new Subject<boolean>();
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    public dialog: MatDialog
  ) {
    this.formGroup = this.createForm();
    this.contact$ = this.store.select(ContactsState.getSelectContact);
    this.suscribeState();
  }

  ngOnInit() {}

  suscribeState() {
    this.contact$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      if (resp) {
        this.formGroup.patchValue(resp);
      }
    });
  }

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

  save() {
    const form = Object.assign({}, this.formGroup.getRawValue());
    if (form && form.id) {
      this.updateContact();
    } else {
      this.addNewContact();
    }
  }

  addNewContact() {
    const form = Object.assign({}, this.formGroup.getRawValue());
    this.store
      .dispatch(new AddContactction(form))
      .pipe(takeUntil(this.destroy))
      .subscribe(() => {
        this.dialog.closeAll();
        this.formGroup.reset();
      });
  }

  updateContact() {
    const form = Object.assign({}, this.formGroup.getRawValue());
    this.store
      .dispatch(new UpdateContactAction(form))
      .pipe(takeUntil(this.destroy))
      .subscribe(() => {
        this.dialog.closeAll();
        this.formGroup.reset();
      });
  }

  get disabledButton(): boolean {
    return this.formGroup.invalid;
  }

  get titleForm(): string {
    return this.formGroup.get('id')?.value
      ? 'Editar contacto:'
      : 'Agregar nuevo contacto:';
  }

  get titleBtn(): string {
    return this.formGroup.get('id')?.value
      ? 'Editar contacto'
      : 'Agregar contacto';
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
