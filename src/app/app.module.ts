import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {AddProductComponent} from './add-product/add-product.component';
import {UpdateProductComponent} from './update-product/update-product.component';
import {ProductListComponent} from './product-list/product-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {POSComponent} from './pos/pos.component';
import {MatSelectModule} from "@angular/material/select";
import {SalesReportComponent} from './sales-report/sales-report.component';
import {MyTableComponent} from "./my-table/my-table.component";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {DatewiseSalesComponent} from './datewise-sales/datewise-sales.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {LessProductsComponent} from './less-products/less-products.component';
import { LoginComponent } from './login/login.component';
import {MatCardModule} from "@angular/material/card";
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

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
    DatewiseSalesComponent,
    LessProductsComponent,
    LoginComponent,
    DialogBoxComponent
    ],

  imports: [

    BrowserModule,
    AppRoutingModule,MatProgressSpinnerModule,
    HttpClientModule,
    MatFormFieldModule, MatInputModule, MatIconModule,
    FormsModule, MatNativeDateModule, MatDatepickerModule,
    BrowserAnimationsModule, MatTableModule,
    MatFormFieldModule, MatButtonModule, MatInputModule, MatIconModule, MatSelectModule, MatSortModule, MatPaginatorModule, MatDatepickerModule, ReactiveFormsModule, MatCardModule, MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}

