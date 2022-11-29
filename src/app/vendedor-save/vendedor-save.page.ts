import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Ubigeo, VendedorDto } from '../dtos/vendedor.dto';
import { VendedorService } from '../services/vendedor.service';
import * as uuid from 'uuid';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UbigeoService } from '../services/ubigeo.service';

@Component({
  selector: 'app-vendedor-save',
  templateUrl: './vendedor-save.page.html',
  styleUrls: ['./vendedor-save.page.scss'],
})
export class VendedorSavePage implements OnInit {

  vendedorForm: FormGroup = new FormGroup<any>({});
  ubigeos: Ubigeo[] = [];

  constructor(private fb: FormBuilder,
              private vendedorService: VendedorService,
              private ubigeoService: UbigeoService,
              private toastController: ToastController,
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
  }

  listarUbigeos() {
    this.ubigeoService.find().subscribe(res => {
      this.ubigeos = res;
    })
  }

  registerVendedor() {
    const vendedor: VendedorDto = this.vendedorForm.value;
    vendedor.id = '000011'
    vendedor.ubigeo = {
      id: this.vendedorForm.controls['ubigeo'].value
    }
    this.vendedorService.register(vendedor).subscribe(res => {
      this.vendedorForm.reset();
      this.showMessage(`Registraste a ${res.nombre} como nuevo vendedor`);
      this.router.navigate(['home']);
    })
  }

  async showMessage(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'bottom'
    });

    await toast.present();
  }

}
