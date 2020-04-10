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
      this.initForm();
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
    this.initForm();
  }

  ngOnInit() {
    const a = this.enableDelete;
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if(changes['model']) {
  //     this.initForm();
  //   }
  // }
  setModel(model: TripModel) {
    this.model = model;
    this.initForm();
    // this.tripForm.reset(model);
  }
  private initForm() {
    this.tripForm = this.fb.group({
      tripDate: [this.model.tripDate, Validators.required],
      airportInfo: [this.model.airportInfo, Validators.required],
      transTypeId: [this.model.transTypeId, Validators.required],
      groupName: [this.model.groupName, Validators.required],
      groupSize: [this.model.groupSize, Validators.required]
    });
  }

  saveTrip() {
    const a = this.tripForm.value;
    this.model = {...this.model, ...this.tripForm.value};
    this.model.airportInfo = {...this.tripForm.value.airportInfo};
    this.save.emit(this.model);
    // this.tripForm.reset(this.model); TODO: chrck whether reset id nrrded
    // Object.keys(this.tripForm.controls).forEach(control => {
    //   this.tripForm.controls[control].markAsPristine();
    // });
  }

  updateModel() {
      const data = this.tripForm.value as TripModel;
      this.model.tripDate = data.tripDate;
      this.model.airportInfo = data.airportInfo;
      this.model.transTypeId = data.transTypeId;
      this.model.groupName = data.groupName;
      this.model.groupSize = data.groupSize;
  }
  isDitry() {
    return this.tripForm.dirty;
  }
  isValid() {
    return this.tripForm.valid;
  }
  cancelTrip() {
    this.cancel.emit(this.model);
    this.initForm();
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
