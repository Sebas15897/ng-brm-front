import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { IContact } from '../../interfaces/contacts.interface';
import { DeleteContactAction, GetContactsAction } from './contacts.actions';

export interface ContactsStateModel {
  contacts: IContact[];
}

let contactsArray: IContact[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@mail.com',
    phone: 1234567890,
    address: '123 Main St',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
    age: 25,
    avatar: '',
    dateOfBirth: '1995-01-01',
  },
  {
    id: 2,
    name: 'Jane Doe',
    email: 'janedoe@mail.com',
    phone: 1234567890,
    address: '123 Main St',
    description: '',
    age: 25,
    avatar: '',
    dateOfBirth: '1995-01-01',
  },
  {
    id: 3,
    name: 'John Smith',
    email: 'johnsmith@mail.com',
    phone: 1234567890,
    address: '123 Main St',
    description: '',
    age: 25,
    avatar: '',
    dateOfBirth: '1995-01-01',
  },
  {
    id: 4,
    name: 'Jane Smith',
    email: 'janesmit@mail.com',
    phone: 1234567890,
    address: '123 Main St',
    description: '',
    age: 25,
    avatar: '',
    dateOfBirth: '1995-01-01',
  },
  {
    id: 5,
    name: 'Jane Smith',
    email: 'janesmit@mail.com',
    phone: 1234567890,
    address: '123 Main St',
    description: '',
    age: 25,
    avatar: '',
    dateOfBirth: '1995-01-01',
  },
];

@State<ContactsStateModel>({
  name: 'contacts',
  defaults: {
    contacts: [],
  },
})
@Injectable()
export class ContactsState {
  @Selector() static getAllContacts(state: ContactsStateModel): IContact[] {
    return state.contacts;
  }

  constructor() {}

  @Action(GetContactsAction)
  GetContactsAction(ctx: StateContext<ContactsStateModel>) {
    ctx.patchState({
      contacts: contactsArray,
    });
  }

  @Action(DeleteContactAction)
  DeleteContactAction(
    ctx: StateContext<ContactsStateModel>,
    { id }: DeleteContactAction
  ) {
    const state = ctx.getState();
    const filteredArray = state.contacts.filter((contact) => contact.id !== id);
    ctx.patchState({
      contacts: filteredArray,
    });
  }
}
