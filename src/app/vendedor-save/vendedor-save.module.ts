import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendedorSavePageRoutingModule } from './vendedor-save-routing.module';

import { VendedorSavePage } from './vendedor-save.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendedorSavePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [VendedorSavePage]
})
export class VendedorSavePageModule {}
