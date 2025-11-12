# 📁 Estructura del Frontend - Angular

## Organización de Carpetas

```
frontend/
├── src/
│   ├── app/
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.css
│   │   ├── app.module.ts
│   │   ├── app-routing.module.ts
│   │   │
│   │   ├── core/
│   │   │   ├── guards/
│   │   │   │   ├── auth.guard.ts
│   │   │   │   └── role.guard.ts
│   │   │   │
│   │   │   ├── interceptors/
│   │   │   │   ├── auth.interceptor.ts
│   │   │   │   ├── error.interceptor.ts
│   │   │   │   └── loading.interceptor.ts
│   │   │   │
│   │   │   ├── services/
│   │   │   │   ├── auth.service.ts
│   │   │   │   └── storage.service.ts
│   │   │   │
│   │   │   └── models/
│   │   │       ├── user.model.ts
│   │   │       └── response.model.ts
│   │   │
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   │   ├── navbar/
│   │   │   │   │   ├── navbar.component.ts
│   │   │   │   │   ├── navbar.component.html
│   │   │   │   │   └── navbar.component.css
│   │   │   │   │
│   │   │   │   ├── sidebar/
│   │   │   │   │   ├── sidebar.component.ts
│   │   │   │   │   ├── sidebar.component.html
│   │   │   │   │   └── sidebar.component.css
│   │   │   │   │
│   │   │   │   ├── loading-spinner/
│   │   │   │   │   ├── loading-spinner.component.ts
│   │   │   │   │   ├── loading-spinner.component.html
│   │   │   │   │   └── loading-spinner.component.css
│   │   │   │   │
│   │   │   │   └── confirm-dialog/
│   │   │   │       ├── confirm-dialog.component.ts
│   │   │   │       ├── confirm-dialog.component.html
│   │   │   │       └── confirm-dialog.component.css
│   │   │   │
│   │   │   ├── pipes/
│   │   │   │   ├── currency.pipe.ts
│   │   │   │   ├── date-format.pipe.ts
│   │   │   │   └── filter.pipe.ts
│   │   │   │
│   │   │   └── directives/
│   │   │       └── highlight.directive.ts
│   │   │
│   │   ├── modules/
│   │   │   │
│   │   │   ├── dashboard/
│   │   │   │   ├── dashboard.module.ts
│   │   │   │   ├── dashboard-routing.module.ts
│   │   │   │   ├── dashboard.component.ts
│   │   │   │   ├── dashboard.component.html
│   │   │   │   └── dashboard.component.css
│   │   │   │
│   │   │   ├── pedidos/
│   │   │   │   ├── pedidos.module.ts
│   │   │   │   ├── pedidos-routing.module.ts
│   │   │   │   ├── services/
│   │   │   │   │   └── pedido.service.ts
│   │   │   │   ├── models/
│   │   │   │   │   ├── pedido.model.ts
│   │   │   │   │   └── item-pedido.model.ts
│   │   │   │   ├── components/
│   │   │   │   │   ├── pedidos-list/
│   │   │   │   │   │   ├── pedidos-list.component.ts
│   │   │   │   │   │   ├── pedidos-list.component.html
│   │   │   │   │   │   └── pedidos-list.component.css
│   │   │   │   │   │
│   │   │   │   │   ├── pedido-form/
│   │   │   │   │   │   ├── pedido-form.component.ts
│   │   │   │   │   │   ├── pedido-form.component.html
│   │   │   │   │   │   └── pedido-form.component.css
│   │   │   │   │   │
│   │   │   │   │   └── pedido-detail/
│   │   │   │   │       ├── pedido-detail.component.ts
│   │   │   │   │       ├── pedido-detail.component.html
│   │   │   │   │       └── pedido-detail.component.css
│   │   │   │   │
│   │   │   │   └── pedidos.component.ts
│   │   │   │
│   │   │   ├── clientes/
│   │   │   │   ├── clientes.module.ts
│   │   │   │   ├── clientes-routing.module.ts
│   │   │   │   ├── services/
│   │   │   │   │   └── cliente.service.ts
│   │   │   │   ├── models/
│   │   │   │   │   └── cliente.model.ts
│   │   │   │   ├── components/
│   │   │   │   │   ├── clientes-list/
│   │   │   │   │   ├── cliente-form/
│   │   │   │   │   └── cliente-detail/
│   │   │   │   └── clientes.component.ts
│   │   │   │
│   │   │   ├── servicios/
│   │   │   │   ├── servicios.module.ts
│   │   │   │   ├── servicios-routing.module.ts
│   │   │   │   ├── services/
│   │   │   │   │   └── servicio.service.ts
│   │   │   │   ├── models/
│   │   │   │   │   └── servicio.model.ts
│   │   │   │   └── components/
│   │   │   │       ├── servicios-list/
│   │   │   │       └── servicio-form/
│   │   │   │
│   │   │   ├── facturacion/
│   │   │   │   ├── facturacion.module.ts
│   │   │   │   ├── facturacion-routing.module.ts
│   │   │   │   ├── services/
│   │   │   │   │   └── factura.service.ts
│   │   │   │   ├── models/
│   │   │   │   │   └── factura.model.ts
│   │   │   │   └── components/
│   │   │   │       ├── facturas-list/
│   │   │   │       ├── factura-detail/
│   │   │   │       └── generar-factura/
│   │   │   │
│   │   │   ├── materiales/
│   │   │   │   ├── materiales.module.ts
│   │   │   │   ├── materiales-routing.module.ts
│   │   │   │   ├── services/
│   │   │   │   │   └── material.service.ts
│   │   │   │   └── components/
│   │   │   │       ├── materiales-list/
│   │   │   │       └── material-form/
│   │   │   │
│   │   │   ├── trabajadores/
│   │   │   │   ├── trabajadores.module.ts
│   │   │   │   ├── trabajadores-routing.module.ts
│   │   │   │   ├── services/
│   │   │   │   │   └── trabajador.service.ts
│   │   │   │   └── components/
│   │   │   │       ├── trabajadores-list/
│   │   │   │       └── trabajador-form/
│   │   │   │
│   │   │   ├── maquinas/
│   │   │   │   ├── maquinas.module.ts
│   │   │   │   ├── maquinas-routing.module.ts
│   │   │   │   ├── services/
│   │   │   │   │   └── maquina.service.ts
│   │   │   │   └── components/
│   │   │   │       ├── maquinas-list/
│   │   │   │       └── maquina-form/
│   │   │   │
│   │   │   ├── envios/
│   │   │   │   ├── envios.module.ts
│   │   │   │   ├── envios-routing.module.ts
│   │   │   │   ├── services/
│   │   │   │   │   └── envio.service.ts
│   │   │   │   └── components/
│   │   │   │       ├── envios-list/
│   │   │   │       └── envio-form/
│   │   │   │
│   │   │   └── reportes/
│   │   │       ├── reportes.module.ts
│   │   │       ├── reportes-routing.module.ts
│   │   │       ├── services/
│   │   │       │   └── reporte.service.ts
│   │   │       └── components/
│   │   │           ├── ventas-chart/
│   │   │           ├── servicios-chart/
│   │   │           └── reportes-dashboard/
│   │   │
│   │   └── layout/
│   │       ├── main-layout/
│   │       │   ├── main-layout.component.ts
│   │       │   ├── main-layout.component.html
│   │       │   └── main-layout.component.css
│   │       │
│   │       └── auth-layout/
│   │           ├── auth-layout.component.ts
│   │           ├── auth-layout.component.html
│   │           └── auth-layout.component.css
│   │
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── styles/
│   │       └── custom-theme.scss
│   │
│   ├── environments/
│   │   ├── environment.ts
│   │   └── environment.prod.ts
│   │
│   ├── styles.css
│   ├── index.html
│   └── main.ts
│
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📄 Ejemplo de Archivos Principales

### app.module.ts
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

// Interceptors
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    
    // Angular Material Modules
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### app-routing.module.ts
```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.module')
          .then(m => m.DashboardModule)
      },
      {
        path: 'pedidos',
        loadChildren: () => import('./modules/pedidos/pedidos.module')
          .then(m => m.PedidosModule)
      },
      {
        path: 'clientes',
        loadChildren: () => import('./modules/clientes/clientes.module')
          .then(m => m.ClientesModule)
      },
      {
        path: 'servicios',
        loadChildren: () => import('./modules/servicios/servicios.module')
          .then(m => m.ServiciosModule)
      },
      {
        path: 'facturacion',
        loadChildren: () => import('./modules/facturacion/facturacion.module')
          .then(m => m.FacturacionModule)
      },
      {
        path: 'materiales',
        loadChildren: () => import('./modules/materiales/materiales.module')
          .then(m => m.MaterialesModule)
      },
      {
        path: 'trabajadores',
        loadChildren: () => import('./modules/trabajadores/trabajadores.module')
          .then(m => m.TrabajadoresModule)
      },
      {
        path: 'maquinas',
        loadChildren: () => import('./modules/maquinas/maquinas.module')
          .then(m => m.MaquinasModule)
      },
      {
        path: 'envios',
        loadChildren: () => import('./modules/envios/envios.module')
          .then(m => m.EnviosModule)
      },
      {
        path: 'reportes',
        loadChildren: () => import('./modules/reportes/reportes.module')
          .then(m => m.ReportesModule)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

### pedido.service.ts
```typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pedido, CreatePedidoDTO } from '../models/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = `${environment.apiUrl}/pedidos`;

  constructor(private http: HttpClient) { }

  getAllPedidos(estado?: string): Observable<Pedido[]> {
    let params = new HttpParams();
    if (estado) {
      params = params.set('estado', estado);
    }
    return this.http.get<Pedido[]>(this.apiUrl, { params });
  }

  getPedidoById(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.apiUrl}/${id}`);
  }

  createPedido(pedido: CreatePedidoDTO): Observable<Pedido> {
    return this.http.post<Pedido>(this.apiUrl, pedido);
  }

  updatePedido(id: number, pedido: Pedido): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.apiUrl}/${id}`, pedido);
  }

  deletePedido(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  searchPedidos(query: string, estado?: string): Observable<Pedido[]> {
    let params = new HttpParams().set('q', query);
    if (estado) {
      params = params.set('estado', estado);
    }
    return this.http.get<Pedido[]>(`${this.apiUrl}/buscar`, { params });
  }

  getPedidosByCliente(clienteId: number): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/cliente/${clienteId}`);
  }
}
```

### pedido.model.ts
```typescript
export interface Pedido {
  id: number;
  numeroPedido: string;
  clienteNombre: string;
  fecha: Date;
  fechaEntrega: Date;
  descripcion: string;
  estado: EstadoPedido;
  subtotal: number;
  iva: number;
  total: number;
  items: ItemPedido[];
}

export interface ItemPedido {
  id?: number;
  servicioId: number;
  servicioNombre: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

export interface CreatePedidoDTO {
  clienteId: number;
  fechaEntrega: Date;
  descripcion?: string;
  items: CreateItemPedidoDTO[];
}

export interface CreateItemPedidoDTO {
  servicioId: number;
  cantidad: number;
}

export enum EstadoPedido {
  PENDIENTE = 'PENDIENTE',
  EN_PROCESO = 'EN_PROCESO',
  COMPLETADO = 'COMPLETADO',
  CANCELADO = 'CANCELADO'
}
```

### pedidos-list.component.ts
```typescript
import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../services/pedido.service';
import { Pedido, EstadoPedido } from '../../models/pedido.model';
import { MatDialog } from '@angular/material/dialog';
import { PedidoFormComponent } from '../pedido-form/pedido-form.component';
import { PedidoDetailComponent } from '../pedido-detail/pedido-detail.component';

@Component({
  selector: 'app-pedidos-list',
  templateUrl: './pedidos-list.component.html',
  styleUrls: ['./pedidos-list.component.css']
})
export class PedidosListComponent implements OnInit {
  pedidos: Pedido[] = [];
  filteredPedidos: Pedido[] = [];
  searchTerm: string = '';
  filterEstado: string = 'todos';
  loading: boolean = false;

  displayedColumns: string[] = [
    'numeroPedido',
    'fecha',
    'cliente',
    'estado',
    'total',
    'fechaEntrega',
    'acciones'
  ];

  estados = Object.values(EstadoPedido);

  constructor(
    private pedidoService: PedidoService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadPedidos();
  }

  loadPedidos(): void {
    this.loading = true;
    this.pedidoService.getAllPedidos().subscribe({
      next: (data) => {
        this.pedidos = data;
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar pedidos:', error);
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    this.filteredPedidos = this.pedidos.filter(pedido => {
      const matchesSearch = this.searchTerm === '' || 
        pedido.numeroPedido.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        pedido.clienteNombre.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesEstado = this.filterEstado === 'todos' || 
        pedido.estado === this.filterEstado;
      
      return matchesSearch && matchesEstado;
    });
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(PedidoFormComponent, {
      width: '800px',
      data: { mode: 'create' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadPedidos();
      }
    });
  }

  openDetailDialog(pedido: Pedido): void {
    this.dialog.open(PedidoDetailComponent, {
      width: '600px',
      data: { pedido }
    });
  }

  openEditDialog(pedido: Pedido): void {
    const dialogRef = this.dialog.open(PedidoFormComponent, {
      width: '800px',
      data: { mode: 'edit', pedido }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadPedidos();
      }
    });
  }

  deletePedido(pedido: Pedido): void {
    if (confirm(`¿Está seguro de eliminar el pedido ${pedido.numeroPedido}?`)) {
      this.pedidoService.deletePedido(pedido.id).subscribe({
        next: () => {
          this.loadPedidos();
        },
        error: (error) => {
          console.error('Error al eliminar pedido:', error);
        }
      });
    }
  }

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'COMPLETADO':
        return 'badge-success';
      case 'EN_PROCESO':
        return 'badge-info';
      case 'PENDIENTE':
        return 'badge-warning';
      case 'CANCELADO':
        return 'badge-danger';
      default:
        return 'badge-secondary';
    }
  }
}
```

### pedidos-list.component.html
```html
<div class="container-fluid">
  <div class="row mb-4">
    <div class="col-md-6">
      <h2>Pedidos</h2>
      <p class="text-muted">Gestión de pedidos y servicios</p>
    </div>
    <div class="col-md-6 text-end">
      <button mat-raised-button color="primary" (click)="openCreateDialog()">
        <mat-icon>add</mat-icon>
        Nuevo Pedido
      </button>
    </div>
  </div>

  <!-- Filters -->
  <mat-card class="mb-4">
    <mat-card-content>
      <div class="row">
        <div class="col-md-8">
          <mat-form-field appearance="outline" class="w-100">
            <mat-label>Buscar</mat-label>
            <input matInput 
                   placeholder="Buscar por ID, cliente..."
                   [(ngModel)]="searchTerm"
                   (ngModelChange)="onSearchChange()">
            <mat-icon matPrefix>search</mat-icon>
          </mat-form-field>
        </div>
        <div class="col-md-4">
          <mat-form-field appearance="outline" class="w-100">
            <mat-label>Estado</mat-label>
            <mat-select [(ngModel)]="filterEstado" 
                       (ngModelChange)="onFilterChange()">
              <mat-option value="todos">Todos los estados</mat-option>
              <mat-option *ngFor="let estado of estados" [value]="estado">
                {{ estado }}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </div>
      </div>
    </mat-card-content>
  </mat-card>

  <!-- Table -->
  <mat-card>
    <mat-card-header>
      <mat-card-title>Lista de Pedidos ({{ filteredPedidos.length }})</mat-card-title>
    </mat-card-header>
    <mat-card-content>
      <div class="table-responsive" *ngIf="!loading">
        <table mat-table [dataSource]="filteredPedidos" class="w-100">
          
          <!-- Numero Pedido Column -->
          <ng-container matColumnDef="numeroPedido">
            <th mat-header-cell *matHeaderCellDef>ID</th>
            <td mat-cell *matCellDef="let pedido">{{ pedido.numeroPedido }}</td>
          </ng-container>

          <!-- Fecha Column -->
          <ng-container matColumnDef="fecha">
            <th mat-header-cell *matHeaderCellDef>Fecha</th>
            <td mat-cell *matCellDef="let pedido">
              {{ pedido.fecha | date:'dd/MM/yyyy' }}
            </td>
          </ng-container>

          <!-- Cliente Column -->
          <ng-container matColumnDef="cliente">
            <th mat-header-cell *matHeaderCellDef>Cliente</th>
            <td mat-cell *matCellDef="let pedido">{{ pedido.clienteNombre }}</td>
          </ng-container>

          <!-- Estado Column -->
          <ng-container matColumnDef="estado">
            <th mat-header-cell *matHeaderCellDef>Estado</th>
            <td mat-cell *matCellDef="let pedido">
              <span class="badge" [ngClass]="getEstadoClass(pedido.estado)">
                {{ pedido.estado }}
              </span>
            </td>
          </ng-container>

          <!-- Total Column -->
          <ng-container matColumnDef="total">
            <th mat-header-cell *matHeaderCellDef>Total</th>
            <td mat-cell *matCellDef="let pedido" class="text-success">
              {{ pedido.total | currency:'USD':'symbol':'1.2-2' }}
            </td>
          </ng-container>

          <!-- Fecha Entrega Column -->
          <ng-container matColumnDef="fechaEntrega">
            <th mat-header-cell *matHeaderCellDef>Entrega</th>
            <td mat-cell *matCellDef="let pedido">
              {{ pedido.fechaEntrega | date:'dd/MM/yyyy' }}
            </td>
          </ng-container>

          <!-- Acciones Column -->
          <ng-container matColumnDef="acciones">
            <th mat-header-cell *matHeaderCellDef>Acciones</th>
            <td mat-cell *matCellDef="let pedido">
              <button mat-icon-button 
                      color="primary"
                      (click)="openDetailDialog(pedido)"
                      matTooltip="Ver detalles">
                <mat-icon>visibility</mat-icon>
              </button>
              <button mat-icon-button 
                      color="accent"
                      (click)="openEditDialog(pedido)"
                      matTooltip="Editar">
                <mat-icon>edit</mat-icon>
              </button>
              <button mat-icon-button 
                      color="warn"
                      (click)="deletePedido(pedido)"
                      matTooltip="Eliminar">
                <mat-icon>delete</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </div>

      <div *ngIf="loading" class="text-center p-5">
        <mat-spinner></mat-spinner>
      </div>
    </mat-card-content>
  </mat-card>
</div>
```

### pedido-form.component.ts
```typescript
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PedidoService } from '../../services/pedido.service';
import { ClienteService } from '../../../clientes/services/cliente.service';
import { ServicioService } from '../../../servicios/services/servicio.service';
import { CreatePedidoDTO, CreateItemPedidoDTO } from '../../models/pedido.model';
import { Cliente } from '../../../clientes/models/cliente.model';
import { Servicio } from '../../../servicios/models/servicio.model';

@Component({
  selector: 'app-pedido-form',
  templateUrl: './pedido-form.component.html',
  styleUrls: ['./pedido-form.component.css']
})
export class PedidoFormComponent implements OnInit {
  pedidoForm: FormGroup;
  clientes: Cliente[] = [];
  servicios: Servicio[] = [];
  mode: 'create' | 'edit';

  constructor(
    private fb: FormBuilder,
    private pedidoService: PedidoService,
    private clienteService: ClienteService,
    private servicioService: ServicioService,
    public dialogRef: MatDialogRef<PedidoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.mode = data.mode;
    this.pedidoForm = this.fb.group({
      clienteId: ['', Validators.required],
      fechaEntrega: ['', Validators.required],
      descripcion: [''],
      items: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadClientes();
    this.loadServicios();
  }

  get items(): FormArray {
    return this.pedidoForm.get('items') as FormArray;
  }

  loadClientes(): void {
    this.clienteService.getAllClientes().subscribe({
      next: (data) => {
        this.clientes = data;
      },
      error: (error) => {
        console.error('Error al cargar clientes:', error);
      }
    });
  }

  loadServicios(): void {
    this.servicioService.getAllServicios().subscribe({
      next: (data) => {
        this.servicios = data;
      },
      error: (error) => {
        console.error('Error al cargar servicios:', error);
      }
    });
  }

  addItem(): void {
    const itemForm = this.fb.group({
      servicioId: ['', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]]
    });
    this.items.push(itemForm);
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  getItemSubtotal(index: number): number {
    const item = this.items.at(index);
    const servicioId = item.get('servicioId')?.value;
    const cantidad = item.get('cantidad')?.value;
    
    if (servicioId && cantidad) {
      const servicio = this.servicios.find(s => s.id === servicioId);
      if (servicio) {
        return servicio.precioBase * cantidad;
      }
    }
    return 0;
  }

  getTotal(): number {
    let total = 0;
    for (let i = 0; i < this.items.length; i++) {
      total += this.getItemSubtotal(i);
    }
    return total;
  }

  onSubmit(): void {
    if (this.pedidoForm.valid) {
      const formValue = this.pedidoForm.value;
      const createDTO: CreatePedidoDTO = {
        clienteId: formValue.clienteId,
        fechaEntrega: formValue.fechaEntrega,
        descripcion: formValue.descripcion,
        items: formValue.items
      };

      this.pedidoService.createPedido(createDTO).subscribe({
        next: (result) => {
          this.dialogRef.close(result);
        },
        error: (error) => {
          console.error('Error al crear pedido:', error);
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
```

### environment.ts
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api/v1'
};
```

### environment.prod.ts
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.copiaexpress.com/api/v1'
};
```

### package.json
```json
{
  "name": "copiadora-frontend",
  "version": "1.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test",
    "lint": "ng lint"
  },
  "private": true,
  "dependencies": {
    "@angular/animations": "^16.2.0",
    "@angular/common": "^16.2.0",
    "@angular/compiler": "^16.2.0",
    "@angular/core": "^16.2.0",
    "@angular/forms": "^16.2.0",
    "@angular/material": "^16.2.0",
    "@angular/platform-browser": "^16.2.0",
    "@angular/platform-browser-dynamic": "^16.2.0",
    "@angular/router": "^16.2.0",
    "@angular/cdk": "^16.2.0",
    "rxjs": "~7.8.0",
    "tslib": "^2.3.0",
    "zone.js": "~0.13.0",
    "ng2-charts": "^4.1.1",
    "chart.js": "^4.3.0"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^16.2.0",
    "@angular/cli": "~16.2.0",
    "@angular/compiler-cli": "^16.2.0",
    "@types/jasmine": "~4.3.0",
    "jasmine-core": "~4.6.0",
    "karma": "~6.4.0",
    "karma-chrome-launcher": "~3.2.0",
    "karma-coverage": "~2.2.0",
    "karma-jasmine": "~5.1.0",
    "karma-jasmine-html-reporter": "~2.1.0",
    "typescript": "~5.1.3"
  }
}
```

---

## 🚀 Comandos para iniciar el proyecto Angular

```bash
# Instalar Angular CLI globalmente
npm install -g @angular/cli

# Crear nuevo proyecto Angular
ng new copiadora-frontend --routing --style=css

# Entrar al directorio
cd copiadora-frontend

# Instalar Angular Material
ng add @angular/material

# Instalar ng2-charts para gráficos
npm install ng2-charts chart.js

# Generar módulos
ng generate module modules/pedidos --routing
ng generate module modules/clientes --routing
ng generate module modules/facturacion --routing
# ... etc

# Generar servicios
ng generate service modules/pedidos/services/pedido
ng generate service modules/clientes/services/cliente
# ... etc

# Generar componentes
ng generate component modules/pedidos/components/pedidos-list
ng generate component modules/pedidos/components/pedido-form
ng generate component modules/pedidos/components/pedido-detail
# ... etc

# Ejecutar en modo desarrollo
ng serve

# Compilar para producción
ng build --configuration production
```

---

Esta es la estructura completa del frontend en Angular que replica toda la funcionalidad del sistema React actual.
