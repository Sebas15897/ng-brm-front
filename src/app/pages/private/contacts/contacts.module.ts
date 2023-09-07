import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ContactsComponent } from './contacts.component';
import { ContactsRoutingModule } from './contacts.routing.module';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { AddContactsModule } from './add-contact/add-contact.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ContactsRoutingModule,
    MatDividerModule,
    MatCardModule,
    MatListModule,
    AddContactsModule,
    MatDialogModule,
  ],
  declarations: [ContactsComponent],
})
export class ContactsModule {}
