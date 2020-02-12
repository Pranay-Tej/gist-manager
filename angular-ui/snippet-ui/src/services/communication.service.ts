import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private gistSubject = new BehaviorSubject<string>('');
  gist_id = this.gistSubject.asObservable();

  passId(id: string): void{
    this.gistSubject.next(id);
  }


constructor() {}
  
}
