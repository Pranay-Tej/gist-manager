import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-input-modal',
  templateUrl: './input-modal.component.html',
  styleUrls: ['./input-modal.component.css']
})
export class InputModalComponent implements OnInit, OnDestroy {


  message: string;
  function: string;

  getInput(){
    this.modalService.input.subscribe(
      input => {
        this.message = input.message;
        this.function = input.function;
      }
    )
  }

  public sendUserInput(input: any){
    if(input == '' || input == null){
      return;
    }

    let output = {
      data: input,
      action: true,
      function: this.function
    }

    this.modalService.sendOutput(output);
    this.modalService.destroy();
  }


  cancel() {
    let output = {
      action: false
    }
    this.modalService.sendOutput(output);
    this.modalService.destroy();
  }

  private modalSubscription: Subscription;

  constructor(private modalService: ModalService) { }

  ngOnInit() {

    this.getInput();

    this.modalSubscription = this.modalService.cancelObservable.subscribe(
      () => {
        this.cancel();
      }
    );

    document.getElementById("userInput").focus();

  }

  ngOnDestroy(){
    this.modalSubscription.unsubscribe();
  }
 
}
