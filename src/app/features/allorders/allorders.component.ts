import { Component, inject, OnInit, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { OrdersService } from '../../core/service/orders/orders.service';
import { Order } from '../../core/interface/orders/orders.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-allorders',
  imports: [RouterLink, DatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css',
})
export class AllordersComponent implements OnInit {
  private readonly ordersService = inject(OrdersService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  
  orders = signal<Order[]>([]);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string>('');
  isLoggedIn = signal<boolean>(false);

  ngOnInit(): void {
    // Check if user is logged in
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('userToken');
      this.isLoggedIn.set(!!token);
      
      if (token) {
        this.loadOrders();
      } else {
        this.isLoading.set(false);
      }
    } else {
      this.isLoading.set(false);
    }
  }

  loadOrders(): void {
    this.ordersService.getUserOrders().subscribe({
      next: (res) => {
        this.orders.set(res);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.log('Orders loading error:', err);
        this.orders.set([]);
        this.isLoading.set(false);
      }
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }

  goToProducts(): void {
    this.router.navigate(['/products']);
  }
}
