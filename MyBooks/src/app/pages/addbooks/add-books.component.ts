import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Books } from 'src/app/models/books';
import { BooksService } from 'src/app/shared/books.service';
import { UsuarioService } from 'src/app/shared/usuario.service';

@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.css']
})
export class AddBooksComponent {
  //@Output() enviarBook = new EventEmitter<Books>()
  constructor (
    public booksService:BooksService,
    public toast:ToastrService,
    private usuarioService: UsuarioService
  ){}
  
  rellenarFormulario(_title:string, _type:string, _author:string, _price:string, _photo:string)
  {
    let newBook: Books;
    newBook = new Books(_title, _type, _author, parseFloat(_price), _photo, 0, this.usuarioService.user?.id_user);

    this.booksService.add(newBook).subscribe((response: HttpResponse<any>) => {
      if(response.status == 201) {
        console.log('el libro se ha añadido correctamente');
        alert("El libro "+ newBook.title +" ha sido unido al listado de libros prohibidos.")
        this.toast.success("El libro "+ newBook.title +" ha sido unido al listado de libros prohibidos.")
      }
      else
      {
        console.log('no se ha podido añadir el libro');
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
