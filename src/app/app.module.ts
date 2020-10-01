import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TripEntryGridComponent } from './trip-client/trip-entry-grid/trip-entry-grid.component';
import { TripNavToFormComponent } from './trip-client/trip-nav-to-form/trip-nav-to-form.component';
import { TripModalComponent } from './trip-client/trip-modal/trip-modal.component';
import { TripMasterDetailComponent } from './trip-client/trip-master-detail/trip-master-detail.component';
import { TripClientComponent } from './trip-client/trip-client/trip-client.component';
import { TripClientModule } from './trip-client/trip-client.module';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
    faCoffee, faArrowLeft, faCalculator, faCocktail,
    faUserTimes, faSpinner, faSquare, faSave, faTrash, faTrashAlt,
    faCheck, faUndo, faUndoAlt, faTimes
} from '@fortawesome/free-solid-svg-icons';

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
        TripClientModule,
        FontAwesomeModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(library: FaIconLibrary) {
        // Add an icon to the library for convenient access in other components
        library.addIcons(faCoffee);
        library.addIcons(faCocktail);
        library.addIcons(faArrowLeft);
        library.addIcons(faCalculator);
        library.addIcons(faUserTimes);
        library.addIcons(faSpinner);
        library.addIcons(faSquare);
        library.addIcons(faSave);
        library.addIcons(faCheck);
        library.addIcons(faTrash);
        library.addIcons(faTrashAlt);
        library.addIcons(faUndo);
        library.addIcons(faUndoAlt);
        library.addIcons(faTimes);
    }
}
