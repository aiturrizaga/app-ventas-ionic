import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Ubigeo, VendedorDto } from '../dtos/vendedor.dto';
import { VendedorService } from '../services/vendedor.service';
import * as uuid from 'uuid';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UbigeoService } from '../services/ubigeo.service';
import { AlertaService } from '../services/alerta.service';

@Component({
  selector: 'app-vendedor-save',
  templateUrl: './vendedor-save.page.html',
  styleUrls: ['./vendedor-save.page.scss'],
})
export class VendedorSavePage implements OnInit {

  vendedorForm: FormGroup = new FormGroup<any>({});
  ubigeos: Ubigeo[] = [];

  constructor(private fb: FormBuilder,
              public vendedorService: VendedorService,
              private ubigeoService: UbigeoService,
              private alertaService: AlertaService,
              private router: Router) {
  }

  ngOnInit() {
    this.initVendedorForm();
    this.listarUbigeos();
  }

  initVendedorForm() {
    this.vendedorForm = this.fb.group({
      id: [null],
      nombre: [null],
      apellido: [null],
      dni: [null],
      email: [null],
      celular: [null],
      direccion: [null],
      estado: ['A'],
      user: [null],
      password: [null],
      ubigeo: [null]
    });
    if (this.vendedorService.vendedorSelected) {
      const vendedor = this.vendedorService.vendedorSelected;
      this.vendedorForm.patchValue({
        id: vendedor.id,
        nombre: vendedor.nombre,
        apellido: vendedor.apellido,
        dni: vendedor.dni,
        email: vendedor.email,
        celular: vendedor.celular,
        direccion: vendedor.direccion,
        estado: vendedor.estado,
        user: vendedor.user,
        password: vendedor.password,
        ubigeo: vendedor.ubigeo?.id
      })
    }
  }

  listarUbigeos() {
    this.ubigeoService.find().subscribe(res => {
      this.ubigeos = res;
    })
  }

  save() {
    if(this.vendedorService.vendedorSelected) {
      this.updateVendedor();
    } else {
      this.registerVendedor();
    }
  }

  registerVendedor() {
    const vendedor: VendedorDto = this.vendedorForm.value;
    vendedor.id = '000014'
    vendedor.ubigeo = {
      id: this.vendedorForm.controls['ubigeo'].value
    }
    this.vendedorService.register(vendedor).subscribe(res => {
      this.vendedorForm.reset();
      this.alertaService.showMessage(`Registraste a ${res.nombre} como nuevo vendedor`);
      this.router.navigate(['home']);
    })
  }

  updateVendedor() {
    const vendedor: VendedorDto = this.vendedorForm.value;
    vendedor.ubigeo = {
      id: this.vendedorForm.controls['ubigeo'].value
    }
    this.vendedorService.update(vendedor).subscribe(res => {
      this.vendedorForm.reset();
      this.alertaService.showMessage('Actualización exitosa');
      this.router.navigate(['home']);
    })
  }

}
