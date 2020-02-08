import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Snippet } from 'src/app/models/snippet';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GistServiceService {

  getAllSnippets(username:string): Observable<Snippet[]>{
    return this.http.get<Snippet[]>(environment.gistService + '/snippets/' + username + '/all')
  }

  getSnippetById(id:string): Observable<Snippet>{
    return this.http.get<Snippet>(environment.gistService + '/snippets/' + id);
  }

constructor(private http: HttpClient) { }

}
