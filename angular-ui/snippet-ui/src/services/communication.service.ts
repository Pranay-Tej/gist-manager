import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  // idEmitter: EventEmitter<string> = new EventEmitter<string>();

  private messageSource = new BehaviorSubject('');
  gist_id = this.messageSource.asObservable();

  passId(id: string): void{
    this.messageSource.next(id);
    // this.idEmitter.emit(this.id);

  }

constructor() {}
  
}
