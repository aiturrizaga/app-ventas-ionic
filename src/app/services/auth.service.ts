import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginDto } from '../dtos/login.dto';
import { environment } from '../../environments/environment';
import { VendedorDto } from '../dtos/vendedor.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  auth(login: LoginDto) {
    return this.http.post<VendedorDto[]>(`${environment.apiUrl}/auth/login`, login);
  }

  setSession(vendedor: VendedorDto) {
    localStorage.setItem('usuario', JSON.stringify(vendedor));
  }

  getSession(): VendedorDto {
    const user = localStorage.getItem('usuario');
    return JSON.parse(user ? user : "");
  }

  deleteSession() {
    localStorage.removeItem('usuario');
  }

}
