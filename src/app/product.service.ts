import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';
import { ReturnStatement } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private  baseURL="http://localhost:9191/products/getAll"
  private  addURL ="http://localhost:9191/products/addProduct"
  private deleteURL="http://localhost:9191/products/delete"
  private updateURl="http://localhost:9191/products/update"
  private getbyIdURL="http://localhost:9191/products/getById"
  private getByNameURL="http://localhost:9191/products/getByName"
  private getCategories="http://localhost:9191/products/getCategoriesOnly"
  private getByCategory="http://localhost:9191/products/productByCategory"

  constructor(private httpClient:HttpClient) { }
  public getListProducts(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.baseURL}`);
  }
  addNewProduct(product:Product):Observable<Object>{
    let form=new FormData();
    //names in inverted should be same as pstman names
    form.append("ProductDTOS[0].name",product.name);
    form.append("ProductDTOS[0].price",product.price);
    form.append("ProductDTOS[0].qty",product.qty);
    form.append("ProductDTOS[0].category",product.category);
    return this.httpClient.post(`${this.addURL}`,form);
  }
  updateProduct(id:string,product:Product):Observable<Object>{
    let form=new FormData();
    form.append("id",product.id);
    form.append("name",product.name);
    form.append("price",product.price);
    form.append("qty",product.qty);
    form.append("category",product.category);
    return this.httpClient.put(`${this.updateURl}`,form);
  }
  deleteProduct(name:string):Observable<Object>{
    return this.httpClient.delete(`${this.deleteURL}/${name}`)
  }
  getById(id:string):Observable<Product>{
    return this.httpClient.get<Product>( `${this.getbyIdURL}/${id}`)
  }
 getByName(name:string):Observable<Product>{
    return this.httpClient.get<Product>( `${this.getByNameURL}/${name}`)
  }
  getCategoriesOnly(){
    return this.httpClient.get<string>(`${this.getCategories}`)
  }
  getProductByCategory(category:string){
    return this.httpClient.get<Product>( `${this.getByCategory}/${category}`)

  }
}
