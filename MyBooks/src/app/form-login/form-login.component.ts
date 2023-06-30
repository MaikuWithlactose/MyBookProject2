import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../shared/usuario.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})

export class FormLoginComponent {
  email: string = "";
  password: string = "";
  loginForm: FormGroup;


  constructor(private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      contrasena: ['', Validators.required],
    });
  }

  onSubmit(form: any) {
    if (form.valid) {
      console.log(form.value);
      this.login(form.value);
    }
  }

  login(credentials: Object) {
    this.usuarioService.login(credentials).subscribe((response: HttpResponse<any>) => {
      if (response.status === 200) {
        this.usuarioService.user = new User(response.body.id_user, response.body.name, response.body.last_name, response.body.email, response.body.photo, '');
        this.usuarioService.logueado = true;
        this.router.navigate(['books']);
      } else {
        console.log('Las credenciales son incorrectas.');
      }
    } , (error: any) => {
      console.log(error);
    });
  }
}
