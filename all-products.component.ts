import { Component, OnInit } from '@angular/core';
import { FlaskapiService } from "../flaskapi.service";
import { Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Router } from "@angular/router";
import { Seller } from "../models/Seller";
import { Subscription } from 'rxjs';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  public data: any = [];
  public posts: any = [];
  public postSubscription: Subscription;
  
  public postForm = new FormGroup({
  });

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, private flaskApiService: FlaskapiService, private router: Router) { }
 
  ngOnInit(): void {
    this.getAllProducts()
  }


  getAllProducts() {
    this.postSubscription = this.flaskApiService.getAllProducts().subscribe(res => {
      this.posts = res["data"];
      console.log(this.posts.length);
      for (let i = 0; i < this.posts.length; i++) {
        const element = this.posts[i];
        this.posts[i][2] = "/product/".concat(element[0].toString());
      }
      console.log(this.posts);
      this.postSubscription.unsubscribe();
    })
  }
}
