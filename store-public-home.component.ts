import { Component, OnInit } from '@angular/core';
import { FlaskapiService } from "../flaskapi.service";
import { Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { ActivatedRoute, Router } from "@angular/router";
import { Seller } from "../models/Seller";
import { Subscription } from 'rxjs';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-store-public-home',
  templateUrl: './store-public-home.component.html',
  styleUrls: ['./store-public-home.component.css']
})
export class StorePublicHomeComponent implements OnInit {

  public data: any = [];
  public sid: any = this.route.snapshot.paramMap.get("id");
  public sname: any;
  public posts: any = [];
  public postSubscription: Subscription;
  
  public postForm = new FormGroup({
  });

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, private flaskApiService: FlaskapiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getSellerName();
    this.getProducts();
  }

  getProducts() {
    this.postSubscription = this.flaskApiService.getProducts(this.sid).subscribe(res => {
      this.posts = res["data"];
      console.log(this.posts);
      this.postSubscription.unsubscribe();
    })
  }
  
  getSellerName() {
    this.postSubscription = this.flaskApiService.getSellerName(this.sid).subscribe(res => {
      this.sname = res["data"];
    })
  }
  
}
