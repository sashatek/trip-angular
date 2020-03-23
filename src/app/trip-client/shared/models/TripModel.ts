import { ILookupItem } from './LooupItem';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

export class TripModel {

    constructor() {
        this.tripId = 0;
        this.groupName = null;
        this.airportId = -1;
        this.transTypeId = null;
        this.tripDate = null;
        this.groupSize = 0;
        this.isActive = true;
        this.note = null;

        this.isNew = true;
    }
    static ref: any;
    tripId: number;
    groupName: string;
    airportId: number;
    airport: ILookupItem;
    transTypeId: number;
    transTypeDesc: string;
    tripDate: string;
    tripDate_: NgbDate;
    groupSize: number;
    isActive = true;
    note: string | null;

    isNew: boolean;
    form: any;

    static onGetAll(models: TripModel[]) {
        for (let model of models) {
            TripModel.onGet(model);
        }
     }

    static onGet(model: TripModel) {
        // model.tripDate_ = CrudUtils.isoToLocalDate(model.tripDate);
        // model.transTypeId_ = CrudUtils.getLookupItem(CrudUtils.ref.transTypes, model.transTypeId);
    }

    static onSaveAll(models: TripModel[]) {
        for (let model of models) {
            TripModel.onSave(model);
        }
    }

    static onSave(model: TripModel) {
        // Add PK from a parent if master-detai;
        //
        // model.tripDate = CrudUtils.setDateIso(model.tripDate_);
        // model.transTypeId_ = CrudUtils.getLookupItem(CrudUtils.ref.transTypes, model.transTypeId);
    }
}

export class ModelWorker<T> {
    model: T;
    modelCopy: T;
    list: T[];

    constructor() {
        this.model = null;
        this.modelCopy = null;
        this.list = [];
    }

    updateModel(model: T) {
        if (!this.model) {
            return;
        }
        const i = this.list.indexOf(this.model);
        if (i >= 0) {
            this.list[i] = model;
            this.model = model;
        }
    }
}

// TODO: Deprecate
//
export class TripWorker {
    model: TripModel;
    modelCopy: TripModel;
    list: TripModel[];
    form: any;

    constructor() {
        this.model = null;
        this.modelCopy = null;
        this.list = [];
        this.form = null;
    }

    updateModel(model: TripModel) {
        if (!this.model) {
            return;
        }
        const i = this.list.indexOf(this.model);
        if (i >= 0) {
            this.list[i] = model;
            this.model = model;
        }
    }
}
