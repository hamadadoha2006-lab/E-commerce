import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OrdersService } from '../../core/service/orders/orders.service';
import { Order } from '../../core/interface/orders/orders.interface';
import { DatePipe } from '@angular/common';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-allorders',
  imports: [RouterLink, DatePipe, NavbarComponent],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css',
})
export class AllordersComponent implements OnInit {
  private readonly ordersService = inject(OrdersService);
  orders = signal<Order[]>([]);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string>('');

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.ordersService.getUserOrders().subscribe({
      next: (res) => {
        this.orders.set(res);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.log('Orders loading error:', err);
        // Don't show error, just show empty state
        this.orders.set([]);
        this.isLoading.set(false);
      }
    });
  }
}
