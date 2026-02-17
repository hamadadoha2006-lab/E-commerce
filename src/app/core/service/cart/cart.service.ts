import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { stored_key } from '../../constant/storedKey';
import { CartResponse } from '../../interface/cart/cart.interface';
import { PaymentVisaResponse } from '../../../features/cart/models/payment-visa.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly httpClient = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  
  cartItemsCount: WritableSignal<number> = signal<number>(0);

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem(stored_key.userToken);
      if (token) {
        headers = headers.set('token', token);
      } else {
        console.error('No token found in localStorage');
      }
    }
    return headers;
  }

  addToCart(productId: string): Observable<CartResponse> {
    return this.httpClient.post<CartResponse>(
      `${environment.base_url}cart`,
      { productId },
      { headers: this.getHeaders() }
    );
  }

  getCart(): Observable<CartResponse> {
    return this.httpClient.get<CartResponse>(
      `${environment.base_url}cart`,
      { headers: this.getHeaders() }
    );
  }

  updateCartItemQuantity(productId: string, count: number): Observable<CartResponse> {
    return this.httpClient.put<CartResponse>(
      `${environment.base_url}cart/${productId}`,
      { count },
      { headers: this.getHeaders() }
    );
  }

  removeCartItem(productId: string): Observable<CartResponse> {
    return this.httpClient.delete<CartResponse>(
      `${environment.base_url}cart/${productId}`,
      { headers: this.getHeaders() }
    );
  }

  clearCart(): Observable<{ message: string }> {
    return this.httpClient.delete<{ message: string }>(
      `${environment.base_url}cart`,
      { headers: this.getHeaders() }
    );
  }

  checkOutSession(cartId:string|null , checkOutDetails:object):Observable<PaymentVisaResponse>{
    return this.httpClient.post<PaymentVisaResponse>(
      `${environment.base_url}orders/checkout-session/${cartId}?url=http://localhost:4200`,
      checkOutDetails,
      { headers: this.getHeaders() }
    );
  }

  createCashOrder(cartId:string|null , orderDetails:object):Observable<any>{
    return this.httpClient.post<any>(
      `${environment.base_url}orders/${cartId}`,
      orderDetails,
      { headers: this.getHeaders() }
    );
  }
}
