import { Component, OnInit } from '@angular/core';
import { TagService } from 'src/app/services/tag.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-edit-tags-component',
  templateUrl: './edit-tags-component.component.html',
  styleUrls: ['./edit-tags-component.component.css']
})
export class EditTagsComponentComponent implements OnInit {
  
  username: string = 'Pranay-Tej';

  all_tag_list;
  tag_id_set;

  // tags_set = new Set<string>(["one", "two", "three"]);

  getUserTags() {
    this.tagService.getUserTags(this.username).subscribe(
      (rec_tag_list) => {
        this.all_tag_list = rec_tag_list;
      }
    );
  }

  public updateSet(checkbox_event: any, tag_id: string) {
    if (checkbox_event.target.checked == true) {
      this.tag_id_set.add(tag_id);
    } else {
      this.tag_id_set.delete(tag_id);
    }

    // console.log(Array.from(this.tags_set.values()));
  }

  public contains(tag_id: string) {
    if (this.tag_id_set.has(tag_id)) {
      return true;
    }
    return false;
  }

  public final(){
    console.log('final..' + Array.from(this.tag_id_set.values()));
    let final = Array.from(this.tag_id_set.values());
    let output = {
      final_tags : final
    }
    this.modalService.sendOutput(output);
    this.modalService.destroy();
  }
  // public final() {
  //   // let additions = new Set(
  //   //   Array.from(this.tags_set_init.values()).filter(x => {
  //   //     !this.tags_set_init.has(x);
  //   //   })
  //   // );

  //   // let removals = new Set(
  //   //   Array.from(this.tags_set_init.values()).filter(x => {
  //   //     !this.tags_set.has(x);
  //   //   })
  //   // );

  //   let initial = Array.from(this.tags_set_init.values())
  //   let final = Array.from(this.tags_set.values());

  //   console.log(initial);
  //   console.log(final);

  //   let additions = final.filter(
  //     x => {!initial.includes(x) }
  //   );

  //   let removals = initial.filter(
  //     function(x:string){return final.includes(x) < 0 }
  //   )
  //   console.log(additions);
  //   console.log(removals);

  //   // console.log(Array.from(additions.values()));
  //   // console.log(Array.from(removals.values()));
  // }
  getInput() {
    this.modalService.input.subscribe(
      input => {
        this.tag_id_set = new Set<string>(input.tags);
      }
    )
  }

  constructor(
    private tagService:TagService,
    private modalService:ModalService
    ) { }

  ngOnInit() {
    this.getInput();
    this.getUserTags();
  }

}
