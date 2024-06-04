import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MgrComponentModule } from 'mgr-component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    MgrComponentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
