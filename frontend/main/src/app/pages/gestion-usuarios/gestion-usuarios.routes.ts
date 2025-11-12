import { Routes } from '@angular/router';
import { AppBasicTableComponent } from './usuarios-roles/basic-table.component';
import { AppKichenSinkComponent } from './cliente/kichen-sink.component';

export const GestionUsuariosRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'usuarios-roles',
        component: AppBasicTableComponent,
        data: { title: 'Usuarios y Roles' },
      },
      {
        path: 'empleados',
        loadComponent: () => import('./empleados/employee.component').then(m => m.AppEmployeeComponent),
        data: { title: 'Empleados' },
      },
      { path: 'empleado', pathMatch: 'full', redirectTo: 'empleados' },
      {
        path: 'clientes',
        component: AppKichenSinkComponent,
        data: { title: 'Clientes' },
      },
      { path: '', pathMatch: 'full', redirectTo: 'usuarios-roles' },
    ],
  },
];
