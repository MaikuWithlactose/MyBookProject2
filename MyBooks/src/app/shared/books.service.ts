import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Books } from '../models/books';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private url: string = 'http://localhost:3000'; // La URL del API

  constructor(
    private http: HttpClient
  ) {}


  getAll(id_user: number): Observable<HttpResponse<any>> {
    const params = new HttpParams().set('id_user', id_user.toString());
    return this.http.get<any>(`${this.url}/books`, { observe: 'response', params});
  }

  getOne(id_user: number, id_book: number): Observable<HttpResponse<any>> {
    const params = new HttpParams().set('id_user', id_user.toString()).set('id_book', id_book.toString());
    return this.http.get<any>(`${this.url}/books`, { observe: 'response', params});
  }

  add(book: Books): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/books`, book, { observe: 'response'});
  }

  edit(book: Books): Observable<HttpResponse<any>> {
    const params = new HttpParams().set('id_user', book.id_user.toString()).set('id_book', book.id_book.toString());
    return this.http.put<any>(`${this.url}/books`, book, { observe: 'response', params});
  }

  delete(id_user: number, id_book: number): Observable<HttpResponse<any>> {
    const params = new HttpParams().set('id_user', id_user.toString()).set('id_book', id_book.toString());
    return this.http.delete<any>(`${this.url}/books`, { observe: 'response', params});
  }
  
}
