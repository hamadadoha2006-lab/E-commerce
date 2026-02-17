import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { stored_key } from '../../constant/storedKey';
import { WishlistResponse, WishlistDataResponse } from '../../interface/wishlist/wishlist.interface';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private readonly httpClient = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  
  wishlistIds: WritableSignal<string[]> = signal<string[]>([]);

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem(stored_key.userToken);
      if (token) {
        headers = headers.set('token', token);
      }
    }
    return headers;
  }

  addToWishlist(productId: string): Observable<WishlistResponse> {
    return this.httpClient.post<WishlistResponse>(
      `${environment.base_url}wishlist`,
      { productId },
      { headers: this.getHeaders() }
    );
  }

  removeFromWishlist(productId: string): Observable<WishlistResponse> {
    return this.httpClient.delete<WishlistResponse>(
      `${environment.base_url}wishlist/${productId}`,
      { headers: this.getHeaders() }
    );
  }

  getWishlist(): Observable<WishlistDataResponse> {
    return this.httpClient.get<WishlistDataResponse>(
      `${environment.base_url}wishlist`,
      { headers: this.getHeaders() }
    );
  }

  isInWishlist(productId: string): boolean {
    return this.wishlistIds().includes(productId);
  }
}
