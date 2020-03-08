import { Component, OnInit, DoCheck, OnChanges, ChangeDetectorRef } from '@angular/core';
import { TagService } from 'src/app/services/tag.service';
import { Tag } from 'src/app/models/tag';
import { CommunicationService } from 'src/app/services/communication.service';
import { GistServiceService } from 'src/app/services/gist-service.service';
import { environment } from 'src/environments/environment';
import { ModalService } from 'src/app/services/modal.service';
import { NewtagModalComponent } from '../../popup-modals/newtag-modal/newtag-modal.component';
import { Subscription } from 'rxjs';

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
    console.log('getting user tags')
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
    }
  }

  openNewTagModal() {
    this.modalService.init(NewtagModalComponent);
  }

  createNewTag(name: string) {
    console.log('creating tag...')
    console.log(name)
    this.tagService.newTag(this.username, name).subscribe(
      (new_tag) => {
        if (new_tag != null) {
          this.tag_list.push(new_tag);
        }
      }
    );

    let reset_output = {
      action: false
    }

    // let new_tag = {
    //   id: '12345',
    //   name: name,
    //   username: this.username
    // }

    // this.tag_list.push(new_tag)

    this.modalService.sendOutput(reset_output);
  }

  deleteTag(id: string) {

    this.tagService.deleteTag(id).subscribe(
      (response) => {
        if (response == true) {
          let index = this.tag_list.findIndex(tag => tag.id == id);
          this.tag_list.splice(index, 1);

        }
        // console.log(response);
      }
    );

    // let index = this.tag_list.findIndex(tag => tag.id == id);
    // this.tag_list.splice(index, 1);

  }

  getAllSnippets() {
    this.communicationService.getAllSnippets();
  }

  getTagSnippets(id: string) {
    this.communicationService.passTagId(id);
  }

  trackTag(index, tag) {
    if (tag != null) {
      return tag.id;
    }
    return null;
  }

  constructor(
    private tagService: TagService,
    private communicationService: CommunicationService,
    private gistServiceService: GistServiceService,
    private modalService: ModalService
  ) { }

  private modalSubscription: Subscription;

  ngOnInit() {

    // this.getAllSnippets();

    this.getUserTags();

    this.modalService.output.subscribe(
      output => {
        if (output.action != true || output.function != 'new-tag') {
          return;
        }
        this.createNewTag(output.name);
      }
    );

  }

}
