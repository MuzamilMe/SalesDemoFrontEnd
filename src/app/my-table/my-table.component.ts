import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent implements OnInit {
  
@Input() HeadArray:{Head:string,FieldName:string}[]=[];
@Input() gridArray:any[]=[];
@Input() isAction:boolean=false; 
@Output() onEdit: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() search: EventEmitter<any> = new EventEmitter<any>();

  searchQuery: string = '';

constructor(private productService:ProductService){}
ngOnInit(): void {
  
}
edit(item:any){
this.onEdit.emit(item);
}
delete(item:any){
this.onDelete.emit(item);
}
}
