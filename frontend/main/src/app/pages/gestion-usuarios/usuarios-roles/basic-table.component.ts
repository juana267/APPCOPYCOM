import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MaterialModule } from '../../../material.module';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { UsuariosService, Usuario } from '../../../services/usuarios.service';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Inject } from '@angular/core';

// table 1
export interface productsData {
  id: number;
  imagePath: string;
  uname: string;
  position: string;
  productName: string;
  budget: number;
  priority: string;
}

const PRODUCT_DATA: productsData[] = [
  {
    id: 1,
    imagePath: 'assets/images/profile/user-1.jpg',
    uname: 'Sunil Joshi',
    position: 'Web Designer',
    productName: 'Elite Admin',
    budget: 3.9,
    priority: 'low'
  },
  {
    id: 2,
    imagePath: 'assets/images/profile/user-2.jpg',
    uname: 'Andrew McDownland',
    position: 'Project Manager',
    productName: 'Real Homes Theme',
    budget: 24.5,
    priority: 'medium'
  },
  {
    id: 3,
    imagePath: 'assets/images/profile/user-3.jpg',
    uname: 'Christopher Jamil',
    position: 'Project Manager',
    productName: 'MedicalPro Theme',
    budget: 12.8,
    priority: 'high'
  },
  {
    id: 4,
    imagePath: 'assets/images/profile/user-4.jpg',
    uname: 'Nirav Joshi',
    position: 'Frontend Engineer',
    productName: 'Hosting Press HTML',
    budget: 2.4,
    priority: 'critical'
  },
];

// table 2

export interface performanceData {
  id: number;
  imagePath: string;
  pname: string;
  category: string;
  progress: number;
  sales: number;
  status: string;
}

const PROJECT_DATA: performanceData[] = [
  {
    id: 1,
    imagePath: 'assets/images/products/s6.jpg',
    pname: 'Gaming Console',
    category: 'Electronics',
    progress: 78.5,
    sales: 3.9,
    status: 'low',
  },
  {
    id: 2,
    imagePath: 'assets/images/products/s9.jpg',
    pname: 'Leather Purse',
    category: 'Fashion',
    progress: 58.6,
    sales: 3.5,
    status: 'medium',
  },
  {
    id: 3,
    imagePath: 'assets/images/products/s7.jpg',
    pname: 'Red Velvate Dress',
    category: 'Womens Fashion',
    progress: 25,
    sales: 3.8,
    status: 'high',
  },
  {
    id: 4,
    imagePath: 'assets/images/products/s4.jpg',
    pname: 'Headphone Boat',
    category: 'Electronics',
    progress: 96.3,
    sales: 3.54,
    status: 'critical',
  },
];

// table 3

export interface paymentData {
  id: number;
  color: string;
  imagePath: string;
  pname: string;
  category: string;
  price: number;
}

const PAYMENT_DATA: paymentData[] = [
  {
    id: 1,
    color: 'primary',
    imagePath: 'assets/images/svgs/icon-paypal.svg',
    pname: 'Paypal',
    category: 'Big Brands',
    price: 6235,
  },
  {
    id: 2,
    color: 'success',
    imagePath: 'assets/images/svgs/icon-office-bag.svg',
    pname: 'Wallet',
    category: 'Bill payment',
    price: 345,
  },
  {
    id: 3,
    color: 'warning',
    imagePath: 'assets/images/svgs/icon-master-card.svg',
    pname: 'Credit Card',
    category: 'Money reversed',
    price: 2235,
  },
  {
    id: 4,
    color: 'error',
    imagePath: 'assets/images/svgs/icon-pie.svg',
    pname: 'Refund',
    category: 'Bill Payment',
    price: 32,
  },
];

export interface Element {
  name: string;
  post: string;
  imgSrc: string;
  pname: string;
  status: string;
  color: string;
  budget: string;
}

const BASIC_DATA: Element[] = [
  { 
    imgSrc: 'assets/images/profile/user-1.jpg',
    name: 'Micheal Doe',
    post: 'Web Designer',
    pname: 'Elite Admin',
    status: 'Active',
    color: 'success',
    budget: '3.9'
   },
   { 
    imgSrc: 'assets/images/profile/user-2.jpg',
    name: 'Andrew McDownland',
    post: 'Project Manager',
    pname: 'Real Homes WP Theme',
    status: 'Pending',
    color: 'warning',
    budget: '3.9'
   },
   { 
    imgSrc: 'assets/images/profile/user-3.jpg',
    name: 'Christopher Jamil',
    post: 'Frontend Engineer',
    pname: 'MedicalPro WP Theme',
    status: 'Cancel',
    color: 'error',
    budget: '3.9'
   },
   { 
    imgSrc: 'assets/images/profile/user-4.jpg',
    name: 'Mathew Anderson',
    post: 'Content Writer',
    pname: 'Hosting Press HTML',
    status: 'Completed',
    color: 'primary',
    budget: '3.9'
   },
];


@Component({
  selector: 'app-basic-table',
  standalone: true,
  imports:[MatTableModule, CommonModule, MatCardModule, HttpClientModule, MaterialModule, MatDialogModule, ReactiveFormsModule],
  templateUrl: './basic-table.component.html',
})
export class AppBasicTableComponent implements OnInit {

  // Usuarios table (remote)
  displayedColumnsUsuarios: string[] = ['id', 'nombre', 'email', 'password', 'rolUsuario', 'acciones'];
  usuariosDataSource = new MatTableDataSource<Usuario>([]);

  // table 4 (existing demo data)
  displayedColumns4 = ['name', 'pname', 'status', 'budget'];
  dataSource4 = new MatTableDataSource<Element>(BASIC_DATA);

  constructor(
    breakpointObserver: BreakpointObserver,
    private usuariosService: UsuariosService,
    private dialog: MatDialog,
  ) {
    breakpointObserver.observe(['(max-width: 600px)']).subscribe((result) => {
      this.displayedColumns4 = result.matches
        ? ['name', 'pname', 'status', 'budget']
        : ['name', 'pname', 'status', 'budget'];
    });

    // Configure filter to check multiple fields
    this.usuariosDataSource.filterPredicate = (data: Usuario, filter: string) => {
      const term = filter.trim().toLowerCase();
      return (
        (data.id + '').includes(term) ||
        (data.nombre ?? '').toLowerCase().includes(term) ||
        (data.email ?? '').toLowerCase().includes(term) ||
        (data.password ?? '').toLowerCase().includes(term) ||
        (data.rolUsuario ?? '').toLowerCase().includes(term)
      );
    };
  }

  // table 1
  displayedColumns1: string[] = ['assigned', 'name', 'priority', 'budget'];
  dataSource1 = PRODUCT_DATA;

  // table 2
  displayedColumns2: string[] = ['product', 'progress', 'status', 'sales'];
  dataSource2 = PROJECT_DATA;

  // table 3
  displayedColumns3: string[] = ['product', 'price'];
  dataSource3 = PAYMENT_DATA;

  ngOnInit(): void {
    this.loadUsuarios();
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.usuariosDataSource.filter = value?.trim().toLowerCase();
  }

  loadUsuarios() {
    this.usuariosService.getUsuarios().subscribe({
      next: (data: Usuario[]) => (this.usuariosDataSource.data = data),
      error: (err: any) => console.error('Error cargando usuarios', err),
    });
  }

  addUsuario() {
    const dialogRef = this.dialog.open(UsuarioDialogComponent, {
      width: '480px',
      data: { title: 'Agregar usuario', roles: this.usuariosService.getRoles() },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.usuariosService.createUsuario(result).subscribe({
          next: () => this.loadUsuarios(),
          error: (err: any) => console.error('Error creando usuario', err),
        });
      }
    });
  }

  editUsuario(row: Usuario) {
    const dialogRef = this.dialog.open(UsuarioDialogComponent, {
      width: '480px',
      data: { title: 'Editar usuario', usuario: row, roles: this.usuariosService.getRoles() },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.usuariosService.updateUsuario(row.id, result).subscribe({
          next: () => this.loadUsuarios(),
          error: (err: any) => console.error('Error actualizando usuario', err),
        });
      }
    });
  }

  deleteUsuario(row: Usuario) {
    if (confirm(`¿Eliminar usuario ${row.nombre}?`)) {
      this.usuariosService.deleteUsuario(row.id).subscribe({
        next: () => this.loadUsuarios(),
        error: (err: any) => console.error('Error eliminando usuario', err),
      });
    }
  }
}


// Usuario interface importado desde el servicio

@Component({
  selector: 'app-usuario-dialog',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  template: `
  <h2 mat-dialog-title>{{ data.title }}</h2>
  <div mat-dialog-content>
    <form [formGroup]="form" class="m-t-8">
      <mat-form-field appearance="outline" class="w-100">
        <mat-label>Nombre</mat-label>
        <input matInput formControlName="nombre" />
      </mat-form-field>

      <mat-form-field appearance="outline" class="w-100">
        <mat-label>Email</mat-label>
        <input matInput type="email" formControlName="email" />
      </mat-form-field>

      <mat-form-field appearance="outline" class="w-100">
        <mat-label>Password</mat-label>
        <input matInput type="text" formControlName="password" />
      </mat-form-field>

      <mat-form-field appearance="outline" class="w-100">
        <mat-label>Rol</mat-label>
        <mat-select formControlName="rolUsuario">
          <mat-option [value]="null">Sin rol</mat-option>
          <mat-option *ngFor="let r of roles" [value]="r">{{ r }}</mat-option>
        </mat-select>
      </mat-form-field>
    </form>
  </div>
  <div mat-dialog-actions align="end">
    <button mat-stroked-button mat-dialog-close>Cancelar</button>
    <button mat-flat-button color="primary" [disabled]="form.invalid" (click)="save()">Guardar</button>
  </div>
  `,
})
export class UsuarioDialogComponent implements OnInit {
  form!: FormGroup;
  roles: string[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UsuarioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; roles: string[]; usuario?: Usuario },
  ) {}

  ngOnInit(): void {
    this.roles = this.data.roles ?? [];
    const u = this.data.usuario;
    this.form = this.fb.group({
      nombre: [u?.nombre || '', [Validators.required, Validators.maxLength(100)]],
      email: [u?.email || '', [Validators.required, Validators.email, Validators.maxLength(100)]],
      password: [u?.password || '', [Validators.minLength(6)]],
      rolUsuario: [u?.rolUsuario ?? null],
    });
  }

  save(): void {
    if (this.form.invalid) return;
    this.dialogRef.close(this.form.value);
  }
}
