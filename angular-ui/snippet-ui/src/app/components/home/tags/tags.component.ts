import { Component, OnInit } from '@angular/core';
import { TagService } from 'src/app/services/tag.service';
import { Tag } from 'src/app/models/tag';
import { CommunicationService } from 'src/app/services/communication.service';
import { GistServiceService } from 'src/app/services/gist-service.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  tag_list: Tag[] = [];

  username: string = 'Pranay-Tej';

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
    }
  }

  newTag() {
    let name = prompt('Enter Tag Name:');
    if (name != null) {
      this.tagService.newTag(this.username, name).subscribe(
        (response) => {
          console.log(response);
        }
      );
      // this.getUserTags();
    } else {
      alert('Invalid tag name!');
    }
  }

  deleteTag(id:string){
    this.tagService.deleteTag(id).subscribe(
      (response) => {
        console.log(response);
      }
    );
    // this.getUserTags();
  }

  getAllSnippets() {
    this.communicationService.getAllSnippets();
  }

  getTagSnippets(id: string) {
    this.communicationService.passTagId(id);
  }

  constructor(private tagService: TagService, private communicationService: CommunicationService, private gistServiceService: GistServiceService) { }

  ngOnInit() {
    // this.getAllSnippets();
    this.getUserTags();
  }

}
