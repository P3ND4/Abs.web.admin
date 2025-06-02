import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'console';
import { catchError, map, Observable, throwError } from 'rxjs';
import { IProduct } from '../model/Product';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  baseUrl: string = 'https://absapi-production.up.railway.app/';

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

  createProduct(product: IProduct): Observable<IProduct | any> {
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
}
