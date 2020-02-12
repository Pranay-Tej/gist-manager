import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private allSubject = new Subject<void>();
  all=this.allSubject.asObservable();

  getAllSnippets(){
    this.allSubject.next();
  }

  private tagSubject = new BehaviorSubject<string>('');
  tag_id = this.tagSubject.asObservable();

  passTagId(id:string){
    this.tagSubject.next(id);
  }

  private gistSubject = new BehaviorSubject<string>('');
  gist_id = this.gistSubject.asObservable();

  passId(id: string): void{
    this.gistSubject.next(id);
  }



constructor() {}
  
}
