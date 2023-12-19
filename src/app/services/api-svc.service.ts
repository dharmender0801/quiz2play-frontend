import { HttpHeaders ,HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiSvcService {

  constructor(private http:HttpClient) { }
  private formatErrors(error: any) {
    return new error.error;
  }

  get(path: string): Observable<any> {
    return this.http.get(path
    ) as Observable<any>;
  }

  put(path: string, body: any): Observable<any> {
    return this.http.put(
      path,
      body
    ) as Observable<any>;
  }

  post(path: string, body: any, params: HttpHeaders = new HttpHeaders()): Observable<any> {
    return this.http.post(path, body
    ) as Observable<any>;
  }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
  delete(path:any): Observable<any> {
    return this.http.delete(
      path
    ) as Observable<any>;
  }

}

