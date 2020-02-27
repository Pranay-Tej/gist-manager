import { Component } from '@angular/core';
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'snippet-ui';

  public removeModal(mouse:any) {
    let modal_container = document.getElementById("modal-container");
    if(mouse.target == modal_container){
      this.modalService.destroy();
    }
  }
  constructor(private modalService:ModalService){

  }
}
