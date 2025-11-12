import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { UsuariosService, Usuario } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-employee-sink-dialog-content',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
  ],
  templateUrl: './employee-sink-dialog-content.html',
})
export class AppEmployeeSinkDialogContentComponent {
  action: string;
  local_data: any;
  usuarios: Usuario[] = [];
  searchCtrl = new FormControl('');
  selectedUsuario: Usuario | null = null;
  filteredUsuarios: Usuario[] = [];

  constructor(
    private dialogRef: MatDialogRef<AppEmployeeSinkDialogContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usuariosService: UsuariosService,
  ) {
    this.local_data = { ...(data || {}) };
    this.action = this.local_data.action || 'Agregar';
  }

  doAction(): void {
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

  selectFile(event: any): void {
    if (!event?.target?.files?.length) return;
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.local_data.imagePath = reader.result;
    };
    reader.readAsDataURL(file);
  }

  ngOnInit(): void {
    this.usuariosService.getUsuarios().subscribe({
      next: (items) => {
        this.usuarios = items || [];
        this.filteredUsuarios = this.usuarios.slice(0, 20);
      },
      error: () => {
        this.usuarios = [];
        this.filteredUsuarios = [];
      },
    });

    this.searchCtrl.valueChanges.subscribe((term) => {
      const t = (term || '').toString().toLowerCase();
      if (!t) {
        this.filteredUsuarios = this.usuarios.slice(0, 20);
        return;
      }
      this.filteredUsuarios = this.usuarios.filter((u) =>
        (u.nombre || '').toLowerCase().includes(t) || (u.email || '').toLowerCase().includes(t)
      ).slice(0, 20);
    });
  }

  onSelectEmpleado(u: Usuario): void {
    this.selectedUsuario = u;
    // Prefijar datos conocidos (nombre y correo) desde usuarios
    this.local_data.Name = u.nombre;
    this.local_data.Email = u.email;
    // Teléfono no existe en usuarios; se deja al usuario completarlo
  }
}
