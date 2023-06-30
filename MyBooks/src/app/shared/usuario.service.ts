import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { User } from '../models/user';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url: string = 'http://localhost:3000'; // La URL del API

  private logueadoSubject: Subject<boolean> = new Subject<boolean>();

  private _logueado: boolean = false;
  public user: User | null = null;

  constructor(private http: HttpClient) {}

  public set logueado(value: boolean) {
    this._logueado = value;
    this.logueadoSubject.next(value);
  }
  
  public get logueado(): boolean {
    return this._logueado;
  }

  register(user: User): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/register`, user, { observe: 'response'});
  }

  login(credentials: Object): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/login`, credentials, { observe: 'response'});
  }

  edit(user: User): Observable<HttpResponse<any>> {
    const params = new HttpParams().set('id_user', user.id_user.toString());
    return this.http.put<any>(`${this.url}/users`, user, { observe: 'response', params});
  }

  public onLogueadoChange(): Observable<boolean> {
    return this.logueadoSubject.asObservable().pipe(distinctUntilChanged());
  }
}
