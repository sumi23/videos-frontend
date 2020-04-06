import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Video } from './model/video';
@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private baseUrl = "http://localhost:8080/video";

  constructor(private http: HttpClient) { }

  listVideo() {
    return this.http.get(`${this.baseUrl}/list`);
  }
  deleteVideo(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteById/${id}`).pipe(map((res: any) => console.log(res)));
  }
  listVideoById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/listById/${id}`);
  }
  toggleStatus(id: number) {
    return this.http.get(`${this.baseUrl}/toggleStatus/${id}`);
  }
  viewLevels() {
    return this.http.get(`${this.baseUrl}/listLevels`);
  }
  viewCategories() {
    return this.http.get(`${this.baseUrl}/listCategories`);
  }
  addVideo(video: Video) {
    return this.http.post(`${this.baseUrl}/add`, video);
  }
  editVideo(video:Video){
     return this.http.put(`${this.baseUrl}/edit`,video);
  }

  // fileDw(file:string): Observable<HttpResponse<Blob>>{
  //   let headers = new HttpHeaders();
  //   headers.append('Accept', 'application/octetstream');
  //   headers.append('Access-Control-Allow-Origin','http://localhost:4200')
  //   return this.http.get(`${this.baseUrl}/download/${file}`, {
  //     headers: headers,
  //     observe: 'response',
  //     responseType:"blob"
  //   }
  //   );
  // }
  deleteReferenceUrlById(id:number){
    return this.http.delete(`${this.baseUrl}/deleteReferenceUrlById/${id}`);
  }
  downloadFile(file:string): Observable<HttpResponse<string>>{
    let headers = new HttpHeaders();
     headers.append('Accept', 'text/plain');
    return this.http.get(`${this.baseUrl}/download/${file}`, {
      headers: headers,
      observe: 'response',
      responseType:"text"
    }
    );
  }

  uploadFile(payload):Observable<any>{
    let headers=new HttpHeaders();
   // headers.append('Access-Control-Allow-Origin','http://localhost:8080')
    headers.append('Content-Type','multipart/form-data');
    return this.http.post(`${this.baseUrl}/upload`,payload,{headers:headers});
  }


}
