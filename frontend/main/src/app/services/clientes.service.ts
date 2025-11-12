import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE } from '../config';

export interface Cliente {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  fecha_registro: string; // ISO yyyy-MM-dd
}

@Injectable({ providedIn: 'root' })
export class ClientesService {
  private readonly baseUrl = `${API_BASE}/clientes`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.baseUrl);
  }

  create(body: Omit<Cliente, 'id'>): Observable<Cliente> {
    return this.http.post<Cliente>(this.baseUrl, body);
  }

  update(id: number, body: Partial<Cliente>): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.baseUrl}/${id}`, body);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
