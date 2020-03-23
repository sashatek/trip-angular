import { Component, OnInit, Input } from '@angular/core';
import { ModelWorker, TripModel } from '../shared/models/TripModel';
import { TripService } from '../shared/web-services/trip.service';
import { ArptLookupService } from '../shared/web-services/arpt-lookup.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RefDataService } from '../shared/web-services/ref-data.service';
import { TripModalFormComponent } from './trip-modal-form.component';

@Component({
  selector: 'app-trip-modal',
  templateUrl: './trip-modal.component.html',
  styleUrls: ['./trip-modal.component.css']
})
export class TripModalComponent implements OnInit {

    trip: ModelWorker<TripModel> = new ModelWorker();

    closeResult: string;

    constructor(private tripService: TripService,
                private arptService: ArptLookupService,
                public refDataService: RefDataService,
                private modalService: NgbModal) { }
    @Input() model: TripModel;

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
      let model = this.newTrip();
      this.edit(model);
  }

    edit(model: TripModel) {
      this.trip.model = model;
      const modalRef = this.modalService.open(TripModalFormComponent);
      modalRef.componentInstance.model = model;
      modalRef.result.then((result) => {
        this.save(result);
      }, (reason) => {
        // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }

    // CRUD
    private save(model: TripModel) {
      if (model.isNew) {
        this.tripService.addTrip(model)
          .subscribe(_ => {
            // model.transTypeDesc = findRef(this.Data.ref.transTypes, model.transTypeId).text;
            this.trip.list.unshift(model);
           });
      } else {
        this.tripService.saveTrip(model)
          .subscribe(_ => { });
      }
      this.trip.updateModel(model);
    }

    delete(model: TripModel) {
      if (!confirm('Are you sure you want to delete?')) {
        return;
      }

      this.tripService.deleteTrip(model)
        .subscribe(_ => { });
      this.trip.list.splice(this.trip.list.indexOf(model), 1);
    }

    newTrip() {
      let model = new TripModel();
      TripModel.onGet(model);
      return model;
  }

    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return `with: ${reason}`;
      }
    }

}
