import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { productResponse } from '../../interface/products/product.interface';

@Injectable({
  providedIn: 'root',
})
export class CategorydetailsService {
  private readonly httpClient=inject(HttpClient);
  getCategoryDetails(id:string|null):Observable<productResponse>{
    return this.httpClient.get<productResponse>(environment.base_url+`products?category=${id}`)
  }
}
