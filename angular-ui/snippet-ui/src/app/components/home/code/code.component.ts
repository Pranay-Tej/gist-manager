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

  openEditTagsModal() {

    let tags = this.snippet.tags;

    if (tags == null) {
      tags = [];
    }
    // console.log('tags: ' + tags);

    let input = {
      tags: tags
    }

    this.modalService.init(EditTagsComponentComponent, input);

  }

  modifyTags(final: string[]) {

    this.tagService.updateTagsOfSnippet(this.snippet.id, final).subscribe(
      (response) => {
        if (response == true) {
          this.snippet.tags = final;
        }
      }
    );

    // let initial = this.snippet.tags;
    // if (initial == null) {
    //   initial = [];
    // }
    // // console.log('modify: initial \n' + initial);
    // // console.log('modify: final \n' + final);

    // let additions = final.filter(
    //   x => { return !initial.includes(x) }
    // );

    // let removals = initial.filter(
    //   x => { return !final.includes(x) }
    // )
    // console.log('additions: ' + additions);
    // console.log('removals: ' + removals);
    // if (additions.length != 0 && additions != null) {
    //   this.tagService.addTagsToSnippet(this.snippet.id, additions).subscribe(
    //     response => {
    //       console.log(response);
    //     }
    //   );
    // }
    // if (removals.length != 0 && removals != null) {
    //   this.tagService.removeTagsFromSnipept(this.snippet.id, removals).subscribe(
    //     response => {
    //       console.log(response);
    //     }

    //   );
    // }

    // this.snippet.tags = final;

    // reset output subject
    let reset_output = {
      action: false
    }
    this.modalService.sendOutput(reset_output);

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
        // console.log(`Getting Snippet By Id: ${received_id}`);
        
        if (received_id == null || received_id == '') {
          return;
        }
        this.gistServiceService.getSnippetById(received_id).subscribe(
          (received_snippet: Snippet) => {
            this.snippet = received_snippet;
          }
        )

      }
    );

    this.modalService.output.subscribe(
      output => {
        if (output.action != true || output.function != 'edit-tags') {
          return;
        }
        this.modifyTags(output.final_tags);
      }
    );

  }

}
