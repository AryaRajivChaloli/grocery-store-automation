import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { FlaskapiService } from "../flaskapi.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from "../models/Product";

@Component({
  selector: 'app-seller-update-inventory',
  templateUrl: './seller-update-inventory.component.html',
  styleUrls: ['./seller-update-inventory.component.css']
})
export class SellerUpdateInventoryComponent implements OnInit {

  public data: any = [];
  public invId: any = this.route.snapshot.paramMap.get("id");
  public busy: boolean;

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, private flaskApiService: FlaskapiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    console.log(this.invId);
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
    quant: new FormControl('', Validators.required),
  });

  public updInv(formData: Product) {
    this.busy = true;
    formData["iid"] = this.invId;
    this.flaskApiService.updInv(formData).subscribe(res => {
      this.busy = false;
      console.log(res);
      this.router.navigate(["/sellerhome"]);
    });
  }
}
