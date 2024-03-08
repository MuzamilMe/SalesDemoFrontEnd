import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
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
    path:'search-product/:name',component:SearchBarComponent
  },
 
  {
    path:'', redirectTo:'listProducts',pathMatch:'full'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 
 }
