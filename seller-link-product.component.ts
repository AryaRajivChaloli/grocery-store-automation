import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { FlaskapiService } from "../flaskapi.service";
import { Router } from "@angular/router";
import { Product } from "../models/Product";

@Component({
  selector: 'app-seller-link-product',
  templateUrl: './seller-link-product.component.html',
  styleUrls: ['./seller-link-product.component.css']
})
export class SellerLinkProductComponent implements OnInit {

  public data: any = [];
  public busy: boolean;

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, private flaskApiService: FlaskapiService, private router: Router) { }

  ngOnInit(): void {
    this.getFromLocal("SELLER_ID")
    if (this.data["SELLER_ID"]) {
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
  
  public postForm = new FormGroup({
    pid: new FormControl('', Validators.required),
    cost: new FormControl('', Validators.required),
    exp: new FormControl('', Validators.required),
    ret: new FormControl('', Validators.required),
  });

  public linkProduct(formData: Product) {
    this.busy = true;
    formData["sid"] = this.data["SELLER_ID"];
    this.flaskApiService.linkProduct(formData).subscribe(res => {
      this.busy = false;
      console.log(res);
      this.router.navigate(["/sellerhome"]);
    });
  } 
}
