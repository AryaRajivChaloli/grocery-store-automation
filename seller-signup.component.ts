import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { FlaskapiService } from "../flaskapi.service";
import { Router } from "@angular/router";
import { Seller } from "../models/Seller";

@Component({
  selector: 'app-seller-signup',
  templateUrl: './seller-signup.component.html',
  styleUrls: ['./seller-signup.component.css']
})
export class SellerSignupComponent implements OnInit {

  public data: any = [];
  public busy: boolean;

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, private flaskApiService: FlaskapiService, private router: Router) { }

  ngOnInit(): void {
    this.getFromLocal("SELLER_ID")
    if (this.data["SELLER_ID"]) {
      this.router.navigate(["/sellerhome"]);
    }
  }
  
  saveInLocal(key, val): void {
    this.storage.set(key, val);
  }

  getFromLocal(key): void {
    this.data[key] = this.storage.get(key);
  }

  public postForm = new FormGroup({
    sid: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    pwd: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  });

  public signupSeller(formData: Seller) {
    this.busy = true;
    console.log(formData);
    this.flaskApiService.signupSeller(formData).subscribe(res => {
      this.busy = false;
      console.log(res);
      if (res["data"] == "failure") {
        this.router.navigate(["/sellerlogin"]);
      }
      else {
        this.saveInLocal("SELLER_ID", formData["sid"]);
        this.router.navigate(["/sellerhome"]);
      }
    });
  }

}
