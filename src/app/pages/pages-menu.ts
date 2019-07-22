import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'REQUESTS',
    icon: 'nb-home',
    link: '/pages/requests',
  },
  {
    title: 'ADD_USER',
    icon: 'nb-e-commerce',
    link: '/pages/add-user',
    home: true,
  },
  {
    title: 'CONFIRM_NEW_STORES',
    icon: 'nb-e-commerce',
    link: '/pages/confirm-stores'
  }
];
