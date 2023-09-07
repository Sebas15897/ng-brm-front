import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IContact } from '../../../core/interfaces/contacts.interface';
import { ContactsState } from '../../../core/state/contacts/contacts.state';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject();
  filterForm: FormGroup;
  listContacts$: Observable<IContact[]> = new Observable();
  contacts: IContact[] = [];
  contactsFiltered: IContact[] = [];

  constructor(private store: Store, private fb: FormBuilder) {
    this.listContacts$ = this.store.select(ContactsState.getAllContacts);
    this.filterForm = this.createForm();
    this.subscribeForm();
  }

  ngOnInit() {
    this.subscribeState();
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: [''],
      email: [''],
      phone: [''],
    });
  }

  subscribeState() {
    this.listContacts$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      if (resp && resp.length) {
        this.contacts = resp;
        this.contactsFiltered = resp;
      }
    });
  }

  subscribeForm() {
    this.filterForm
      .get('name')
      ?.valueChanges.pipe(takeUntil(this.destroy))
      .subscribe((name) => {
        if (name) {
          this.contactsFiltered = this.contacts.filter((contact) =>
            contact.name.toLowerCase().includes(name.toLowerCase())
          );
        } else {
          this.contactsFiltered = this.contacts;
        }
      });

    this.filterForm
      .get('email')
      ?.valueChanges.pipe(takeUntil(this.destroy))
      .subscribe((email) => {
        if (email) {
          this.contactsFiltered = this.contacts.filter((contact) =>
            contact.email.toLowerCase().includes(email.toLowerCase())
          );
        } else {
          this.contactsFiltered = this.contacts;
        }
      });

    this.filterForm
      .get('phone')
      ?.valueChanges.pipe(takeUntil(this.destroy))
      .subscribe((phone) => {
        if (phone) {
          this.contactsFiltered = this.contacts.filter((contact) =>
            contact.phone.toLowerCase().includes(phone.toLowerCase())
          );
        } else {
          this.contactsFiltered = this.contacts;
        }
      });
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
