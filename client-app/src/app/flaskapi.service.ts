import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";

import { User } from "./models/User";

@Injectable({
  providedIn: 'root'
})
export class FlaskapiService {

  constructor(private httpClient: HttpClient) { }

  public server:string = "http://localhost:5000/api/";

  public sendName(postObj: User) {
    const { name } = postObj;
    const sendData: FormData = new FormData();
    sendData.append("name", name);
    return this.httpClient.post<User>(this.server+"adduser", sendData);
  }

}
