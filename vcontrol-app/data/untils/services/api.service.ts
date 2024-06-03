import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url: string = environment.apiUrl
  constructor(private httpClient: HttpClient) { }
  private handlePath(path: string): string {
    return `${this.url}${path}`
  }
  get<T>(path: string, params?: any,): Observable<T> {
    const url = this.handlePath(path)
    return this.httpClient.get<T>(url, {
      params: {...params},
    })
  }
  post<T>(path: string, body: any,): Observable<T> {
    const url = this.handlePath(path)
    return this.httpClient.post<T>(url, {...body})
  }
  put<T>(path: string, body: any,): Observable<T> {
    const url = this.handlePath(path)
    return this.httpClient.put<T>(url, {...body})
  }
  delete<T>(path: string, params?: any): Observable<T> {
    const url = this.handlePath(path)
    return this.httpClient.delete<T>(url, {
      params: {...params},
    })
  }
}
