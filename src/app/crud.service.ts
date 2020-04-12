import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Video } from './model/video';
@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private baseUrl = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  listVideo(): Observable<any> {
    return this.http.get(`${this.baseUrl}/list`);
  }
  deleteVideo(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteById/${id}`);
  }
  listVideoById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/listById/${id}`);
  }
  toggleStatus(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/toggleStatus/${id}`);
  }
  viewLevels(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listLevels`);
  }
  viewCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listCategories`);
  }
  addVideo(video: Video): Observable<any>{
    return this.http.post(`${this.baseUrl}/add`, video);
  }
  editVideo(video: Video) : Observable<any>{
    return this.http.put(`${this.baseUrl}/edit`, video);
  }

  deleteReferenceArtifactById(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteReferenceArtifactById/${id}`);
  }

  deleteSampleProgramById(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteSampleProgramById/${id}`);
  }
  deleteReferenceUrlById(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteReferenceUrlById/${id}`);
  }
  downloadFile(file: string): Observable<HttpResponse<string>> {
    let headers = new HttpHeaders();
    headers.append('Accept', 'text/plain,image/*');
    return this.http.get(`${this.baseUrl}/download/${file}`, {
      headers: headers,
      observe: 'response',
      responseType: "text"
    }
    );
  }

  uploadFile(payload): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post(`${this.baseUrl}/upload`, payload, { headers: headers });
  }


}
