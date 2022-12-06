export class VendedorDto {
  id: string = '';
  nombre: string = '';
  apellido: string = '';
  dni: string = '';
  celular: string = '';
  email: string = '';
  direccion: string = '';
  estado: string = '';
  user: string = '';
  password: string = '';
  ubigeo: Ubigeo | undefined;
}

export class Ubigeo {
  id: string = '';
  departamento?: string = '';
  provincia?: string = '';
  distrito?: string = '';
}
