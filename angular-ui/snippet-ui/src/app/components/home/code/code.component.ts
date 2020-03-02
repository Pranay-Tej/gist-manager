import { Component, OnInit, Output } from '@angular/core';
import { Snippet } from 'src/app/models/snippet';
import { CommunicationService } from 'src/app/services/communication.service';
import { GistServiceService } from 'src/app/services/gist-service.service';

import { environment } from 'src/environments/environment';
import { EditTagsComponentComponent } from './edit-tags-modal/edit-tags-component/edit-tags-component.component';
import { ModalService } from 'src/app/services/modal.service';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit {

  snippet: Snippet;
  // code: string;
  code: string = "// Given an array of integers, return a new array such that each element at index i of the new array is the product of all the numbers in the original array except the one at i.\n//\n// For example, if our input was [1, 2, 3, 4, 5], the expected output would be [120, 60, 40, 30, 24]. If our input was [3, 2, 1], the expected output would be [2, 3, 6].\n//\n// Follow-up: what if you can't use division?\n\n#include<bits/stdc++.h>\nusing namespace std;\n\nvector<int> solve1(vector<int> a){\n    // Division is allowed\n    vector<int> ans(a.size());\n    int product=1;\n    for(int i=0;i<a.size();i++){\n        product *= a[i];\n    }\n    for(int i=0;i<ans.size();i++){\n        ans[i] = product/a[i];\n    }\n    return ans;\n}\n\nint main(){\n    freopen(\"ip.txt\",\"r\",stdin);\n    int t;\n    cin>>t;\n    cin.ignore();\n    while(t--){\n        string inp;\n        getline(cin,inp);\n        stringstream ss;\n        ss.str(inp);\n        int temp;\n        vector<int> a;\n        while(ss>>temp){\n            a.push_back(temp);\n        }\n        for(int i=0;i<a.size();i++){\n            cout<<a[i]<<\" \";\n        }\n        cout<<endl;\n        vector<int> ans1=solve1(a);\n        cout<<\"Division allowed: \";\n        for(int i=0;i<ans1.size();i++){\n            cout<<ans1[i]<<\" \";\n        }\n        cout<<endl;\n\n\n\n    }\n}\n";

  editTags(id: string, tags: string[]) {

    if (tags == null) {
      tags = [];
    }
    console.log('tags: ' + tags);

    let final;
    let input = {
      tags: tags
    }
    this.modalService.init(EditTagsComponentComponent, input);

    // const ouputObservable = this.modalService.getOutput();
    // ouputObservable.subscribe(
    //   (output:any) => {
    //         // let EMPTY: Object = new Object();
    //         final = output.final_tags;
    //         if(final == null){
    //           return;
    //         }
    //         this.modifyTags(tags, final);
    //       }
    // );

    this.modalService.output.subscribe(
      output => {
        // let EMPTY: Object = new Object();
        final = output.final_tags;
        if (output.action == false) {
          return;
        }
        this.modifyTags(tags, final);
      }
    );
    // this.modalService.output.
    // this.modalService.output.
    // this.modalService.sendOutput(null);
    this.communicationService.passId(this.snippet.id);
  }

  modifyTags(initial: string[], final: string[]) {
    // let initial = Array.from(tag_set_init.values())
    // let final = Array.from(tag_set_final.values());


    console.log('modify: initial \n' + initial);
    console.log('modify: final \n' + final);

    let additions = final.filter(
      x => { return !initial.includes(x) }
    );

    let removals = initial.filter(
      x => { return !final.includes(x) }
    )
    console.log('additions: ' + additions);
    console.log('removals: ' + removals);
    if (additions.length != 0 && additions != null) {
      this.tagService.addTagsToSnippet(this.snippet.id, additions).subscribe(
        response => {
          console.log(response);
        }
      );
    }
    if (removals.length != 0 && removals != null) {
      this.tagService.removeTagsFromSnipept(this.snippet.id, removals).subscribe(
        response => {
          console.log(response);
        }

      );
      // reset output subject
      let reset = {
        action: false
      }
      this.modalService.sendOutput(reset);
    }
  }


  downloadGist(id: string) {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', environment.gistService + '/download/' + this.snippet.id);
    link.setAttribute('download', this.snippet.filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  constructor(
    private communicationService: CommunicationService,
    private gistServiceService: GistServiceService,
    private modalService: ModalService,
    private tagService: TagService
  ) { }

  ngOnInit() {

    this.communicationService.gist_id.subscribe(
      (received_id: string) => {
        if (received_id == null || received_id == '') {
          return;
        }
        this.gistServiceService.getSnippetById(received_id).subscribe(
          (received_snippet: Snippet) => {
            this.snippet = received_snippet;
            // console.log(this.snippet.code);
          }
        )

      }
    )
  }

}
