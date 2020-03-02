import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators'
import { Tag } from '../models/tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  deleteTag(id: string) {
    return this.http.delete(environment.gistService + '/tags/' + id, {responseType: 'text'});
  }

  getUserTags(username:string): Observable<Tag[]>{
    return this.http.get<Tag[]>(environment.gistService + '/tags/user/' + username);
  }

  newTag(username:string, name:string): Observable<string>{
    return this.http.post<string>(environment.gistService + '/tags/' + username + '/' + name, {responseType: 'text'}).pipe(
      tap( () => {
        this.refreshNeeded$.next();
      })
    );
  }

  getTagById(id: string): Observable<Tag>{
    return this.http.get<Tag>(environment.gistService + '/tags/' + id);
  }
  
  addTagsToSnippet(id: string, additions: string[]){
    return this.http.put(environment.gistService + '/snippets/addTags/' + id, additions);
  }

  removeTagsFromSnipept(id: string, removals: string[]){
    return this.http.put(environment.gistService + '/snippets/removeTags/' + id, removals);
  }

  constructor(private http:HttpClient) { }
}
