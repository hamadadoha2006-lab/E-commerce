import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategorydetailsService } from '../../core/service/categories-details/categorydetails.service';
import { CardComponent } from "../../shared/components/card/card.component";

@Component({
  selector: 'app-categories-details',
  imports: [CardComponent],
  templateUrl: './categories-details.component.html',
  styleUrl: './categories-details.component.css',
})
export class CategoriesDetailsComponent implements OnInit {
  private readonly categorydetailsService=inject(CategorydetailsService);
  private readonly activatedRoute=inject(ActivatedRoute);
  categoryId:string|null=null;
  categoryDetailsData:WritableSignal<any>=signal<any>([]);
  getCategoryDetailsData():void{
    this.categorydetailsService.getCategoryDetails(this.categoryId).subscribe({
      next:(res)=>{
        this.categoryDetailsData.set(res.data)
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  getCategoryId():void{
    this.activatedRoute.paramMap.subscribe({
      next:(urlParams)=>{
        this.categoryId=urlParams.get("id")
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  ngOnInit(): void {
    this.getCategoryId();
    this.getCategoryDetailsData();   
  }
}
