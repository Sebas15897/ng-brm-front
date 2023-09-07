import { IContact } from '../../interfaces/contacts.interface';

export class GetContactsAction {
  static readonly type = '[Contact] get all contacts';
  constructor() {}
}

export class AddContactction {
  static readonly type = '[Contact] add new contact';
  constructor(public payload: IContact) {}
}

export class EditContactAction {
  static readonly type = '[Contact] edit contact';
  constructor(public payload: IContact) {}
}

export class DeleteContactAction {
  static readonly type = '[Contact] delete contact';
  constructor(public id: number) {}
}

export class UpdateContactAction {
  static readonly type = '[Contact] update contact';
  constructor(public payload: IContact) {}
}
