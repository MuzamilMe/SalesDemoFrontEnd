import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductListComponent} from './product-list/product-list.component';
import {AddProductComponent} from './add-product/add-product.component';
import {UpdateProductComponent} from './update-product/update-product.component';
import {POSComponent} from './pos/pos.component';
import {SalesReportComponent} from './sales-report/sales-report.component';
import {DatewiseSalesComponent} from "./datewise-sales/datewise-sales.component";
import {LessProductsComponent} from "./less-products/less-products.component";
import { LoginComponent } from './login/login.component';
import {AuthGuard} from "./auth-guard/auth-guard.component";



const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Redirect to login by default
  { path: 'login', component: LoginComponent },

  {
    path: 'listProducts', component: ProductListComponent,canActivate:[AuthGuard]
  },
  {
    path: 'addProduct', component: AddProductComponent, canActivate:[AuthGuard]
  },
  {
    path: 'update-product/:id', component: UpdateProductComponent, canActivate:[AuthGuard]
  },

  {
    path: 'pos', component: POSComponent, canActivate:[AuthGuard]
  },
  {
    path: 'dws', component: DatewiseSalesComponent, canActivate:[AuthGuard]
  },
  {
    path: 'SalesReport', component: SalesReportComponent, canActivate:[AuthGuard]
  },
  {
    path: 'lowlevelstock', component: LessProductsComponent, canActivate:[AuthGuard]
  },

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
