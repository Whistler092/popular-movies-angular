import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  API_URL: String;
  httpOptions: any = {};
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
  }

  searchMoviesPopulators(page: number){
    this.API_URL = `${environment.host}${environment.apipopular}?api_key=${environment.api_key}&page=${page}`;
    return this.http.get<any[]>(`${this.API_URL}`, this.httpOptions);
  }

  findMovie(id: number){
    this.API_URL = `${environment.host}movie/${id}?api_key=${environment.api_key}`;
    return this.http.get<any[]>(`${this.API_URL}`, this.httpOptions);
  }

  searchMoviesByName(search: string, page: number){
    
    this.API_URL = `${environment.host+environment.apisearch}?query=${search}&api_key=${environment.api_key}&page=${page}`;
    return this.http.get<any[]>(`${this.API_URL}`, this.httpOptions);
  }
}
