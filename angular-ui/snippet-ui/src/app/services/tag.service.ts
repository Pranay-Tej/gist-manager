import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators'
import { Tag } from '../models/tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  
  getUserTags(username:string): Observable<Tag[]>{
    return this.http.get<Tag[]>(environment.gistService + '/tags/user/' + username);
  }
  
  newTag(username:string, name:string): Observable<Tag>{
    return this.http.post<Tag>(environment.gistService + '/tags/' + username + '/' + name, {});
  }
  
  deleteTag(id: string): Observable<boolean> {
    return this.http.delete<boolean>(environment.gistService + '/tags/' + id);
  }

  getTagById(id: string): Observable<Tag>{
    return this.http.get<Tag>(environment.gistService + '/tags/' + id);
  }
  

  updateTagsOfSnippet(id: string, updated_tags: string[]): Observable<boolean> {
    return this.http.put<boolean>(environment.gistService + '/snippets/updateTags/' + id, updated_tags);
  }

  addTagsToSnippet(id: string, additions: string[]){
    return this.http.put(environment.gistService + '/snippets/addTags/' + id, additions);
  }

  removeTagsFromSnipept(id: string, removals: string[]){
    return this.http.put(environment.gistService + '/snippets/removeTags/' + id, removals);
  }

  constructor(private http:HttpClient) { }
}
