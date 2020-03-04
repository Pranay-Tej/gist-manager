import { Component } from '@angular/core';
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'snippet-ui';

  public cancel(mouse:any) {
    let modal_container = document.getElementById("modal-container");
    if(mouse.target == modal_container){
      this.modalService.cancel();
    }
  }
  constructor(private modalService:ModalService){

  }
}
