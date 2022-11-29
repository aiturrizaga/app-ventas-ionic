import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { VendedorDto } from '../dtos/vendedor.dto';

@Injectable({
  providedIn: 'root'
})
export class VendedorService {

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<VendedorDto[]>(`${environment.apiUrl}/vendedores`);
  }

  register(vendedor: VendedorDto) {
    return this.http.post<VendedorDto>(`${environment.apiUrl}/vendedores`, vendedor);
  }

  findByName(nombre: string) {
    return this.http.get<VendedorDto[]>(`${environment.apiUrl}/vendedores/nombre/${nombre}`);
  }

}
