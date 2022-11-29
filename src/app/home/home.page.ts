import { Component, OnInit } from '@angular/core';
import { VendedorService } from '../services/vendedor.service';
import { VendedorDto } from '../dtos/vendedor.dto';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  vendedores: VendedorDto[] = [];
  nombreUsuario = '';

  constructor(private vendedorService: VendedorService,
              private authService: AuthService,
              private router: Router) {
    this.nombreUsuario = this.authService.getSession().nombre;
  }

  ngOnInit() {
    this.getVendedores();
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

}
