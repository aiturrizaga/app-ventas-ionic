import { Component, OnInit } from '@angular/core';
import { VendedorService } from '../services/vendedor.service';
import { VendedorDto } from '../dtos/vendedor.dto';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounce, debounceTime, switchMap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  vendedores: VendedorDto[] = [];
  nombreUsuario = '';
  searchControl: FormControl = new FormControl<any>('');

  constructor(private vendedorService: VendedorService,
              private authService: AuthService,
              private router: Router) {
    this.nombreUsuario = this.authService.getSession().nombre;
  }

  ngOnInit() {
    this.getVendedores();
    this.initSearch();
  }

  getVendedores() {
    this.vendedorService.findAll().subscribe(res => {
      this.vendedores = res;
    })
  }

  logout() {
    this.authService.deleteSession();
    this.router.navigate(['login']).then();
  }

  nuevoVendedor() {
    this.router.navigate(['vendedor-save']).then();
  }

  initSearch() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(1000),
        switchMap(search => {
          if (search) {
            return this.vendedorService.findByName(search);
          }
          return this.vendedorService.findAll();
        })
      ).subscribe(res => {
      this.vendedores = res;
      console.log('Respuesta:', res);
    })
  }

}
