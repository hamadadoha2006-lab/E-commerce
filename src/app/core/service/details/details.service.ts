import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { productDetailsResponse } from '../../interface/details/details.interface';

@Injectable({
  providedIn: 'root',
})
export class DetailsService {
  private readonly httpClient=inject(HttpClient);
  getSpecificProduct(id:string|null):Observable<productDetailsResponse>{
    return this.httpClient.get<productDetailsResponse>(environment.base_url+`products/${id}`)
  }
}
