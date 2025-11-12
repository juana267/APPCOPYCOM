import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EmpleadosService, Empleado } from 'src/app/services/empleados.service';
import { AppEmployeeSinkDialogContentComponent } from './employee-sink-dialog-content.component';

interface Row {
  id: number;
  nombre: string;
  correo: string;
  telefono: string;
  fechaIngreso: Date;
  salario: number;
}

@Component({
  selector: 'app-employee',
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
    MatDialogModule,
    AppEmployeeSinkDialogContentComponent,
  ],
  templateUrl: './employee.component.html',
})
export class AppEmployeeComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns: string[] = ['#', 'nombre', 'correo', 'telefono', 'fechaIngreso', 'salario', 'acciones'];
  dataSource = new MatTableDataSource<Row>([]);

  constructor(private empleados: EmpleadosService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.load();
  }

  applyFilter(value: string): void {
    this.dataSource.filter = (value || '').trim().toLowerCase();
  }

  private load(): void {
    this.empleados.getAll().subscribe({
      next: (items: Empleado[]) => {
        const rows: Row[] = items.map((e) => ({
          id: Number(e.id),
          nombre: e.nombre,
          correo: e.correo,
          telefono: String(e.telefono ?? ''),
          fechaIngreso: e.fechaIngreso ? new Date(e.fechaIngreso) : new Date(),
          salario: Number(e.salario ?? 0),
        }));
        this.dataSource = new MatTableDataSource<Row>(rows);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => console.error('Error cargando empleados', err),
    });
  }

  addNuevo(): void {
    const ref = this.dialog.open(AppEmployeeSinkDialogContentComponent, {
      width: '640px',
      data: { action: 'Agregar' },
    });
    ref.afterClosed().subscribe((res: any) => {
      if (!res || !res.event) return;
      const ev = String(res.event).toLowerCase();
      if (ev.includes('agregar') || ev.includes('add')) {
        const d = res.data || {};
        const payload: Omit<Empleado, 'id'> = {
          nombre: d.Name,
          correo: d.Email,
          telefono: String(d.Mobile ?? ''),
          fechaIngreso: d.DateOfJoining ? new Date(d.DateOfJoining).toISOString().slice(0,10) : new Date().toISOString().slice(0,10),
          salario: Number(d.Salary ?? 0),
          imagePath: d.imagePath ?? null,
          position: d.Position ?? null,
        } as any;
        this.empleados.create(payload).subscribe({
          next: () => this.load(),
          error: (e) => console.error('Error creando empleado', e),
        });
      }
    });
  }

  editar(row: Row): void {
    const nombre = prompt('Nombre:', row.nombre) ?? row.nombre;
    const correo = prompt('Correo:', row.correo) ?? row.correo;
    const telefono = prompt('Teléfono:', row.telefono) ?? row.telefono;
    const fechaIngreso = prompt('Fecha de ingreso (YYYY-MM-DD):', (row.fechaIngreso?.toISOString()||'').slice(0,10)) ?? (row.fechaIngreso?.toISOString()||'').slice(0,10);
    const salarioStr = prompt('Salario:', String(row.salario)) ?? String(row.salario);
    const salario = Number(salarioStr);
    this.empleados.update(row.id, { nombre, correo, telefono, fechaIngreso, salario }).subscribe({
      next: () => this.load(),
      error: (e) => console.error('Error actualizando empleado', e)
    });
  }

  eliminar(row: Row): void {
    if (!confirm(`¿Eliminar empleado ${row.nombre}?`)) return;
    this.empleados.delete(row.id).subscribe({ next: () => this.load(), error: (e)=> console.error('Error eliminando empleado', e)});
  }
}
