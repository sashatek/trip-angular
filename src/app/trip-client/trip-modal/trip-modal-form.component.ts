import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter, NgbTypeaheadSelectItemEvent, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { TripModel } from '../shared/models/TripModel';
import { TripService } from '../shared/web-services/trip.service';
import { ArptLookupService } from '../shared/web-services/arpt-lookup.service';
import { RefDataService } from '../shared/web-services/ref-data.service';
import { ILookupItem } from '../shared/models/LooupItem';
import { TripFormComponent } from '../shared/ui-components/trip-form/trip-form.component';
import { NgbUTCStringAdapter, NgbDateFRParserFormatter } from '../shared/models/Utils';

@Component({
  selector: 'app-trip-modal-form',
  templateUrl: './trip-modal-form.component.html',
  styleUrls: ['./trip-modal-form.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {provide: NgbDateAdapter, useClass: NgbUTCStringAdapter},
    {provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter}
  ]
})
export class TripModalFormComponent implements OnInit {
  @ViewChild(TripFormComponent) private tripFormComponent: TripFormComponent;

  model: TripModel = null;
  searching = false;
  searchFailed = false;

  constructor(private tripService: TripService,
              private arptService: ArptLookupService,
              public refDataService: RefDataService,
              private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  saveTrip(model: TripModel) {
    this.activeModal.close(model);
  }

  saveClick() {
    this.tripFormComponent.saveTrip();
  }
  cancel() {
    this.activeModal.dismiss('Cancel');
  }

  isDirty() {
    return this.tripFormComponent?.tripForm.dirty;
  }
  isValid() {
    return this.tripFormComponent.tripForm.valid;
  }

  // Airport Lookup
  //
  arptSelect($event) {

  }

  lookupArpt = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.arptService.lookup(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )

    selectIata(event: NgbTypeaheadSelectItemEvent) {
      // this.modelChange.emit(event.item as ILookupItem);

    }

    formatter(result: ILookupItem): string {
      return result.text; // + " " + result.text2;
    }
    formatterr(result: ILookupItem): string {
      return result.text + ' ' + result.text2;
    }

    onTransTypeChange(event, model: TripModel) {
      model.transTypeDesc = event.target.options[event.target.options.selectedIndex].text;
    }
}
