import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { stored_key } from '../../constant/storedKey';
import { Order } from '../../interface/orders/orders.interface';
import { jwtDecode } from 'jwt-decode';
import { DecodeData } from '../decodeToken/decode-data.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private readonly httpClient = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);

  private getUserId(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem(stored_key.userToken);
      if (token) {
        const decoded: DecodeData = jwtDecode(token);
        return decoded.id;
      }
    }
    return null;
  }

  getUserOrders(): Observable<Order[]> {
    const userId = this.getUserId();
    return this.httpClient.get<Order[]>(
      `${environment.base_url}orders/user/${userId}`
    );
  }
}
