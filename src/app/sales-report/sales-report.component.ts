import {Component, OnInit} from '@angular/core';
import { ProductService } from '../product.service';
import { Sale } from '../Sale';
import { TableColumn } from "../TableCoulmn";

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent implements OnInit {
  columns: TableColumn[] = [
    { 'caption': 'Product Name', 'field': 'productName', 'label': '', isClickable: false, 'imageSrc': '' },
    { 'caption': 'Price', 'field': 'price', 'label': '', isClickable: false, 'imageSrc': '' },
    { 'caption': 'Quantity', 'field': 'qty', 'label': '', isClickable: false, 'imageSrc': '' },
    { 'caption': 'Amount', 'field': 'totalAmount', 'label': '', isClickable: false, 'imageSrc': '' },
    { 'caption': 'Date', 'field': 'date', 'label': '', isClickable: false, 'imageSrc': '' },

  ];

  sales: Sale[] = [];
  sal:Sale=new Sale();

  constructor(private service: ProductService) {

  }
  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.service.getSalesReport().subscribe((sales: any) => {
      sales.forEach((sale: any) => {
        sale.products.forEach((product: any) => {
          this.sal.productName=product.name;
          this.sal.price=product.price;
          this.sal.qty=sale.qty;
          this.sal.date=sale.date;
          this.sal.totalAmount=sale.totalAmount;
          this.sales.push(this.sal);
          this.sal=new Sale();
        });
      });
    });
  }}
