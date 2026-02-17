import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { productResponse } from '../../interface/products/product.interface';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class BrandProductService {
  private readonly httpClient=inject(HttpClient);
  getBrandProduct(id:string|null):Observable<productResponse>{
    return this.httpClient.get<productResponse>(environment.base_url+`brands/${id}`)
  }
}
