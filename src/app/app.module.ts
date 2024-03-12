import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AddProductComponent } from './add-product/add-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { MyTableComponent } from './my-table/my-table.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    AddProductComponent,
    UpdateProductComponent,
    ProductListComponent,
    SearchBarComponent,
    MyTableComponent

    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
