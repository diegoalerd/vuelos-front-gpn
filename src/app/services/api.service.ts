import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  
  postProduct(data: any){
    return this.http.post<any>("http://localhost:3000/productList/", data)
  }

  getProduct(){
    return this.http.get<any>("http://localhost:3000/productList/")
  }

  putProduct(data: any, id : number){
    return this.http.put<any>("http://localhost:3000/productList/"+id,data)
  }

  DeleteProduct(id : number){
    return this.http.delete<any>("http://localhost:3000/productList/"+id)
  }
  
}
