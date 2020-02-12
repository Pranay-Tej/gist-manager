import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Tag } from '../models/tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  deleteTag(id: string) {
    return this.http.delete(environment.gistService + '/tags/' + id, {responseType: 'text'});
  }

  getUserTags(username:string): Observable<Tag[]>{
    return this.http.get<Tag[]>(environment.gistService + '/tags/' + username);
  }

  newTag(username:string, name:string): Observable<string>{
    return this.http.post<string>(environment.gistService + '/tags/' + username + '/' + name, {responseType: 'text'});
  }
  
  constructor(private http:HttpClient) { }
}
