import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { IProduct } from '../model/Product';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  baseUrl: string = 'http://localhost:4000/';

  constructor(private http: HttpClient) {

  }

  getProducts(): Observable<IProduct[]| any> {
    return this.http.get<IProduct[]>(`${this.baseUrl}products/all`).pipe(
      map((response: IProduct[]) => {
        return response;
      }),
      catchError((error) => {
        console.error('Error fetching products:', error);
        return throwError(() => error);
      }))
  }

  createProduct(product: FormData): Observable<IProduct | any> {
    return this.http.post<IProduct>(`${this.baseUrl}products/add`, product).pipe(
      map((response: IProduct) => {
        return response;
      }),
      catchError((error) => {
        console.error('Error creating product:', error);
        return throwError(() => error);
      }))
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}products/${id}`).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => {
        console.error('Error deleting product:', error);
        return throwError(() => error);
      }))
  }
  editProduct(prod: IProduct){
    return this.http.put(`${this.baseUrl}products/edit`,prod).pipe(
      map(
        (response) => {
          return response
        }),
      catchError((error) => {
        console.error('Error deleting product:', error);
        return throwError(() => error)
      })
    )
  }
}
