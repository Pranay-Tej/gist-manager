import { Component, OnInit, OnDestroy } from '@angular/core';
import { TagService } from 'src/app/services/tag.service';
import { ModalService } from 'src/app/services/modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-tags-component',
  templateUrl: './edit-tags-component.component.html',
  styleUrls: ['./edit-tags-component.component.css']
})
export class EditTagsComponentComponent implements OnInit, OnDestroy {
  
  username: string = 'Pranay-Tej';

  all_tag_list = [];
  tag_id_list = [];
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
      final_tags : final,
      action: true,
      function: 'edit-tags'
    }
    this.modalService.sendOutput(output);
    this.modalService.destroy();
  }
  
  getInput() {
    this.modalService.input.subscribe(
      input => {
        console.log(input);
        this.tag_id_list = input.tags;
        this.tag_id_set = new Set<string>(this.tag_id_list);
      }
    );
    // console.log(this.tag_id_list);
  }

  cancel(){
    let output = {
      // final_tags : this.tag_id_list,
      action: false
    }
    this.modalService.sendOutput(output);
    this.modalService.destroy();
  }

  constructor(
    private tagService:TagService,
    private modalService:ModalService
    ) { }

    private modalSubscription: Subscription;

  ngOnInit() {
    this.getInput();
    this.getUserTags();

    this.modalSubscription = this.modalService.cancelObservable.subscribe(
      () => {
        this.cancel();
      }
    );
  }

  ngOnDestroy(){
    this.modalSubscription.unsubscribe();
  }

}
