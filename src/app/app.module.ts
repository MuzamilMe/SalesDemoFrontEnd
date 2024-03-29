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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import {MatFormFieldModule}  from '@angular/material/form-field';
import {MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { POSComponent } from './pos/pos.component';
import {MatSelectModule} from "@angular/material/select";
import { SalesReportComponent } from './sales-report/sales-report.component';
import {MyTableComponent} from "./my-table/my-table.component";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    AddProductComponent,
    UpdateProductComponent,
    ProductListComponent,
    POSComponent,
    MyTableComponent,
    SalesReportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule, MatTableModule,
    MatFormFieldModule, MatButtonModule, MatInputModule, MatIconModule, MatSelectModule, MatSortModule, MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
