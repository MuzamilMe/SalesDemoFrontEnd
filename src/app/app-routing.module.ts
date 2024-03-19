import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { POSComponent } from './pos/pos.component';
const routes: Routes = [
  {
    path:'listProducts', component:ProductListComponent
  },
  {
    path:'addProduct', component:AddProductComponent 
  },
  {
    path:'update-product/:id', component:UpdateProductComponent
  },

  {
    path:'', redirectTo:'listProducts',pathMatch:'full'
  },
  {
    path:'pos',component:POSComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 
 }
