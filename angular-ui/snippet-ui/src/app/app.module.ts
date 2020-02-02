import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { CodeComponent } from './components/home/code/code.component';
import { SnippetsComponent } from './components/home/snippets/snippets.component';
import { TagsComponent } from './components/home/tags/tags.component';

@NgModule({
   declarations: [
      AppComponent,
      NavBarComponent,
      HomeComponent,
      CodeComponent,
      SnippetsComponent,
      TagsComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
