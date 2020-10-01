import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { NgbDate, NgbDateAdapter, NgbDateParserFormatter, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { ModelWorker, TripModel } from '../shared/models/TripModel';
import { TripService } from '../shared/web-services/trip.service';
import { RefDataService } from '../shared/web-services/ref-data.service';
import { NgbUTCStringAdapter, NgbDateFRParserFormatter } from '../shared/models/Utils';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
import { ILookupItem } from '../shared/models/LooupItem';

@Component({
    selector: 'app-trip-entry-grid',
    templateUrl: './trip-entry-grid.component.html',
    styleUrls: ['./trip-entry-grid.component.css'],
    providers: [
      { provide: NgbDateAdapter, useClass: NgbUTCStringAdapter },
      { provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter }
  ]

  })
  export class TripEntryGridComponent implements OnInit {
      searching = false;
      searchFailed = false;

      trip: ModelWorker<TripModel> = new ModelWorker();
      tripForm: FormGroup = null;
      tripForms: FormArray;

      constructor(private tripService: TripService,
                  public refDataService: RefDataService,
                  private fb: FormBuilder) {
          this.tripForm = fb.group({
              tripForms: fb.array([])
          });
          // this.tripForms = <FormArray>this.tripFormGroup.controls['tripForms'];
          this.tripForms = this.tripForm.controls.tripForms as FormArray;
      }

      ngOnInit() {
          this.getTrips();
      }

      getTrips() {
          this.tripService.getAllTrips()
              .subscribe(trips => this.onGetTrips(trips));
      }
      private initForm() {
          for (const model of this.trip.list) {
              this.tripForms.push(this.initFormItem(model));
          }
      }

      private initFormItem(model: TripModel) {
        return this.fb.group({
            tripDate: [model.tripDate, Validators.required],
            airportInfo: [model.airportInfo, Validators.required],
            transTypeId: [model.transTypeId, Validators.required],
            groupName: [model.groupName, Validators.required],
            groupSize: [model.groupSize, Validators.required],
            active: [model.active]
});

      }

      onGetTrips(trips: TripModel[]) {
          this.trip.list = trips;
          this.initForm();
          this.addLine();
      }

      arptSelect(event: NgbTypeaheadSelectItemEvent) {
          // Place holder
      }

      // CRUD
      save(index: number, form: FormGroup) {
          const model = this.trip.model = this.trip.list[index];
          // const model: TripModel = { ...this.trip.model, ...form.value };
          model.tripDate = form.controls.tripDate.value;
          model.airportInfo = form.controls.airportInfo.value;
          model.transTypeId = form.controls.transTypeId.value;
          model.transTypeDesc = this.refDataService.getRefDataById(this.refDataService.refData.transTypes, model.transTypeId).text;
          model.groupName = form.controls.groupName.value;
          model.groupSize = form.controls.groupSize.value;
          model.active = form.controls.active.value;

          form.markAsPristine();
          form.markAsUntouched();
          if (model.isNew) {
              this.addLine();
              this.tripService.addTrip(model)
                  .subscribe(_ => { });
          } else {
              this.tripService.saveTrip(model)
                  .subscribe(_ => { });
          }
          // this.trip.updateModel(model);
      }

      cancel(index: number) {
          this.tripForms.controls[index] = this.initFormItem(this.trip.list[index]);
      }

      delete(index: number) {
          const model = this.trip.list[index];
          if (!confirm('Are you sure you want to delete?')) {
              return;
          }
          this.tripService.deleteTrip(model)
              .subscribe(_ => { });
          index = this.trip.list.indexOf(model);
          this.trip.list.splice(index, 1);
          this.tripForms.removeAt(index);
      }

      private addLine() {
          const model = new TripModel();
          this.trip.list.push(model);
          this.tripForms.push(this.initFormItem(model));
          return model;
      }

  }
