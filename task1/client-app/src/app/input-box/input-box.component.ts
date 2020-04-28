import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { FlaskapiService } from "../flaskapi.service";
import { Router } from "@angular/router";
import { User } from "../models/User";

@Component({
  selector: 'app-input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.css']
})
export class InputBoxComponent implements OnInit {

  constructor(private flaskApiService: FlaskapiService, private router: Router) { }

  public posts: any = [];

  ngOnInit(): void {
  }

  public postForm = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  public sendName(formData: User) {
    console.log(formData);
    this.flaskApiService.sendName(formData).subscribe(res => {
      console.log(res);
      this.posts[0] = res['data'];
      console.log(this.posts);
    });
  }

}
