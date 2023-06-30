import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { find } from 'rxjs';
import { Books } from 'src/app/models/books';
import { UsuarioService } from 'src/app/shared/usuario.service';
import { BooksService } from 'src/app/shared/books.service';
import { User } from 'src/app/models/user';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})

export class BooksComponent {
  localbooks: Books[] = [ ]
  private user: User;


  constructor (
    public booksService:BooksService,
    private usuarioService: UsuarioService,
    public toast:ToastrService) {

    this.user = this.usuarioService.user ? this.usuarioService.user : { id_user: 0, name: '', last_name: '', email: '', photo: '', password: '' };
    console.log(this.user);

    this.booksService.getAll(this.user.id_user).subscribe(
      response => {
        this.localbooks = response.body;
      },
      error => {
        console.error(error);
      }
    );
  }
  
  findBook(findValue: string) {
    if( findValue.length > 0 ) {  
      this.booksService.getOne(this.user.id_user, parseFloat(findValue)).subscribe((response: HttpResponse<any>) => {
        if(response.status == 200 && response.body) {
          alert("Invocando libro REF : " + findValue)
          this.localbooks = [response.body];
        }
        else
        {
          alert("Invocacion de libro fallida, no se ha encontrado : " + findValue);
          this.localbooks = [];
        }
      } , (error: any) => {
        alert("Invocacion de libro fallida, no se ha encontrado : " + findValue);
        this.localbooks = [];
      });
    } else {
      alert("Valor de invocacion vacío, reiniciando listado.");
      this.booksService.getAll(this.user.id_user).subscribe(
        response => {
          this.localbooks = response.body;
        },
        error => {
          console.error(error);
        }
      );
    }
  }
  
  removeCard(book: Books) {
    console.log(book);
    this.booksService.delete(book.id_user, book.id_book).subscribe((response: HttpResponse<any>) => {
      if (response.status == 200 && response.body) {
        this.booksService.getAll(this.user.id_user).subscribe(
          response => {
            this.localbooks = response.body;
          },
          error => {
            console.error(error);
          }
        );
      } else {
        alert("Invocacion de libro fallida, no se ha encontrado : " + book.id_book.toString());
        this.localbooks = [];
      }
    } , (error: any) => {
      console.log(error)
    });
  }


  soloNumeros(event: any) {
    const input = event.target as HTMLInputElement;
    const inputValue = input.value;

    // Remover letras y comas del valor del input
    const newValue = inputValue.replace(/[a-zA-Z,]/g, '');
    // Actualizar el valor del input sin letras y comas
    input.value = newValue;
  }
}
