import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-newtag-modal',
  templateUrl: './newtag-modal.component.html',
  styleUrls: ['./newtag-modal.component.css']
})
export class NewtagModalComponent implements OnInit, OnDestroy {

  // input: any;

  // public getInput(){
  //   this.modalService.input.subscribe(
  //     input => {
  //       this.input = input;
  //     }
  //   )
  // }

  
  public addNewTag(name: string){
    if(name == null || name == ''){
      return;
    }
    let output = {
      name : name,
      action: true,
      function: 'new-tag'
    }
    this.modalService.sendOutput(output);
    this.modalService.destroy();
  }

  cancel(){
    let output = {
      action: false
    }
    this.modalService.sendOutput(output);
    this.modalService.destroy();
  }

  constructor(private modalService: ModalService) { }

  private modalSubscription: Subscription;

  ngOnInit() {

    this.modalSubscription = this.modalService.cancelObservable.subscribe(
      () => {
        this.cancel();
      }
    )
    // this.getInput();

  }

  ngOnDestroy(){
    this.modalSubscription.unsubscribe();
  }

}
