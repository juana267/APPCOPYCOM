import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ClientesService, Cliente } from 'src/app/services/clientes.service';

interface RowCliente {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  fecha_registro: Date;
}

@Component({
  templateUrl: './kichen-sink.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class AppKichenSinkComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  displayedColumns: string[] = ['#', 'nombre', 'email', 'telefono', 'direccion', 'fecha_registro', 'acciones'];
  dataSource = new MatTableDataSource<RowCliente>([]);

  constructor(private clientes: ClientesService) {}

  ngOnInit(): void {
    this.load();
  }

  applyFilter(value: string): void {
    this.dataSource.filter = (value || '').trim().toLowerCase();
  }

  private load(): void {
    this.clientes.getAll().subscribe({
      next: (items: Cliente[]) => {
        const rows: RowCliente[] = items.map((c) => ({
          id: Number(c.id),
          nombre: c.nombre,
          email: c.email,
          telefono: c.telefono,
          direccion: c.direccion,
          fecha_registro: c.fecha_registro ? new Date(c.fecha_registro) : new Date(),
        }));
        this.dataSource = new MatTableDataSource<RowCliente>(rows);
        this.dataSource.paginator = this.paginator;
      },
      error: (e) => console.error('Error cargando clientes', e),
    });
  }

  addCliente(): void {
    const nombre = prompt('Nombre del cliente:');
    if (!nombre) return;
    const email = prompt('Correo:') || '';
    const telefono = prompt('Teléfono:') || '';
    const direccion = prompt('Dirección:') || '';
    const fecha_registro = prompt('Fecha de registro (YYYY-MM-DD):', new Date().toISOString().slice(0,10)) || new Date().toISOString().slice(0,10);
    this.clientes.create({ nombre, email, telefono, direccion, fecha_registro } as any).subscribe({
      next: () => this.load(),
      error: (e) => console.error('Error creando cliente', e),
    });
  }

  editar(row: RowCliente): void {
    const nombre = prompt('Nombre:', row.nombre) ?? row.nombre;
    const email = prompt('Correo:', row.email) ?? row.email;
    const telefono = prompt('Teléfono:', row.telefono) ?? row.telefono;
    const direccion = prompt('Dirección:', row.direccion) ?? row.direccion;
    const fecha_registro = prompt('Fecha de registro (YYYY-MM-DD):', (row.fecha_registro?.toISOString()||'').slice(0,10)) ?? (row.fecha_registro?.toISOString()||'').slice(0,10);
    this.clientes.update(row.id, { nombre, email, telefono, direccion, fecha_registro }).subscribe({
      next: () => this.load(),
      error: (e) => console.error('Error actualizando cliente', e),
    });
  }

  eliminar(row: RowCliente): void {
    if (!confirm(`¿Eliminar cliente ${row.nombre}?`)) return;
    this.clientes.delete(row.id).subscribe({
      next: () => this.load(),
      error: (e) => console.error('Error eliminando cliente', e),
    });
  }
}
