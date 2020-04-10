import { Component, OnInit, ViewChild } from '@angular/core';
import { TripFormComponent } from '../shared/ui-components/trip-form/trip-form.component';
import { TripModel, ModelWorker } from '../shared/models/TripModel';
import { TripService } from '../shared/web-services/trip.service';
import { ArptLookupService } from '../shared/web-services/arpt-lookup.service';
import { RefDataService } from '../shared/web-services/ref-data.service';

@Component({
  selector: 'app-trip-nav-to-form',
  templateUrl: './trip-nav-to-form.component.html',
  styleUrls: ['./trip-nav-to-form.component.css']
})
export class TripNavToFormComponent implements OnInit {
    @ViewChild(TripFormComponent) private tripFormComponent: TripFormComponent;

    trip: ModelWorker<TripModel> = new ModelWorker();
    closeResult: string;
    showForm = false;

    constructor(private tripService: TripService,
                private arptService: ArptLookupService,
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
      this.showForm = true;
    }

    editTrip(model: TripModel) {
      // this.save(model);
      this.trip.model = model;
      this.showForm = true;
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

      this.showForm = false;
      this.trip.updateModel(model);
    }

    cancel(model: TripModel) {
      this.showForm = false;

    }

    deleteTrip(model: TripModel) {
      if (!confirm('Are you sure you want to delete?')) {
        return;
      }

      this.tripService.deleteTrip(model)
        .subscribe(_ => { });
      this.trip.list.splice(this.trip.list.indexOf(model), 1);
      this.trip.model = null;
      this.showForm = false;

    }

    newTrip() {
      const model = new TripModel();
      return model;
    }

}
