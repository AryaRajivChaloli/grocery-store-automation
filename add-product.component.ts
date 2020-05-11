import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { FlaskapiService } from "../flaskapi.service";
import { Router } from "@angular/router";
import { Product } from "../models/Product";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  public data: any = [];
  public busy: boolean;

  constructor(private flaskApiService: FlaskapiService, private router: Router) { }

  ngOnInit(): void {
  }
  
  public postForm = new FormGroup({
    pid: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    desc: new FormControl('', Validators.required),
  });

  // submit book details to add to the DB
  public addProduct(formData: Product) {
    this.busy = true;
    this.flaskApiService.addProduct(formData).subscribe(res => {
      this.busy = false;
      console.log(res);
      this.router.navigate(["/"]);
    });
  }


}
