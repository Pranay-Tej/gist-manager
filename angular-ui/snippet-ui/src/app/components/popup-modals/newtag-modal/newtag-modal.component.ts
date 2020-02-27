import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-newtag-modal',
  templateUrl: './newtag-modal.component.html',
  styleUrls: ['./newtag-modal.component.css']
})
export class NewtagModalComponent implements OnInit {

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
      name : name
    }
    this.modalService.sendOutput(output);
    this.modalService.destroy();
  }

  constructor(private modalService: ModalService) { }

  ngOnInit() {

    // this.getInput();

  }

}
