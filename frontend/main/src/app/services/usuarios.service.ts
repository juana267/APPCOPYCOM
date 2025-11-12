import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE } from '../config';

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  password?: string | null;
  rolUsuario?: string | null;
}

@Injectable({ providedIn: 'root' })
export class UsuariosService {
  private readonly baseUrl = API_BASE;

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseUrl}/usuarios`);
  }

  createUsuario(body: Partial<Usuario> & { nombre: string; email: string; password: string; rolUsuario?: string | null; }): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.baseUrl}/usuarios`, body);
  }

  updateUsuario(id: number, body: Partial<Usuario>): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.baseUrl}/usuarios/${id}`, body);
  }

  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/usuarios/${id}`);
  }

  getRoles(): string[] {
    return ['ADMINISTRADOR', 'OPERARIO', 'CAJA', 'ANILLADO'];
  }
}
