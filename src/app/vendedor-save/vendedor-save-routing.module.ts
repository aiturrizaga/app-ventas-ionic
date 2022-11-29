import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendedorSavePage } from './vendedor-save.page';

const routes: Routes = [
  {
    path: '',
    component: VendedorSavePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendedorSavePageRoutingModule {}
