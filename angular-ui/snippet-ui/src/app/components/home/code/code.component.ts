import { Component, OnInit } from '@angular/core';
import { Snippet } from 'src/app/models/snippet';
import { CommunicationService } from 'src/services/communication.service';
import { GistServiceService } from 'src/services/gist-service.service';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit {

  snippet: Snippet;
  // code: string;
  code: string = "// Given an array of integers, return a new array such that each element at index i of the new array is the product of all the numbers in the original array except the one at i.\n//\n// For example, if our input was [1, 2, 3, 4, 5], the expected output would be [120, 60, 40, 30, 24]. If our input was [3, 2, 1], the expected output would be [2, 3, 6].\n//\n// Follow-up: what if you can't use division?\n\n#include<bits/stdc++.h>\nusing namespace std;\n\nvector<int> solve1(vector<int> a){\n    // Division is allowed\n    vector<int> ans(a.size());\n    int product=1;\n    for(int i=0;i<a.size();i++){\n        product *= a[i];\n    }\n    for(int i=0;i<ans.size();i++){\n        ans[i] = product/a[i];\n    }\n    return ans;\n}\n\nint main(){\n    freopen(\"ip.txt\",\"r\",stdin);\n    int t;\n    cin>>t;\n    cin.ignore();\n    while(t--){\n        string inp;\n        getline(cin,inp);\n        stringstream ss;\n        ss.str(inp);\n        int temp;\n        vector<int> a;\n        while(ss>>temp){\n            a.push_back(temp);\n        }\n        for(int i=0;i<a.size();i++){\n            cout<<a[i]<<\" \";\n        }\n        cout<<endl;\n        vector<int> ans1=solve1(a);\n        cout<<\"Division allowed: \";\n        for(int i=0;i<ans1.size();i++){\n            cout<<ans1[i]<<\" \";\n        }\n        cout<<endl;\n\n\n\n    }\n}\n";


constructor(private communicationService :CommunicationService, private gistServiceService: GistServiceService) { }

ngOnInit() {

  this.communicationService.gist_id.subscribe(
    (received_id: string) => {

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
