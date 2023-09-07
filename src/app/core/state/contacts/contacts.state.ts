import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { IContact } from '../../interfaces/contacts.interface';
import {
  AddContactction,
  DeleteContactAction,
  EditContactAction,
  GetContactsAction,
  UpdateContactAction,
} from './contacts.actions';
import {
  BrmHideLoadingAction,
  BrmShowLoadingAction,
} from '../loading/loading.actions';
import { SweetAlertHelper } from '../../helpers/sweet-alert.helper';
import { ShowSideBarAction } from '../layout/layout.actions';

export interface ContactsStateModel {
  contacts: IContact[];
  contact: IContact;
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
    contact: {} as IContact,
  },
})
@Injectable()
export class ContactsState {
  @Selector() static getAllContacts(state: ContactsStateModel): IContact[] {
    return state.contacts;
  }

  @Selector() static getSelectContact(state: ContactsStateModel): IContact {
    return state.contact;
  }

  constructor(private sweetAlertHelper: SweetAlertHelper) {}

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

  @Action(AddContactction)
  AddContactction(
    ctx: StateContext<ContactsStateModel>,
    { payload }: AddContactction
  ) {
    ctx.dispatch(new BrmShowLoadingAction()).subscribe(() => {
      setTimeout(() => {
        ctx.dispatch(new BrmHideLoadingAction()).subscribe(() => {
          const state = ctx.getState();
          const ultimoElemento = state.contacts[state.contacts.length - 1];
          payload.id = ultimoElemento.id + 1;
          const filteredArray = [...state.contacts];
          filteredArray.push(payload);
          ctx.patchState({
            contacts: filteredArray,
          });
          this.sweetAlertHelper.createCustomAlert({
            title: 'Contacto agregado con éxito',
            text: 'El contacto ha sido agregado con éxito',
            icon: 'success',
          });
        });
      }, 2000);
    });
  }

  @Action(EditContactAction)
  EditContactAction(
    ctx: StateContext<ContactsStateModel>,
    { payload }: EditContactAction
  ) {
    ctx.dispatch(new BrmShowLoadingAction()).subscribe(() => {
      setTimeout(() => {
        ctx.patchState({
          contact: payload,
        });
        ctx.dispatch(new BrmHideLoadingAction());
      }, 1000);
    });
  }

  @Action(UpdateContactAction)
  UpdateContactAction(
    ctx: StateContext<ContactsStateModel>,
    { payload }: UpdateContactAction
  ) {
    ctx.dispatch(new BrmShowLoadingAction()).subscribe(() => {
      setTimeout(() => {
        ctx.dispatch(new BrmHideLoadingAction()).subscribe(() => {
          const state = ctx.getState();
          const indexUpdate = state.contacts.findIndex(
            (contact) => contact.id === payload.id
          );
          const filteredArray = [...state.contacts];
          filteredArray[indexUpdate] = payload;
          ctx.patchState({
            contacts: filteredArray,
          });
          this.sweetAlertHelper.createCustomAlert({
            title: 'Contacto actualizado con éxito',
            text: 'El contacto ha sido actualizado con éxito',
            icon: 'success',
          });
        });
      }, 2000);
    });
  }
}
