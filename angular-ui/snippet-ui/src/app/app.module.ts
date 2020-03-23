import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component'
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { CodeComponent } from './components/home/code/code.component';
import { SnippetsComponent } from './components/home/snippets/snippets.component';
import { TagsComponent } from './components/home/tags/tags.component';

import { HttpClientModule } from '@angular/common/http';
import { NewtagModalComponent } from './components/popup-modals/newtag-modal/newtag-modal.component';
import { EditTagsComponentComponent } from './components/home/code/edit-tags-modal/edit-tags-component/edit-tags-component.component';
import { InputModalComponent } from './components/popup-modals/input-modal/input-modal.component'

@NgModule({
   declarations: [
      AppComponent,
      UserComponent,
      NavBarComponent,
      HomeComponent,
      CodeComponent,
      SnippetsComponent,
      TagsComponent,
      NewtagModalComponent,
      EditTagsComponentComponent,
      InputModalComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule
   ],
   entryComponents:[
      NewtagModalComponent,
      EditTagsComponentComponent,
      InputModalComponent
    ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
