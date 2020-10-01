import { ILookupItem } from './LooupItem';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

export class TripModel {
    tripId: number;
    tripDate: Date;
    // airportId: number;
    airportInfo: ILookupItem;
    transTypeId: number;
    transTypeDesc: string;
    groupName: string;
    groupSize: number;
    active = false;
    note: string | null;

    isNew = true;
}
export class ModelWorker<T> {
    model: T | null = null;
    modelCopy: T | null = null;
    list: T[] = [];

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


