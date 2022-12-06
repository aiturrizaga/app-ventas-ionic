import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { VendedorDto } from '../dtos/vendedor.dto';

@Injectable({
  providedIn: 'root'
})
export class VendedorService {

  vendedorSelected: VendedorDto | undefined = undefined;

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<VendedorDto[]>(`${environment.apiUrl}/vendedores`);
  }

  register(vendedor: VendedorDto) {
    return this.http.post<VendedorDto>(`${environment.apiUrl}/vendedores`, vendedor);
  }

  update(vendedor: VendedorDto) {
    return this.http.put<VendedorDto>(`${environment.apiUrl}/vendedores`, vendedor);
  }

  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/vendedores/delete/${id}`);
  }

  findByName(nombre: string) {
    return this.http.get<VendedorDto[]>(`${environment.apiUrl}/vendedores/nombre/${nombre}`);
  }

}
