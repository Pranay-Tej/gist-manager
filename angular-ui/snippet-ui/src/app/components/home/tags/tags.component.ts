import { Component, OnInit, DoCheck, OnChanges, ChangeDetectorRef } from '@angular/core';
import { TagService } from 'src/app/services/tag.service';
import { Tag } from 'src/app/models/tag';
import { CommunicationService } from 'src/app/services/communication.service';
import { GistServiceService } from 'src/app/services/gist-service.service';
import { environment } from 'src/environments/environment';
import { ModalService } from 'src/app/services/modal.service';
import { NewtagModalComponent } from '../../popup-modals/newtag-modal/newtag-modal.component';
import { Subscription } from 'rxjs';
import { InputModalComponent } from '../../popup-modals/input-modal/input-modal.component';
import { UsernameService } from 'src/app/services/username.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  tag_list: Tag[] = [];

  username: string;

  getUsername() {
    this.username = this.usernameService.getUsername();
  }

  downloadAllSnippets() {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', environment.gistService + '/download/all/' + this.username);
    link.setAttribute('download', this.username + '.zip');
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  downloadTag(tag: Tag) {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', environment.gistService + '/download/tag/' + tag.id);
    link.setAttribute('download', tag.name + '.zip');
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  getUserTags() {
    // console.log('getting user tags')
    this.tagService.getUserTags(this.username).subscribe(
      (rec_tag_list) => {
        this.tag_list = rec_tag_list;
      }
    );
  }

  updateLibrary() {
    let refresh = confirm('Update Library from GitHub?');
    if (refresh) {
      this.gistServiceService.updateLibrary(this.username).subscribe(
        (response) => {
          console.log(response);
        }
      );
    }
  }

  openNewTagModal() {

    // let input ={
    //   message: 'Enter Tag Name: ',
    //   function: 'new-tag'
    // }

    // this.modalService.init(InputModalComponent, input);

    let new_tag = window.prompt('Enter New Tag name')
    if (new_tag != null && new_tag != '') {
      this.createNewTag(new_tag)
    }

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

  deleteTag(id: string, i: number) {
    let delete_tag = confirm('Delete Tag?');
    if (delete_tag) {
      this.tagService.deleteTag(id).subscribe(
        (response) => {
          if (response) {
            // let index = this.tag_list.findIndex(tag => tag.id == id);
            this.tag_list.splice(i, 1);

          }
          // console.log(response);
        }
      );
    }

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
    private modalService: ModalService,
    private usernameService: UsernameService
  ) { }

  private modalSubscription: Subscription;

  ngOnInit() {

    // this.getAllSnippets();

    this.getUsername();
    this.getUserTags();

    this.modalService.output.subscribe(
      output => {
        if (output.action != true || output.function != 'new-tag') {
          return;
        }
        this.createNewTag(output.data);
      }
    );

  }

}
