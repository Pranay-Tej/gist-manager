import { Injectable } from '@angular/core';
import { DomService } from './dom.service';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modalElementId = 'modal';
  private modalContainerElementId = 'modal-container';

  private inputSubject = new BehaviorSubject<any>('');
  input = this.inputSubject.asObservable();

  sendInput(input: any) {
    // if (input == null) {
    //   return;
    // }
    this.inputSubject.next(input);
    // this.inputSubject.complete();
    console.log('sending input:')
    console.log(input);
  }

  private outputSubject = new Subject<any>();
  output = this.outputSubject.asObservable();
  
  // output:any;
 

  // getOutput(){
  //   const outputObservable = new Observable(
  //     observer => {
  //       observer.next(this.output);
  //     }
  //   );

  //   return outputObservable;
  // }

  sendOutput(output: any) {

    // this.output = output;

    // if (output == null) {
    //   return;
    // }
    this.outputSubject.next(output);
    // this.outputSubject.
    // https://medium.com/@luukgruijs/understanding-creating-and-subscribing-to-observables-in-angular-426dbf0b04a3
    // to stop data flow and prevent multiple calls
    // this.outputSubject.complete();
    console.log('sending output: ' + output);
    console.log(output);

  }

  init(component: any, input?: any) {
    this.domService.appendComponentTo(this.modalElementId, component);
    this.sendInput(input);
    document.getElementById(this.modalElementId).className = 'show';
    document.getElementById(this.modalContainerElementId).className = 'flex';

  }

  // init(component: any, inputs: object, outputs: object) {
  //   let componentConfig = {
  //     inputs: inputs,
  //     outputs: outputs
  //   }
  //   this.domService.appendComponentTo(this.modalElementId, component, componentConfig);
  //   document.getElementById(this.modalElementId).className = 'show';
  //   document.getElementById(this.modalContainerElementId).className = 'flex';

  // }

  destroy() {
    this.domService.removeComponent();
    document.getElementById(this.modalElementId).className = 'hidden';
    document.getElementById(this.modalContainerElementId).className = 'hidden';

  }

  constructor(private domService: DomService) { }

}
