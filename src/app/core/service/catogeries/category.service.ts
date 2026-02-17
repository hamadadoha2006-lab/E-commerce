import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { categoriesResponse } from '../../interface/categories/category.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly httpClient=inject(HttpClient);
  getCategories():Observable<categoriesResponse>{
    return this.httpClient.get<categoriesResponse>(environment.base_url+"categories")
  }
}
