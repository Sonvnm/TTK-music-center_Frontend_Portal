import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'Main',
    isTitle: true,
    permissions: ['Admin'],
  },
  {
    label: 'Menu.Dashboard',
    icon: 'home',
    link: '/dashboard',
    permissions: ['Admin'],
  },

  // #region Identities
  {
    label: 'Menu.Identities',
    isTitle: true,
    permissions: ['Admin'],
  },
  {
    label: 'Menu.Identities.UserManagement',
    icon: 'lock',
    permissions: ['Admin'],
    subItems: [
      {
        label: 'Menu.Identities.Users',
        link: '/identities/users',
        subPermissions: ['Admin'],
      },
      {
        label: 'Menu.Identities.Roles',
        link: '/identities/roles',
        subPermissions: ['Admin'],
      },
      // {
      //   label: 'Menu.Identities.Permissions',
      //   link: '/identities/permissions',
      //   subPermissions: ['Admin'],
      // },
    ],
  },
  // #endregion Identities

  // #region Operations
  {
    label: 'Menu.Operations',
    isTitle: true,
    permissions: ['Admin', 'Teacher'],
  },
  {
    label: 'Menu.Operations.Rooms',
    icon: 'home',
    permissions: ['Admin'],
    subItems: [
      {
        label: 'Menu.Operations.Rooms.List',
        link: '/operations/rooms',
        subPermissions: ['Admin'],
      },
    ],
  },
  {
    label: 'Menu.Operations.Subjects',
    icon: 'book',
    permissions: ['Admin'],
    subItems: [
      {
        label: 'Menu.Operations.Subjects.List',
        link: '/operations/subjects',
      },
    ],
  },

  {
    label: 'Menu.Operations.Courses',
    icon: 'book-open',
    permissions: ['Admin'],
    subItems: [
      {
        label: 'Menu.Operations.Courses.List',
        link: '/operations/courses',
      },
    ],
  },
  {
    label: 'Quản lý đánh giá',
    icon: 'star',
    permissions: ['Admin', 'Teacher'],
    subItems: [
      {
        label: 'Danh sách đánh giá',
        link: '/operations/review',
      },
    ],
  },
  {
    label: 'Menu.Operations.Classes',
    icon: 'book',
    permissions: ['Admin', 'Teacher'],
    subItems: [
      {
        label: 'Menu.Operations.Classes.List',
        link: '/operations/classes',
        subPermissions: ['Admin', 'Teacher'],
      },
    ],
  },
  {
    label: 'Menu.Operations.Documents',
    icon: 'file-text',
    permissions: ['Admin'],
    subItems: [
      {
        label: 'Menu.Operations.Documents.List',
        link: '/operations/documents',
      },
    ],
  },
  {
    label: 'Menu.Operations.LearningProcess',
    icon: 'repeat',
    permissions: ['Admin', 'Teacher'],
    subItems: [
      {
        label: 'Menu.Operations.LearningProcess.List',
        link: '/operations/learning-process',
      },
    ],
  },
  {
    label: 'Menu.Operations.StudentProcess',
    icon: 'repeat',
    permissions: ['Admin'],
    subItems: [
      {
        label: 'Menu.Operations.StudentProcess.List',
        link: '/operations/student-process',
      },
    ],
  },
  {
    label: 'Menu.Operations.Orders',
    icon: 'shopping-cart',
    permissions: ['Admin'],
    subItems: [
      {
        label: 'Menu.Operations.Orders.List',
        link: '/operations/orders',
      },
    ],
  },
  {
    label: 'Menu.Operations.CaculateSalary',
    icon: 'dollar-sign',
    permissions: ['Admin'],
    subItems: [
      {
        label: 'Menu.Operations.CaculateSalary.List',
        link: '/operations/caculate-salary',
      },
    ],
  },

  // #endregion Operations

  // #region Systems
  {
    label: 'Menu.Systems',
    isTitle: true,
    permissions: ['Admin'],
  },
  {
    label: 'Menu.Systems.Histories',
    icon: 'clock',
    permissions: ['Admin'],
    subItems: [
      {
        label: 'Menu.Systems.Histories.Audit',
        link: '/systems/histories/audit',
      },
      {
        label: 'Menu.Systems.Histories.Banking',
        link: '/systems/histories/banking',
      },
    ],
  },
  {
    label: 'Menu.Systems.Feedback',
    icon: 'message-square',
    link: '/systems/feedback',
    permissions: ['Admin'],
  },

  // #endregion Systems
];
