import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {TableColumn } from 'src/app/TableCoulmn';


@Component({
  selector: 'app-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent<T> implements OnInit, OnChanges, AfterViewInit {

  // Input property to pass the data to be displayed in the table
  @Input() tableData: any;
  @Input() pagination = true;
  //**if don`t want to you default paginator then can input custom**//
  @Input() customPaginator!:MatPaginator;
  // Data source for the Material table
  _dataSource = new MatTableDataSource<any>();

  // Array to store the column names for display
  public displayedColumns: string[] = [];

  // Paginator for the table
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Sort functionality for the table
  @ViewChild(MatSort) sort!: MatSort;
  // Output events to notify parent components about user actions
  @Output() clickOnView = new EventEmitter<any>();
  @Output() clickOnEdit = new EventEmitter<any>();
  @Output() clickOnDelete = new EventEmitter<any>();

  @Input() viewButtonEnabled: boolean = true;
  @Input() updateButtonEnabled: boolean = false;
  @Input() deleteButtonEnabled: boolean = false;

  constructor() {
  }

  // Lifecycle hook: ngOnInit
  ngOnInit(): void {
    // Map the column definitions to column names for display
    //  this.displayedColumns = this.columns.map((tableColumn: TableColumn) => tableColumn.caption);
    this.displayedColumns = this.columns ? this.columns.map((tableColumn: TableColumn) => tableColumn.caption) : [];

  }

  // Lifecycle hook: ngOnChanges
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tableData'] && changes['tableData'].currentValue) {
      // Update the data source when the input data changes
      setTimeout(() => {
        this.setDataSource(changes['tableData'].currentValue);
      }, 10);

    }
  }

  // Input property to define the table columns
  @Input() columns: TableColumn[] = [];

  // Set the data source for the table
  loading = false;

  // setDataSource(data: any[] | any) {

  //   this._dataSource = new MatTableDataSource<any>(data);
  //   if (Array.isArray(data)) {
  //      (!this.pagination && this.customPaginator)?
  //        this._dataSource.paginator = this.customPaginator : this._dataSource.paginator=this.paginator;
  //     this._dataSource.sort = this.sort;
  //   }
  //   setTimeout(() => {
  //     this.loading = false;
  //   }, 1000);
  // }
  setDataSource(data: any[] | any) {
    this._dataSource = new MatTableDataSource<any>(data);
    if (Array.isArray(data)) {
      if (!this.pagination && this.customPaginator) {
        this._dataSource.paginator = this.customPaginator;
      } else {
        this._dataSource.paginator = this.paginator;
      }
      this._dataSource.sort = this.sort;
    }
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  // setDataSource(data: any[] | any) {
  //   try {
  //     if (!data) {
  //       throw new Error("Data is undefined or null.");
  //     }

  //     this._dataSource = new MatTableDataSource<any>(data);

  //     if (Array.isArray(data)) {
  //       if (!this.pagination && this.customPaginator) {
  //         this._dataSource.paginator = this.customPaginator;
  //       } else {
  //         this._dataSource.paginator = this.paginator;
  //       }
  //       this._dataSource.sort = this.sort;
  //     }

  //     this.loading = false; // Assuming loading flag indicates data loading state
  //   } catch (error) {
  //     console.error("Error setting data source:", error);
  //     // Handle error appropriately, e.g., show error message to user or retry data retrieval
  //   }
  // }


  // Handle filter input changes
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this._dataSource.filter = filterValue.trim().toLowerCase();

    if (this._dataSource.paginator) {
      this._dataSource.paginator.firstPage();
    }
  }

  // Lifecycle hook: ngAfterViewInit

  ngAfterViewInit() {
    /**
     * Adding Sorting into the _dataSource
     */
    this._dataSource.sort = this.sort;
  }

  // Custom sorting data accessor function (if needed)
  sortingDataAccessor = (item: any, property: string): string | number => {
    // You can customize this function to handle nested properties if necessary
    return this.getDataByField(item, property);
  };

  // Function to access data by field, including nested properties
  /**
   *method get getDataByField
   *@param obj,field
   *Method for accessing the data of example
   *From parent to child data
   * @param field
   */
  getDataByField(obj: any, field: string): any {
    const fieldParts = field.split('.');
    let data = obj;
    for (const part of fieldParts) {

      if (data) {
        // if(field!='assignTerminal'){
        data = data[part];
        // }else{
        //   data='';
        // }
      } else {
        break;
      }
    }
    return data;
  }
}
