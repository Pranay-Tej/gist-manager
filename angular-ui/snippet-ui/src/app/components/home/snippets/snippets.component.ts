import { Component, OnInit } from '@angular/core';
import { Snippet } from 'src/app/models/snippet';
import { GistServiceService } from 'src/app/services/gist-service.service';
import { CommunicationService } from 'src/app/services/communication.service';
import { UsernameService } from 'src/app/services/username.service';

@Component({
  selector: 'app-snippets',
  templateUrl: './snippets.component.html',
  styleUrls: ['./snippets.component.css']
})
export class SnippetsComponent implements OnInit {

  snippet_list: Snippet[] = [];
  username: string;

  getUsername(){
    this.username = this.usernameService.getUsername();
  }

  getAllSnippets() {
    this.gistService.getAllSnippets(this.username).subscribe(
      (received_snippet_list: Snippet[]) => {
        this.snippet_list = received_snippet_list;
      });
  }

  sendDefault() {
    console.log(this.snippet_list);
    this.communicationService.passId(this.snippet_list[0].id);
  }

  passId(id: string) {
    this.communicationService.passId(id);
  }

  loadTagSnippets(){
    this.communicationService.tag_id.subscribe(
      (rec_tag_id) => {
        if(rec_tag_id == null || rec_tag_id == ''){
          this.getAllSnippets();
        }else{
          this.gistService.getTagSnippets(rec_tag_id).subscribe(
            (rec_snippet_list) => {
              this.snippet_list = rec_snippet_list;
            }
          );
        }
      }
    );
  }

  trackSnippet(index, snippet){
    if(snippet != null){
      return snippet.id;
    }
    return null;
  }


  constructor(private gistService: GistServiceService,
    private communicationService: CommunicationService,
    private usernameService:UsernameService) { }

  ngOnInit() {
    this.getUsername();
    // this.getAllSnippets();
    this.loadTagSnippets();
    this.communicationService.all.subscribe(
      () => {
        this.getAllSnippets();
      }
    )
    // this.passId(this.snippet_list[0].id);
    // console.log(this.snippet_list);
    // this.sendDefault();
  }

}
