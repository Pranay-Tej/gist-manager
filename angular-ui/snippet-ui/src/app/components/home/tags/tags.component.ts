import { Component, OnInit } from '@angular/core';
import { TagService } from 'src/app/services/tag.service';
import { Tag } from 'src/app/models/tag';
import { CommunicationService } from 'src/app/services/communication.service';
import { GistServiceService } from 'src/app/services/gist-service.service';
import { environment } from 'src/environments/environment';
import { ModalService } from 'src/app/services/modal.service';
import { NewtagModalComponent } from '../../popup-modals/newtag-modal/newtag-modal.component';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  tag_list: Tag[] = [];

  username: string = 'Pranay-Tej';

  downloadAllSnippets() {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', environment.gistService + '/download/all/' + this.username);
    link.setAttribute('download', this.username + '.zip');
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  getUserTags() {
    this.tagService.getUserTags(this.username).subscribe(
      (rec_tag_list) => {
        this.tag_list = rec_tag_list;
      }
    );
  }

  refreshLibrary() {
    let refresh = confirm('Refresh Library?');
    if (refresh) {
      this.gistServiceService.refreshLibrary(this.username).subscribe(
        (response) => {
          console.log(response);
        }
      );
      this.ngOnInit();  //refresh entire app
    }
  }

  newTag() {

    let name: string;
    // let input = {
    //   name:"abc"
    // }
    // this.modalService.init(NewtagModalComponent, inputs, {});
    this.modalService.init(NewtagModalComponent);
    this.modalService.output.subscribe(
      output => {
        name = output.name;
        if(name == null){
          return;
        }
        console.log('creating.....' + name)
        this.tagService.newTag(this.username, name).subscribe(
          (response) => {
            console.log(response);
          }
        );
      }
    );
    this.getUserTags();
    // let name = prompt('Enter Tag Name:');
    // if (name != null) {
    //   this.tagService.newTag(this.username, name).subscribe(
    //     (response) => {
    //       console.log(response);
    //     }
    //   );
    //   // this.getUserTags();
    // } else {
    //   alert('Invalid tag name!');
    // }
  }

  deleteTag(id: string) {
    this.tagService.deleteTag(id).subscribe(
      (response) => {
        console.log(response);
      }
    );
    this.ngOnInit();
    // this.getUserTags();
  }

  getAllSnippets() {
    this.communicationService.getAllSnippets();
  }

  getTagSnippets(id: string) {
    this.communicationService.passTagId(id);
  }

  constructor(
    private tagService: TagService,
    private communicationService: CommunicationService,
    private gistServiceService: GistServiceService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    // this.getAllSnippets();
    this.tagService.refreshNeeded$.subscribe(
      () => {
        this.getUserTags();
      }
    )
    this.getUserTags();
  }

}
