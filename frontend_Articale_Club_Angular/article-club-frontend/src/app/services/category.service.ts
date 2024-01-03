import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url=environment.apiUrl;


  constructor(private httpClient:HttpClient) { }


  addNewCategory(data:any)
  {
    return this.httpClient.post(this.url+"/category/addNewCategory",data,{
      headers:new HttpHeaders().set('content-Type',"application/json")
    })
  }

  updateCategory(data:any)
  {
    return this.httpClient.post(this.url+"/category/updateCategory",data,{
      headers:new HttpHeaders().set('content-Type',"application/json")
    })
  }

  getAllCategory(){
    return this.httpClient.get(this.url+"/category/getAllCategory");
  }

}
