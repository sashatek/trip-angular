import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TripEntryGridComponent } from './trip-client/trip-entry-grid/trip-entry-grid.component';
import { TripNavToFormComponent } from './trip-client/trip-nav-to-form/trip-nav-to-form.component';
import { TripModalComponent } from './trip-client/trip-modal/trip-modal.component';
import { TripMasterDetailComponent } from './trip-client/trip-master-detail/trip-master-detail.component';
import { TripClientComponent } from './trip-client/trip-client/trip-client.component';
import { TripClientModule } from './trip-client/trip-client.module';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    TripClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
