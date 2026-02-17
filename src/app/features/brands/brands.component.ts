import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Brands } from '../../core/interface/brands/brands.interface';
import { BrandsService } from '../../core/service/brand/brands.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-brands',
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {
  private readonly brandsService=inject(BrandsService);
  brandList:WritableSignal<Brands[]>=signal<Brands[]>([]);
  getBrandsData():void{
    this.brandsService.getBrands().subscribe({
      next:(res)=>{
        console.log(res)
        this.brandList.set(res.data)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  ngOnInit(): void {
    this.getBrandsData();
  }
}
