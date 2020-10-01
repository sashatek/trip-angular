import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Globals } from '../Globals';
import { ILookupItem } from '../models/LooupItem';
import { RefDataModel } from '../models/RefDataModel';

@Injectable({
    providedIn: 'root'
})
export class RefDataService {

    refData: RefDataModel = null;

    constructor(private http: HttpClient, private globals: Globals) { }

    getRefs() {
        const url = `${this.globals.baseApiUrl}RefData/GetAll`;
        return this.http
            .get<RefDataModel>(url)
            .pipe(
                tap(response => this.onGetRefs(response)
                ));

    }

    onGetRefs = (ref: RefDataModel) => {
        this.refData = ref;
    }

    getRefDataById(refData: ILookupItem[], id: number){
        for (const ref of refData) {
            if (ref.id === id){
                return ref;
            }
        }
        return null;
    }
}
