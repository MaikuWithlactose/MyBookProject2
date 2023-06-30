import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { UsuarioService } from 'src/app/shared/usuario.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  user: User;


  constructor(private usuarioService: UsuarioService) {
    this.user = new User(
      this.usuarioService.user?.id_user,
      this.usuarioService.user?.name,
      this.usuarioService.user?.last_name,
      this.usuarioService.user?.email,
      this.usuarioService.user?.photo,
      this.usuarioService.user?.password
    );
  }

  CargarUser() {
    this.usuarioService.edit(this.user).subscribe((response: HttpResponse<any>) => {
      if(response.status == 200) {
        console.log('el usuario se ha actualizado correctamente');
        this.usuarioService.user = this.user;
      }
      else
      {
        console.log('no se ha podido actualizar el usuario');
      }
    } , (error: any) => {
      console.log(error);
    });
  }
}