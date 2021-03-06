import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { TripClientComponent } from './trip-client/trip-client.component';
import { TripEntryGridComponent } from './trip-entry-grid/trip-entry-grid.component';
import { ArptLookupComponent } from './shared/ui-comtrols/arpt-lookup/arpt-lookup.component';
import { TripNavToFormComponent } from './trip-nav-to-form/trip-nav-to-form.component';
import { TripModalComponent } from './trip-modal/trip-modal.component';
import { TripMasterDetailComponent } from './trip-master-detail/trip-master-detail.component';
import { Globals } from './shared/Globals';
import { TripFormComponent } from './shared/ui-components/trip-form/trip-form.component';
import { TripModalFormComponent } from './trip-modal/trip-modal-form.component';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
    faCoffee, faArrowLeft, faCalculator, faCocktail,
    faUserTimes, faSpinner, faSquare, faSave, faTrash, faTrashAlt,
    faCheck, faUndo, faUndoAlt, faTimes
} from '@fortawesome/free-solid-svg-icons';


@NgModule({
  declarations: [
   TripClientComponent,
    TripEntryGridComponent,
    ArptLookupComponent,
    TripClientComponent,
    TripEntryGridComponent,
    TripNavToFormComponent,
    TripModalComponent,
    TripMasterDetailComponent,
    TripFormComponent,
    TripModalFormComponent,
    TripNavToFormComponent
 ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FontAwesomeModule
 ],
 exports: [
    TripClientComponent
  ],
  providers: [Globals],
  entryComponents: [TripModalFormComponent]

})
export class TripClientModule {
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
