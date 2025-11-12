import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Dashboards',
  },
  {
    displayName: 'Dashboard 1',
    iconName: 'solar:widget-add-line-duotone',
    route: '/dashboards/dashboard1',
  },
{
    divider: true,
    navCap: 'Gestión de Usuarios',
  },
  {
        displayName: 'Usuarios y Roles',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'gestion-usuarios/usuarios-roles',
  },
  {
    displayName: 'Empleados',
    iconName: 'solar:user-id-line-duotone',
    route: 'gestion-usuarios/empleado',
  },
  {
    displayName: 'Clientes',
    iconName: 'solar:database-line-duotone',
    route: 'gestion-usuarios/clientes',
  },
   
 {
    divider: true,
    navCap: 'Apps',
  },
  {
    displayName: 'Chat',
    iconName: 'solar:chat-round-line-line-duotone',
    route: 'apps/chat',
  },
  {
    displayName: 'Calendar',
    iconName: 'solar:calendar-mark-line-duotone',
    route: 'apps/calendar',
  },
  {
    displayName: 'Email',
    iconName: 'solar:letter-line-duotone',
    route: 'apps/email/inbox',
  },
  {
    displayName: 'Contacts',
    iconName: 'solar:phone-line-duotone',
    route: 'apps/contacts',
  },

  
  {
    displayName: 'Invoice',
    iconName: 'solar:bill-list-line-duotone',
    route: 'apps/invoice',
  },
  {
    divider: true,
    navCap: 'Pages',
  },
  {
    displayName: 'Account Setting',
    iconName: 'solar:accessibility-line-duotone',
    route: 'theme-pages/account-setting',
  },
  {
    displayName: 'FAQ',
    iconName: 'solar:question-square-line-duotone',
    route: 'theme-pages/faq',
  },
  {
    displayName: 'Landingpage',
    iconName: 'solar:layers-minimalistic-line-duotone',
    route: 'landingpage',
  },
    {
    divider: true,
    navCap: 'Forms',
  },
  {
    displayName: 'Form elements',
    iconName: 'solar:password-minimalistic-input-line-duotone',
    route: 'forms/forms-elements',
    children: [
      {
        displayName: 'Autocomplete',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'forms/forms-elements/autocomplete',
      },
      {
        displayName: 'Button',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'forms/forms-elements/button',
      },
      {
        displayName: 'Checkbox',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'forms/forms-elements/checkbox',
      },
      {
        displayName: 'Radio',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'forms/forms-elements/radio',
      },
      {
        displayName: 'Datepicker',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'forms/forms-elements/datepicker',
      },
    ],
  },
  {
    displayName: 'File Upload',
    iconName: 'solar:upload-line-duotone',
    route: '/forms/file-upload',
  },
  {
    displayName: 'Form Layouts',
    iconName: 'solar:file-text-line-duotone',
    route: '/forms/form-layouts',
  },
  {
    displayName: 'Form Horizontal',
    iconName: 'solar:align-horizonta-spacing-line-duotone',
    route: '/forms/form-horizontal',
  },
  {
    displayName: 'Form Vertical',
    iconName: 'solar:align-vertical-spacing-line-duotone',
    route: '/forms/form-vertical',
  },
  {
    displayName: 'Form Wizard',
    iconName: 'solar:archive-minimalistic-line-duotone',
    route: '/forms/form-wizard',
  },
  
  {
    divider: true,
    navCap: 'UI',
  },
  {
    displayName: 'Ui Components',
    iconName: 'solar:share-circle-line-duotone',
    route: 'ui-components',
    children: [
      {
        displayName: 'Badge',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'ui-components/badge',
      },
      {
        displayName: 'Expansion Panel',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'ui-components/expansion',
      },
      {
        displayName: 'Chips',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'ui-components/chips',
      },
      {
        displayName: 'Dialog',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'ui-components/dialog',
      },
      {
        displayName: 'Lists',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'ui-components/lists',
      },
      {
        displayName: 'Divider',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'ui-components/divider',
      },
      {
        displayName: 'Menu',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'ui-components/menu',
      },
      {
        displayName: 'Paginator',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'ui-components/paginator',
      },
      {
        displayName: 'Progress Bar',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'ui-components/progress',
      },
      {
        displayName: 'Progress Spinner',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'ui-components/progress-spinner',
      },
      {
        displayName: 'Ripples',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'ui-components/ripples',
      },
      {
        displayName: 'Slide Toggle',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'ui-components/slide-toggle',
      },
      {
        displayName: 'Slider',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'ui-components/slider',
      },
      {
        displayName: 'Snackbar',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'ui-components/snackbar',
      },
      {
        displayName: 'Tabs',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'ui-components/tabs',
      },
      {
        displayName: 'Toolbar',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'ui-components/toolbar',
      },
      {
        displayName: 'Tooltips',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'ui-components/tooltips',
      },
    ],
  },
  {
    divider: true,
    navCap: 'Auth',
  },
  {
    displayName: 'Login',
    iconName: 'solar:lock-keyhole-minimalistic-line-duotone',
    route: '/authentication',
    children: [
      {
        displayName: 'Login 1',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: '/authentication/login',
      },

    ],
  },
  {
    displayName: 'Register',
    iconName: 'solar:user-plus-rounded-line-duotone',
    route: '/authentication',
    children: [
      {
        displayName: 'Side Register',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: '/authentication/side-register',
      },

    ],
  },
  {
    displayName: 'Forgot Password',
    iconName: 'solar:password-outline',
    route: '/authentication',
    children: [
      {
        displayName: 'Side Forgot Password',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: '/authentication/side-forgot-pwd',
      },

    ],
  },
  {
    displayName: 'Two Steps',
    iconName: 'solar:siderbar-line-duotone',
    route: '/authentication',
    children: [
      {
        displayName: 'Side Two Steps',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: '/authentication/side-two-steps',
      },

    ],
  },
  {
    displayName: 'Error',
    iconName: 'solar:bug-minimalistic-line-duotone',
    route: '/authentication/error',
  },
  {
    displayName: 'Maintenance',
    iconName: 'solar:settings-line-duotone',
    route: '/authentication/maintenance',
  },
];
