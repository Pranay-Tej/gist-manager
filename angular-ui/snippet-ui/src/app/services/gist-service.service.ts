import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Snippet } from 'src/app/models/snippet';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GistServiceService {

  refreshLibrary(username:string){
    return this.http.get(environment.gistService + '/refresh/' + username, {responseType: 'text'})
  }

  getAllSnippets(username:string): Observable<Snippet[]>{
    return this.http.get<Snippet[]>(environment.gistService + '/snippets/' + '/all/' +  username)
  }

  getSnippetById(id:string): Observable<Snippet>{
    return this.http.get<Snippet>(environment.gistService + '/snippets/' + id);
  }

  getTagSnippets(id:string): Observable<Snippet[]>{
    return this.http.get<Snippet[]>(environment.gistService + '/snippets/tag/' + id);
  }

constructor(private http: HttpClient) { }

}
