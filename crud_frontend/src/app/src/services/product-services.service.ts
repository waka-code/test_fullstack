import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { settings } from '../settings/setting';
import { Observable } from 'rxjs';
import { Product, ResProducts } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductrServicesService {
 private apiUrl:string = settings.api;
 constructor(private http: HttpClient) {}

 getProducts(pageNumber: number = 1, pageSize: number = 10) {
  const url = `${this.apiUrl}/Products/list?pageNumber=${pageNumber}&pageSize=${pageSize}`;
  return this.http.get<ResProducts>(url);
}

getProductsById(name: string) {
  const url = `${this.apiUrl}/Products/product?name=${name}`;
  return this.http.get<Product[] | undefined>(url);
}

createProduct(product: Product) {
  const url = `${this.apiUrl}/Products/create`;
  return this.http.post(url, product);
}

  updateProduct(id: number, product: Product){
    return this.http.put(`${this.apiUrl}/Products/update?id=${id}`, product);
  }

  deleteProduct(id: number){
    return this.http.delete(`${this.apiUrl}/Products/delete?id=${id}`);
  }
}
