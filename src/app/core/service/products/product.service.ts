import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { productResponse } from '../../interface/products/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly httpClient=inject(HttpClient);
  getProduct(page: number = 1 , limit: number = 20):Observable<productResponse>{
  return  this.httpClient.get<productResponse>(`${environment.base_url}products?page=${page}&limit=${limit}`);
  }
  
  getProductsByBrand(brandId: string):Observable<productResponse>{
    return this.httpClient.get<productResponse>(`${environment.base_url}products?brand=${brandId}`);
  }
}
