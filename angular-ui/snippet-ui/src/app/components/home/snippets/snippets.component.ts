import { Component, OnInit } from '@angular/core';
import { Snippet } from 'src/app/models/snippet';
import { GistServiceService } from 'src/services/gist-service.service';
import { CommunicationService } from 'src/services/communication.service';

@Component({
  selector: 'app-snippets',
  templateUrl: './snippets.component.html',
  styleUrls: ['./snippets.component.css']
})
export class SnippetsComponent implements OnInit {

  snippet_list: Snippet[] = [];
  username: string;

  getAllSnippets() {
    this.username = 'Pranay-Tej';
    this.gistService.getAllSnippets(this.username).subscribe(
      (received_snippet_list: Snippet[]) => {
        this.snippet_list = received_snippet_list;
      });
  }

  sendDefault() {
    console.log(this.snippet_list);
    this.communicationService.passId(this.snippet_list[0].id);
  }

  passTicketId(id: string) {
    this.communicationService.passId(id);
  }

  constructor(private gistService: GistServiceService, private communicationService: CommunicationService) { }

  ngOnInit() {
    this.getAllSnippets();
    // this.passTicketId(this.snippet_list[0].id);
    // console.log(this.snippet_list);
    // this.sendDefault();
  }

}
