import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { FlaskapiService } from "../flaskapi.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from "../models/Product";

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.css']
})
export class ProductHomeComponent implements OnInit {

  public data: any = [];
  public posts: any = [];
  public sellers: any = [];
  public pid: any = this.route.snapshot.paramMap.get("id");
  public busy: boolean;

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, private flaskApiService: FlaskapiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    console.log(this.pid);
    this.getProdDetails()
  }
  
  public getProdDetails() {
    this.flaskApiService.getProdDetails(this.pid).subscribe(res => {
      this.posts = res['data'];
      for (let i = 2; i < this.posts.length; i++) {
        const element = this.posts[i];
        this.sellers[i-2] = element;
        this.sellers[i-2][5] = "/sellerpublichome/".concat(element[5].toString());
      }
      console.log(this.posts);
      console.log(this.sellers);
    });
  }
} 
