import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  id: string;

  idEmitter: EventEmitter<string> = new EventEmitter<string>();

  passId(id: string): void{
    this.id = id;
    this.idEmitter.emit(this.id);
  }

constructor() {}
  
}
