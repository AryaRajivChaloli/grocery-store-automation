import { Component, OnInit } from '@angular/core';
import { FlaskapiService } from "../flaskapi.service";
import { Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Router } from "@angular/router";
import { Seller } from "../models/Seller";
import { Subscription } from 'rxjs';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-seller-homepage',
  templateUrl: './seller-homepage.component.html',
  styleUrls: ['./seller-homepage.component.css']
})
export class SellerHomepageComponent implements OnInit {

  public data: any = [];
  public sid: any;
  public posts: any = [];
  public postSubscription: Subscription;
  
  public postForm = new FormGroup({
  });

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, private flaskApiService: FlaskapiService, private router: Router) { }

  ngOnInit(): void {
    this.getFromLocal("SELLER_ID")
    if (this.data["SELLER_ID"]) {
      this.getProducts()
    }
    else {
      this.router.navigate(["/sellerlogin"]);
    }
  }

  saveInLocal(key, val): void {
    this.storage.set(key, val);
  }

  getFromLocal(key): void {
    this.data[key] = this.storage.get(key);
  }

  getProducts() {
    this.sid = this.data["SELLER_ID"];
    console.log(this.sid);
    if (this.sid) {
      this.postSubscription = this.flaskApiService.getProducts(this.sid).subscribe(res => {
        this.posts = res["data"];
        console.log(this.posts.length);
        for (let i = 0; i < this.posts.length; i++) {
          const element = this.posts[i];
          this.posts[i][6] = "/sellerinv/".concat(element[0].toString());
        }
        console.log(this.posts);
        this.postSubscription.unsubscribe();
      })
    }
  }
  
  public logOut(formData: Seller) {
    this.storage.clear();
    this.router.navigate(["/sellerlogin"]);
  }

}
