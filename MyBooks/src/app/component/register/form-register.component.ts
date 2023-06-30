import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../shared/usuario.service';
import { User } from 'src/app/models/user';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-form-register-info',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css']
})
export class FormRegisterComponent {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService) {
    this.registerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      url: ['', [Validators.required, Validators.pattern('^(http(s)?:\\/\\/)?([\\w-]+\\.)+[\\w-]+(\\/[\\w- ;,./?%&=]*)?$')]],
      contrasena: ['', Validators.required],
      repetirContrasena: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.registerForm.valid) {
        if (this.registerForm.value.contrasena == this.registerForm.value.repetirContrasena) {
          const user = new User(
            0,
            this.registerForm.value.nombre,
            this.registerForm.value.appelido,
            this.registerForm.value.email,
            this.registerForm.value.url,
            this.registerForm.value.contrasena
          );

          this.register(user);
        } else {
          console.log('Las contraseñas no coinciden, revise por favor.');
        }
    }
  }

  register(user: User) {
    this.usuarioService.register(user).subscribe((response: HttpResponse<any>) => {
      if (response.status === 201) {
        console.log('Usuario creado correctamente');
      } else {
        console.log('No se ha podido registrar correctamente');
      }
    } , (error: any) => {
      console.log(error);
    });
  }
}
