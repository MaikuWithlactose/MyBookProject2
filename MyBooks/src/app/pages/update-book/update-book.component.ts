import { HttpResponse } from '@angular/common/http';
import { Component, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Books } from 'src/app/models/books';
import { BooksService } from 'src/app/shared/books.service';
import { UsuarioService } from 'src/app/shared/usuario.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})

export class UpdateBookComponent {
  @Output() enviarBook = new EventEmitter<Books>()
  updatingBooks : any = [ ]

  constructor (
    public booksService:BooksService,
    public toast:ToastrService,
    private usuarioService: UsuarioService
  ){}

  rellenarFormulario(_title:string, _type:string, _author:string, _price:string, _photo:string, _id_book:string="0")
  {
    let editBook: Books;
    editBook = new Books(_title, _type, _author, parseFloat(_price), _photo, parseFloat(_id_book), this.usuarioService.user?.id_user);
    
    this.booksService.edit(editBook).subscribe((response: HttpResponse<any>) => {
      if(response.status == 200) {
        console.log('el libro se ha actualizado correctamente');
      }
      else
      {
        console.log('no se ha podido actualizar el libro');
      }
    } , (error: any) => {
      console.log(error);
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
