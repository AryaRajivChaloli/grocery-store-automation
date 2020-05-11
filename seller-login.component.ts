import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { FlaskapiService } from "../flaskapi.service";
import { Router } from "@angular/router";
import { Seller } from "../models/Seller";

@Component({
  selector: 'app-seller-login',
  templateUrl: './seller-login.component.html',
  styleUrls: ['./seller-login.component.css']
})
export class SellerLoginComponent implements OnInit {
  // MEMBER ATTRIBUTES

  public data: any = []
  public busy: boolean;


  // AUTOMATIC
  
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, private flaskApiService: FlaskapiService, private router: Router) { }

  ngOnInit(): void {
    this.getFromLocal("SELLER_ID")
    if (this.data["SELLER_ID"]) {
      this.router.navigate(["/sellerhome"]);
    }
  }


  // LOCAL STORAGE ACCESS

  saveInLocal(key, val): void {
    this.storage.set(key, val);
  }

  getFromLocal(key): void {
    this.data[key] = this.storage.get(key);
  }


  // FORM STRUCTURE

  public postForm = new FormGroup({
    sid: new FormControl('', Validators.required),
    pwd: new FormControl('', Validators.required),
  });


  // MEMBER FUNCTIONS
  
  public loginSeller(formData: Seller) {
    this.busy = true;
    this.flaskApiService.loginSeller(formData).subscribe(res => {
      this.busy = false;
      console.log(res);
      if (res["data"] == "invalid") {
        this.router.navigate(["/sellerlogin"]);
      }
      else {
        this.saveInLocal("SELLER_ID", formData["sid"]);
        this.router.navigate(["/sellerhome"]);
      }
    });
  }

}
