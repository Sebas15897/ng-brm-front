import { IMenu } from 'src/app/core/interfaces/menu.interface';

export const Menu: IMenu[] = [
  {
    description: 'Administrar contactos',
    childs: [
      {
        description: 'Ver contactos',
        icon: '',
        path: 'private/contacts',
      },
      {
        description: 'Crear un contacto',
        icon: '',
        path: 'private/add-contact',
      },
      {
        description: 'Ver mi tarjeta de contacto',
        icon: '',
        path: '',
      },
    ],
  },
];
