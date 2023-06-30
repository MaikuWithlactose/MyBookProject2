import { Component } from '@angular/core';
import { FormRegisterComponent } from 'src/app/component/register/form-register.component';
import { FormBuilder } from '@angular/forms';
import { UsuarioService } from 'src/app/shared/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formRegisterComponent: FormRegisterComponent;

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService) {
    this.formRegisterComponent = new FormRegisterComponent(this.formBuilder, usuarioService);
  }

}
