import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-side-register',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-register.component.html',
})
export class AppSideRegisterComponent {
  options = this.settings.getOptions();

  constructor(private settings: CoreService, private router: Router, private http: HttpClient) { }

  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.invalid) return;
    const payload = {
      nombre: this.form.value.uname,
      email: this.form.value.email,
      password: this.form.value.password,
      tipo: 'CLIENTE'
    } as any;
    this.http.post('http://localhost:8080/api/v1/usuarios', payload).subscribe({
      next: () => this.router.navigate(['/authentication/login']),
      error: (err) => {
        console.error(err);
        alert('No se pudo registrar el usuario');
      }
    });
  }
}
