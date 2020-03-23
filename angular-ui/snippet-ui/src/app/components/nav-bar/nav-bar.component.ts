import { Component, OnInit } from '@angular/core';
import { UsernameService } from 'src/app/services/username.service'
import { ModalService } from 'src/app/services/modal.service';
import { InputModalComponent } from '../popup-modals/input-modal/input-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  // changeUsername(){
  //   this.router.navigateByUrl('/user')
  // }

  // openUsernameModal() {
  //   let input = {
  //     message: 'Enter GitHub username: ',
  //     function: 'username'
  //   }
  //   this.modalService.init(InputModalComponent, input)
  // }

  // setUsername(username: string) {
  //   this.usernameService.setUsername(username);
  //   let reset_output = {
  //     action: false
  //   }
  //   this.modalService.sendOutput(reset_output);
  // }

  constructor(
    // private modalService: ModalService,
    // private usernameService: UsernameService,
    // private router: Router
  ) { }

  ngOnInit() {

  //   this.modalService.output.subscribe(
  //     output => {
  //       if (output.action != true || output.function != 'username') {
  //         return;
  //       }
  //       this.setUsername(output.data);
  //     }
  //   )
  }

}
