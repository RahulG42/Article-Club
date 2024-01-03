import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  url=environment.apiUrl;
  constructor(private httpClient:HttpClient) { }

  addNewArticle(data:any)
  {
    return this.httpClient.post(this.url+"/article/addNewArticle",data,{
      headers:new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  updateArticle(data:any)
  {
    return this.httpClient.post(this.url+"/article/updateArticle",data,{
      headers:new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  getAllArticle()
  {
    return this.httpClient.get(this.url+"/article/getAllArticle");
  }

  getAllPublishedArticle()
  {
    return this.httpClient.get(this.url+"/article/getAllPublishedArticle");
  }

  deleteArticle(id:any)
  {
    return this.httpClient.get(this.url+"/article/deleteArticle/"+id);
  }
}



