import { Component, OnInit, ViewChild } from '@angular/core';
import { ModelWorker, TripModel } from '../shared/models/TripModel';
import { TripService } from '../shared/web-services/trip.service';
import { TripFormComponent } from '../shared/ui-components/trip-form/trip-form.component';
import { RefDataService } from '../shared/web-services/ref-data.service';

@Component({
  selector: 'app-trip-master-detail',
  templateUrl: './trip-master-detail.component.html',
  styleUrls: ['./trip-master-detail.component.css']
})

export class TripMasterDetailComponent implements OnInit {
    @ViewChild(TripFormComponent) private tripFormComponent: TripFormComponent;

    trip: ModelWorker<TripModel> = new ModelWorker();
    closeResult: string;

    constructor(private tripService: TripService,
                public refDataService: RefDataService, ) { }

    ngOnInit() {
      this.getTrips();
    }

    getTrips() {
      this.tripService.getAllTrips()
        .subscribe(trips => this.onGetTrips(trips));
    }

    onGetTrips(trips: TripModel[]) {
      this.trip.list = trips;
    }

    addTrip() {
      const model = this.newTrip();
      this.editTrip(model);
    }

    editTrip(model: TripModel) {
      if (this.tripFormComponent && this.tripFormComponent.isDitry()) {
        return;
      }
      // this.save(model);
      this.trip.model = model;
    }

    saveTrip(model: TripModel) {
      if (model.isNew) {
        this.tripService.addTrip(model)
          .subscribe(_ => {
            // model.transTypeDesc = findRef(this.refService.ref.transTypes, model.transTypeId).text;
            this.trip.list.unshift(model);
          });
      } else {
        this.tripService.saveTrip(model)
          .subscribe(_ => { });
      }
      this.trip.updateModel(model);
    }

    cancel(model: TripModel) {
      // this.trip.model = this.trip.model;
      // this.tripFormComponent.setModel(model);
      this.trip.model = null;

    }

    deleteTrip(model: TripModel) {
      if (!confirm('Are you sure you want to delete?')) {
        return;
      }

      this.tripService.deleteTrip(model)
        .subscribe(_ => { });
      this.trip.list.splice(this.trip.list.indexOf(model), 1);
      this.trip.model = null;
    }

    newTrip() {
      const model = new TripModel();
      return model;
    }
  }
