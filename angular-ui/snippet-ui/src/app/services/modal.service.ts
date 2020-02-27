import { Injectable } from '@angular/core';
import { DomService } from './dom.service';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modalElementId = 'modal';
  private modalContainerElementId = 'modal-container';

  private inputSubject = new BehaviorSubject<any>('');
  input = this.inputSubject.asObservable();

  sendInput(input: any) {
    if (input == null) {
      return
    }
    this.inputSubject.next(input);
    console.log('sending input' + input)
  }

  private outputSubject = new BehaviorSubject<any>('');
  output = this.outputSubject.asObservable();

  sendOutput(output: any) {
    if (output == null) {
      return
    }
    this.outputSubject.next(output);
    console.log('sending output' + output.name)
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
