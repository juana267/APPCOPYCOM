import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE } from '../config';

export interface Empleado {
  id: number;
  nombre: string;
  correo: string;
  telefono: string;
  fechaIngreso: string; // ISO date string
  salario: number;
  imagePath?: string | null;
  position?: string | null;
}

@Injectable({ providedIn: 'root' })
export class EmpleadosService {
  private readonly baseUrl = `${API_BASE}/empleados`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.baseUrl);
  }

  create(body: Omit<Empleado, 'id'>): Observable<Empleado> {
    return this.http.post<Empleado>(this.baseUrl, body);
  }

  update(id: number, body: Partial<Empleado>): Observable<Empleado> {
    return this.http.put<Empleado>(`${this.baseUrl}/${id}`, body);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
