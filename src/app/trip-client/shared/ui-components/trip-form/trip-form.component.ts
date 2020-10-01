import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ILookupItem } from '../../models/LooupItem';
import { TripModel } from '../../models/TripModel';
import { NgbDateFRParserFormatter, NgbUTCStringAdapter } from '../../models/Utils';
import { ArptLookupService } from '../../web-services/arpt-lookup.service';
import { RefDataService } from '../../web-services/ref-data.service';
import { TripService } from '../../web-services/trip.service';

@Component({
    selector: 'app-trip-form',
    templateUrl: './trip-form.component.html',
    styleUrls: ['./trip-form.component.css'],
    providers: [
      { provide: NgbDateAdapter, useClass: NgbUTCStringAdapter },
      { provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter }
    ]
  })

  export class TripFormComponent implements OnInit {
    get model() {return this._model; }
    @Input() set model(value: TripModel) {
      this._model = value;
      if (value !== null) {
        this.initForm(this.model);
      }
    }

    @Input() enableDelete = false;
    @Input() showButtons = true;
    // tslint:disable-next-line: no-output-on-prefix
    @Output() save = new EventEmitter<TripModel>();
    @Output() cancel = new EventEmitter<TripModel>();
    @Output() delete = new EventEmitter<TripModel>();

    private _model: TripModel = new TripModel();

    arpt: ILookupItem = null;

    searching = false;
    searchFailed = false;
    tripForm: FormGroup = null;

    constructor(private tripService: TripService,
                private arptService: ArptLookupService,
                public refDataService: RefDataService,
                private fb: FormBuilder) {
      this.initForm(this.model);
    }

    ngOnInit() {
      const a = this.enableDelete;
    }

    // ngOnChanges(changes: SimpleChanges): void {
    //   if(changes['model']) {
    //     this.initForm(this.model);
    //   }
    // }
    setModel(model: TripModel) {
      this.model = model;
      this.initForm(this.model);
      // this.tripForm.reset(model);
    }
    private initForm(model: TripModel) {
      this.tripForm = this.fb.group({
              tripDate: [model.tripDate, Validators.required],
              airportInfo: [model.airportInfo, Validators.required],
              transTypeId: [model.transTypeId, Validators.required],
              groupName: [model.groupName, Validators.required],
              groupSize: [model.groupSize, Validators.required],
              active: [model.active],
              note: [model.note]

      });
    }

    get f() { return this.tripForm.controls; }

    saveTrip() {
      // this.model = {...this.model, ...this.tripForm.value};
      this.updateModel(this.model, this.tripForm);
      this.initForm(this.model);

      // model.airportInfo = {...this.tripForm.value.airportInfo};
      this.save.emit(this.model);
      // this.tripForm.reset(this.model); TODO: check whether reset is needed
      // Object.keys(this.tripForm.controls).forEach(control => {
      //   this.tripForm.controls[control].markAsPristine();
      // });
    }

    updateModel(model: TripModel, form: FormGroup) {
          model.tripDate = form.controls.tripDate.value;
          model.airportInfo = form.controls.airportInfo.value;
          model.transTypeId = form.controls.transTypeId.value;
          model.transTypeDesc = this.refDataService.getRefDataById(this.refDataService.refData.transTypes, model.transTypeId).text;
          model.groupName = form.controls.groupName.value;
          model.groupSize = form.controls.groupSize.value;
          model.active = form.controls.active.value;
          model.note = form.controls.note.value;

    }

    isDitry() {
      return this.tripForm.dirty;
    }
    isValid() {
      return this.tripForm.valid;
    }
    cancelTrip() {
      this.cancel.emit(this.model);
      this.initForm(this.model);
    }

    deleteTrip() {
      this.delete.emit(this.model);
    }

    arptSelect(item: ILookupItem) {
      this.arpt = item;
    }

    onTransTypeChange(event, model: TripModel) {
      model.transTypeDesc = event.target.options[event.target.options.selectedIndex].text;
    }
  }
